package keeper_test

import (
	"testing"
	"time"

	"github.com/stretchr/testify/suite"

	sdk "github.com/cosmos/cosmos-sdk/types"
	clienttypes "github.com/cosmos/cosmos-sdk/x/ibc/core/02-client/types"
	channeltypes "github.com/cosmos/cosmos-sdk/x/ibc/core/04-channel/types"
	commitmenttypes "github.com/cosmos/cosmos-sdk/x/ibc/core/23-commitment/types"
	host "github.com/cosmos/cosmos-sdk/x/ibc/core/24-host"
	"github.com/cosmos/cosmos-sdk/x/ibc/core/exported"
	"github.com/cosmos/cosmos-sdk/x/ibc/core/keeper"
	ibctmtypes "github.com/cosmos/cosmos-sdk/x/ibc/light-clients/07-tendermint/types"
	ibctesting "github.com/cosmos/cosmos-sdk/x/ibc/testing"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

const height = 10

var (
	timeoutHeight = clienttypes.NewHeight(0, 10000)
	maxSequence   = uint64(10)
)

type KeeperTestSuite struct {
	suite.Suite

	coordinator *ibctesting.Coordinator

	chainA *ibctesting.TestChain
	chainB *ibctesting.TestChain
}

// SetupTest creates a coordinator with 2 test chains.
func (suite *KeeperTestSuite) SetupTest() {
	suite.coordinator = ibctesting.NewCoordinator(suite.T(), 2)

	suite.chainA = suite.coordinator.GetChain(ibctesting.GetChainID(0))
	suite.chainB = suite.coordinator.GetChain(ibctesting.GetChainID(1))
}

func TestIBCTestSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}

// tests the IBC handler receiving a packet on ordered and unordered channels.
// It verifies that the storing of an acknowledgement on success occurs. It
// tests high level properties like ordering and basic sanity checks. More
// rigorous testing of 'RecvPacket' and 'WriteReceipt' can be found in the
// 04-channel/keeper/packet_test.go.
func (suite *KeeperTestSuite) TestHandleRecvPacket() {
	var (
		packet channeltypes.Packet
	)

	testCases := []struct {
		name     string
		malleate func()
		expPass  bool
	}{
		{"success: ORDERED", func() {
			_, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.ORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)
		}, true},
		{"success: UNORDERED", func() {
			_, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)
		}, true},
		{"success: UNORDERED out of order packet", func() {
			// setup uses an UNORDERED channel
			_, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)

			// attempts to receive packet with sequence 10 without receiving packet with sequence 1
			for i := uint64(1); i < 10; i++ {
				packet = channeltypes.NewPacket(ibctesting.MockCommitment, i, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

				err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
				suite.Require().NoError(err)
			}
		}, true},
		{"failure: ORDERED out of order packet", func() {
			_, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.ORDERED)

			// attempts to receive packet with sequence 10 without receiving packet with sequence 1
			for i := uint64(1); i < 10; i++ {
				packet = channeltypes.NewPacket(ibctesting.MockCommitment, i, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

				err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
				suite.Require().NoError(err)
			}
		}, false},
		{"channel does not exist", func() {
			// any non-nil value of packet is valid
			suite.Require().NotNil(packet)
		}, false},
		{"packet not sent", func() {
			_, _, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)
		}, false},
		{"ORDERED: packet already received (replay)", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.ORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)

			err = suite.coordinator.WriteReceipt(suite.chainB, suite.chainA, packet, clientA)
			suite.Require().NoError(err)
		}, false},
		{"UNORDERED: packet already received (replay)", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)

			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)

			err = suite.coordinator.WriteReceipt(suite.chainB, suite.chainA, packet, clientA)
			suite.Require().NoError(err)
		}, false},
	}

	for _, tc := range testCases {
		tc := tc

		suite.Run(tc.name, func() {
			suite.SetupTest() // reset

			tc.malleate()

			// get proof of packet commitment from chainA
			packetKey := host.KeyPacketCommitment(packet.GetSourcePort(), packet.GetSourceChannel(), packet.GetSequence())
			proof, proofHeight := suite.chainA.QueryProof(packetKey)

			msg := channeltypes.NewMsgRecvPacket(packet, proof, proofHeight, suite.chainB.SenderAccount.GetAddress())

			// ante-handle RecvPacket
			_, err := keeper.Keeper.RecvPacket(*suite.chainB.App.IBCKeeper, sdk.WrapSDKContext(suite.chainB.GetContext()), msg)

			if tc.expPass {
				suite.Require().NoError(err)

				// replay should fail since state changes occur
				_, err := keeper.Keeper.RecvPacket(*suite.chainB.App.IBCKeeper, sdk.WrapSDKContext(suite.chainB.GetContext()), msg)
				suite.Require().Error(err)

				// verify ack was written
				ack, found := suite.chainB.App.IBCKeeper.ChannelKeeper.GetPacketAcknowledgement(suite.chainB.GetContext(), packet.GetDestPort(), packet.GetDestChannel(), packet.GetSequence())
				suite.Require().NotNil(ack)
				suite.Require().True(found)
			} else {
				suite.Require().Error(err)
			}
		})
	}
}

// tests the IBC handler acknowledgement of a packet on ordered and unordered
// channels. It verifies that the deletion of packet commitments from state
// occurs. It test high level properties like ordering and basic sanity
// checks. More rigorous testing of 'AcknowledgePacket' and 'AcknowledgementExecuted'
// can be found in the 04-channel/keeper/packet_test.go.
func (suite *KeeperTestSuite) TestHandleAcknowledgePacket() {
	var (
		packet channeltypes.Packet
	)

	testCases := []struct {
		name     string
		malleate func()
		expPass  bool
	}{
		{"success: ORDERED", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.ORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)

			err = suite.coordinator.WriteReceipt(suite.chainB, suite.chainA, packet, clientA)
			suite.Require().NoError(err)

			err = suite.coordinator.WriteAcknowledgement(suite.chainB, suite.chainA, packet, clientA)
			suite.Require().NoError(err)
		}, true},
		{"success: UNORDERED", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)

			err = suite.coordinator.WriteReceipt(suite.chainB, suite.chainA, packet, clientA)
			suite.Require().NoError(err)

			err = suite.coordinator.WriteAcknowledgement(suite.chainB, suite.chainA, packet, clientA)
			suite.Require().NoError(err)
		}, true},
		{"success: UNORDERED acknowledge out of order packet", func() {
			// setup uses an UNORDERED channel
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)

			// attempts to acknowledge ack with sequence 10 without acknowledging ack with sequence 1 (removing packet commitment)
			for i := uint64(1); i < 10; i++ {
				packet = channeltypes.NewPacket(ibctesting.MockCommitment, i, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

				err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
				suite.Require().NoError(err)

				err = suite.coordinator.WriteReceipt(suite.chainB, suite.chainA, packet, clientA)
				suite.Require().NoError(err)

				err = suite.coordinator.WriteAcknowledgement(suite.chainB, suite.chainA, packet, clientA)
				suite.Require().NoError(err)
			}
		}, true},
		{"failure: ORDERED acknowledge out of order packet", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.ORDERED)

			// attempts to acknowledge ack with sequence 10 without acknowledging ack with sequence 1 (removing packet commitment
			for i := uint64(1); i < 10; i++ {
				packet = channeltypes.NewPacket(ibctesting.MockCommitment, i, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

				err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
				suite.Require().NoError(err)

				err = suite.coordinator.WriteReceipt(suite.chainB, suite.chainA, packet, clientA)
				suite.Require().NoError(err)

				err = suite.coordinator.WriteAcknowledgement(suite.chainB, suite.chainA, packet, clientA)
				suite.Require().NoError(err)
			}
		}, false},
		{"channel does not exist", func() {
			// any non-nil value of packet is valid
			suite.Require().NotNil(packet)
		}, false},
		{"packet not received", func() {
			_, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)
		}, false},
		{"ORDERED: packet already acknowledged (replay)", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.ORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)

			err = suite.coordinator.WriteReceipt(suite.chainB, suite.chainA, packet, clientA)
			suite.Require().NoError(err)

			err = suite.coordinator.WriteAcknowledgement(suite.chainB, suite.chainA, packet, clientA)
			suite.Require().NoError(err)

			err = suite.coordinator.AcknowledgementExecuted(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)
		}, false},
		{"UNORDERED: packet already received (replay)", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)

			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)

			err = suite.coordinator.WriteReceipt(suite.chainB, suite.chainA, packet, clientA)
			suite.Require().NoError(err)

			err = suite.coordinator.WriteAcknowledgement(suite.chainB, suite.chainA, packet, clientA)
			suite.Require().NoError(err)

			err = suite.coordinator.AcknowledgementExecuted(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)
		}, false},
	}

	for _, tc := range testCases {
		tc := tc

		suite.Run(tc.name, func() {
			suite.SetupTest() // reset
			ibctesting.TestHash = ibctesting.MockAcknowledgement

			tc.malleate()

			packetKey := host.KeyPacketAcknowledgement(packet.GetDestPort(), packet.GetDestChannel(), packet.GetSequence())
			proof, proofHeight := suite.chainB.QueryProof(packetKey)

			msg := channeltypes.NewMsgAcknowledgement(packet, ibctesting.MockAcknowledgement, proof, proofHeight, suite.chainA.SenderAccount.GetAddress())

			_, err := keeper.Keeper.Acknowledgement(*suite.chainA.App.IBCKeeper, sdk.WrapSDKContext(suite.chainA.GetContext()), msg)

			if tc.expPass {
				suite.Require().NoError(err)

				// replay should an error
				_, err := keeper.Keeper.Acknowledgement(*suite.chainA.App.IBCKeeper, sdk.WrapSDKContext(suite.chainA.GetContext()), msg)
				suite.Require().Error(err)

				// verify packet commitment was deleted on source chain
				has := suite.chainA.App.IBCKeeper.ChannelKeeper.HasPacketCommitment(suite.chainA.GetContext(), packet.GetSourcePort(), packet.GetSourceChannel(), packet.GetSequence())
				suite.Require().False(has)

			} else {
				suite.Require().Error(err)
			}
		})
	}
}

// tests the IBC handler timing out a packet on ordered and unordered channels.
// It verifies that the deletion of a packet commitment occurs. It tests
// high level properties like ordering and basic sanity checks. More
// rigorous testing of 'TimeoutPacket' and 'TimeoutExecuted' can be found in
// the 04-channel/keeper/timeout_test.go.
func (suite *KeeperTestSuite) TestHandleTimeoutPacket() {
	var (
		packet    channeltypes.Packet
		packetKey []byte
	)

	testCases := []struct {
		name     string
		malleate func()
		expPass  bool
	}{
		{"success: ORDERED", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.ORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, clienttypes.GetSelfHeight(suite.chainB.GetContext()), uint64(suite.chainB.GetContext().BlockTime().UnixNano()))

			// create packet commitment
			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)

			// need to update chainA client to prove missing ack
			suite.coordinator.UpdateClient(suite.chainA, suite.chainB, clientA, ibctesting.Tendermint)

			packetKey = host.KeyNextSequenceRecv(packet.GetDestPort(), packet.GetDestChannel())
		}, true},
		{"success: UNORDERED", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, clienttypes.GetSelfHeight(suite.chainB.GetContext()), uint64(suite.chainB.GetContext().BlockTime().UnixNano()))

			// create packet commitment
			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)

			// need to update chainA client to prove missing ack
			suite.coordinator.UpdateClient(suite.chainA, suite.chainB, clientA, ibctesting.Tendermint)

			packetKey = host.KeyPacketReceipt(packet.GetDestPort(), packet.GetDestChannel(), packet.GetSequence())
		}, true},
		{"success: UNORDERED timeout out of order packet", func() {
			// setup uses an UNORDERED channel
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)

			// attempts to timeout the last packet sent without timing out the first packet
			// packet sequences begin at 1
			for i := uint64(1); i < maxSequence; i++ {
				packet = channeltypes.NewPacket(ibctesting.MockCommitment, i, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, clienttypes.GetSelfHeight(suite.chainB.GetContext()), 0)

				// create packet commitment
				err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
				suite.Require().NoError(err)
			}

			suite.coordinator.UpdateClient(suite.chainA, suite.chainB, clientA, ibctesting.Tendermint)
			packetKey = host.KeyPacketReceipt(packet.GetDestPort(), packet.GetDestChannel(), packet.GetSequence())
		}, true},
		{"success: ORDERED timeout out of order packet", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.ORDERED)

			// attempts to timeout the last packet sent without timing out the first packet
			// packet sequences begin at 1
			for i := uint64(1); i < maxSequence; i++ {
				packet = channeltypes.NewPacket(ibctesting.MockCommitment, i, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, clienttypes.GetSelfHeight(suite.chainB.GetContext()), 0)

				// create packet commitment
				err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
				suite.Require().NoError(err)
			}

			suite.coordinator.UpdateClient(suite.chainA, suite.chainB, clientA, ibctesting.Tendermint)
			packetKey = host.KeyNextSequenceRecv(packet.GetDestPort(), packet.GetDestChannel())

		}, true},
		{"channel does not exist", func() {
			// any non-nil value of packet is valid
			suite.Require().NotNil(packet)

			packetKey = host.KeyNextSequenceRecv(packet.GetDestPort(), packet.GetDestChannel())
		}, false},
		{"UNORDERED: packet not sent", func() {
			_, _, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)
			packetKey = host.KeyPacketReceipt(packet.GetDestPort(), packet.GetDestChannel(), packet.GetSequence())
		}, false},
	}

	for _, tc := range testCases {
		tc := tc

		suite.Run(tc.name, func() {
			suite.SetupTest() // reset

			tc.malleate()

			proof, proofHeight := suite.chainB.QueryProof(packetKey)

			msg := channeltypes.NewMsgTimeout(packet, 1, proof, proofHeight, suite.chainA.SenderAccount.GetAddress())

			_, err := keeper.Keeper.Timeout(*suite.chainA.App.IBCKeeper, sdk.WrapSDKContext(suite.chainA.GetContext()), msg)

			if tc.expPass {
				suite.Require().NoError(err)

				// replay should return an error
				_, err := keeper.Keeper.Timeout(*suite.chainA.App.IBCKeeper, sdk.WrapSDKContext(suite.chainA.GetContext()), msg)
				suite.Require().Error(err)

				// verify packet commitment was deleted on source chain
				has := suite.chainA.App.IBCKeeper.ChannelKeeper.HasPacketCommitment(suite.chainA.GetContext(), packet.GetSourcePort(), packet.GetSourceChannel(), packet.GetSequence())
				suite.Require().False(has)

			} else {
				suite.Require().Error(err)
			}
		})
	}
}

// tests the IBC handler timing out a packet via channel closure on ordered
// and unordered channels. It verifies that the deletion of a packet
// commitment occurs. It tests high level properties like ordering and basic
// sanity checks. More rigorous testing of 'TimeoutOnClose' and
//'TimeoutExecuted' can be found in the 04-channel/keeper/timeout_test.go.
func (suite *KeeperTestSuite) TestHandleTimeoutOnClosePacket() {
	var (
		packet              channeltypes.Packet
		packetKey           []byte
		counterpartyChannel ibctesting.TestChannel
	)

	testCases := []struct {
		name     string
		malleate func()
		expPass  bool
	}{
		{"success: ORDERED", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.ORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)
			counterpartyChannel = ibctesting.TestChannel{
				PortID:               channelB.PortID,
				ID:                   channelB.ID,
				CounterpartyClientID: clientA,
			}

			// create packet commitment
			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)

			// need to update chainA client to prove missing ack
			suite.coordinator.UpdateClient(suite.chainA, suite.chainB, clientA, ibctesting.Tendermint)

			packetKey = host.KeyNextSequenceRecv(packet.GetDestPort(), packet.GetDestChannel())

			// close counterparty channel
			suite.coordinator.SetChannelClosed(suite.chainB, suite.chainA, counterpartyChannel)
		}, true},
		{"success: UNORDERED", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)
			counterpartyChannel = ibctesting.TestChannel{
				PortID:               channelB.PortID,
				ID:                   channelB.ID,
				CounterpartyClientID: clientA,
			}

			// create packet commitment
			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)

			// need to update chainA client to prove missing ack
			suite.coordinator.UpdateClient(suite.chainA, suite.chainB, clientA, ibctesting.Tendermint)

			packetKey = host.KeyPacketReceipt(packet.GetDestPort(), packet.GetDestChannel(), packet.GetSequence())

			// close counterparty channel
			suite.coordinator.SetChannelClosed(suite.chainB, suite.chainA, counterpartyChannel)
		}, true},
		{"success: UNORDERED timeout out of order packet", func() {
			// setup uses an UNORDERED channel
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)
			counterpartyChannel = ibctesting.TestChannel{
				PortID:               channelB.PortID,
				ID:                   channelB.ID,
				CounterpartyClientID: clientA,
			}

			// attempts to timeout the last packet sent without timing out the first packet
			// packet sequences begin at 1
			for i := uint64(1); i < maxSequence; i++ {
				packet = channeltypes.NewPacket(ibctesting.MockCommitment, i, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

				// create packet commitment
				err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
				suite.Require().NoError(err)
			}

			suite.coordinator.UpdateClient(suite.chainA, suite.chainB, clientA, ibctesting.Tendermint)
			packetKey = host.KeyPacketReceipt(packet.GetDestPort(), packet.GetDestChannel(), packet.GetSequence())

			// close counterparty channel
			suite.coordinator.SetChannelClosed(suite.chainB, suite.chainA, counterpartyChannel)
		}, true},
		{"success: ORDERED timeout out of order packet", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.ORDERED)
			counterpartyChannel = ibctesting.TestChannel{
				PortID:               channelB.PortID,
				ID:                   channelB.ID,
				CounterpartyClientID: clientA,
			}

			// attempts to timeout the last packet sent without timing out the first packet
			// packet sequences begin at 1
			for i := uint64(1); i < maxSequence; i++ {
				packet = channeltypes.NewPacket(ibctesting.MockCommitment, i, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)

				// create packet commitment
				err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
				suite.Require().NoError(err)
			}

			suite.coordinator.UpdateClient(suite.chainA, suite.chainB, clientA, ibctesting.Tendermint)
			packetKey = host.KeyNextSequenceRecv(packet.GetDestPort(), packet.GetDestChannel())

			// close counterparty channel
			suite.coordinator.SetChannelClosed(suite.chainB, suite.chainA, counterpartyChannel)
		}, true},
		{"channel does not exist", func() {
			// any non-nil value of packet is valid
			suite.Require().NotNil(packet)

			packetKey = host.KeyNextSequenceRecv(packet.GetDestPort(), packet.GetDestChannel())
		}, false},
		{"UNORDERED: packet not sent", func() {
			clientA, _, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.UNORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)
			packetKey = host.KeyPacketAcknowledgement(packet.GetDestPort(), packet.GetDestChannel(), packet.GetSequence())
			counterpartyChannel = ibctesting.TestChannel{
				PortID:               channelB.PortID,
				ID:                   channelB.ID,
				CounterpartyClientID: clientA,
			}

			// close counterparty channel
			suite.coordinator.SetChannelClosed(suite.chainB, suite.chainA, counterpartyChannel)
		}, false},
		{"ORDERED: channel not closed", func() {
			clientA, clientB, _, _, channelA, channelB := suite.coordinator.Setup(suite.chainA, suite.chainB, channeltypes.ORDERED)
			packet = channeltypes.NewPacket(ibctesting.MockCommitment, 1, channelA.PortID, channelA.ID, channelB.PortID, channelB.ID, timeoutHeight, 0)
			counterpartyChannel = ibctesting.TestChannel{
				PortID:               channelB.PortID,
				ID:                   channelB.ID,
				CounterpartyClientID: clientA,
			}

			// create packet commitment
			err := suite.coordinator.SendPacket(suite.chainA, suite.chainB, packet, clientB)
			suite.Require().NoError(err)

			// need to update chainA client to prove missing ack
			suite.coordinator.UpdateClient(suite.chainA, suite.chainB, clientA, ibctesting.Tendermint)

			packetKey = host.KeyNextSequenceRecv(packet.GetDestPort(), packet.GetDestChannel())
		}, false},
	}

	for _, tc := range testCases {
		tc := tc

		suite.Run(tc.name, func() {
			suite.SetupTest() // reset

			tc.malleate()

			proof, proofHeight := suite.chainB.QueryProof(packetKey)

			channelKey := host.KeyChannel(counterpartyChannel.PortID, counterpartyChannel.ID)
			proofClosed, _ := suite.chainB.QueryProof(channelKey)

			msg := channeltypes.NewMsgTimeoutOnClose(packet, 1, proof, proofClosed, proofHeight, suite.chainA.SenderAccount.GetAddress())

			_, err := keeper.Keeper.TimeoutOnClose(*suite.chainA.App.IBCKeeper, sdk.WrapSDKContext(suite.chainA.GetContext()), msg)

			if tc.expPass {
				suite.Require().NoError(err)

				// replay should return an error
				_, err := keeper.Keeper.TimeoutOnClose(*suite.chainA.App.IBCKeeper, sdk.WrapSDKContext(suite.chainA.GetContext()), msg)
				suite.Require().Error(err)

				// verify packet commitment was deleted on source chain
				has := suite.chainA.App.IBCKeeper.ChannelKeeper.HasPacketCommitment(suite.chainA.GetContext(), packet.GetSourcePort(), packet.GetSourceChannel(), packet.GetSequence())
				suite.Require().False(has)

			} else {
				suite.Require().Error(err)
			}
		})
	}
}

func (suite *KeeperTestSuite) TestUpgradeClient() {
	var (
		clientA        string
		upgradedClient exported.ClientState
		upgradeHeight  exported.Height
		msg            *clienttypes.MsgUpgradeClient
	)

	newClientHeight := clienttypes.NewHeight(1, 1)

	cases := []struct {
		name    string
		setup   func()
		expPass bool
	}{
		{
			name: "successful upgrade",
			setup: func() {

				upgradedClient = ibctmtypes.NewClientState("newChainId", ibctmtypes.DefaultTrustLevel, ibctesting.TrustingPeriod, ibctesting.UnbondingPeriod+ibctesting.TrustingPeriod, ibctesting.MaxClockDrift, newClientHeight, ibctesting.DefaultConsensusParams, commitmenttypes.GetSDKSpecs(), ibctesting.UpgradePath, false, false)

				// upgrade Height is at next block
				upgradeHeight = clienttypes.NewHeight(0, uint64(suite.chainB.GetContext().BlockHeight()+1))

				// zero custom fields and store in upgrade store
				suite.chainB.App.UpgradeKeeper.SetUpgradedClient(suite.chainB.GetContext(), int64(upgradeHeight.GetVersionHeight()), upgradedClient)

				// commit upgrade store changes and update clients

				suite.coordinator.CommitBlock(suite.chainB)
				err := suite.coordinator.UpdateClient(suite.chainA, suite.chainB, clientA, ibctesting.Tendermint)
				suite.Require().NoError(err)

				cs, found := suite.chainA.App.IBCKeeper.ClientKeeper.GetClientState(suite.chainA.GetContext(), clientA)
				suite.Require().True(found)

				proofUpgrade, _ := suite.chainB.QueryUpgradeProof(upgradetypes.UpgradedClientKey(int64(upgradeHeight.GetVersionHeight())), cs.GetLatestHeight().GetVersionHeight())

				msg, err = clienttypes.NewMsgUpgradeClient(clientA, upgradedClient, upgradeHeight, proofUpgrade, suite.chainA.SenderAccount.GetAddress())
				suite.Require().NoError(err)
			},
			expPass: true,
		},
		{
			name: "invalid upgrade: msg.ClientState does not contain valid clientstate",
			setup: func() {

				cs, found := suite.chainA.App.IBCKeeper.ClientKeeper.GetClientState(suite.chainA.GetContext(), clientA)
				suite.Require().True(found)

				// upgrade Height is at next block
				upgradeHeight = clienttypes.NewHeight(0, uint64(suite.chainB.GetContext().BlockHeight()+1))

				proofUpgrade, _ := suite.chainB.QueryUpgradeProof(upgradetypes.UpgradedClientKey(int64(upgradeHeight.GetVersionHeight())), cs.GetLatestHeight().GetVersionHeight())

				consState := ibctmtypes.NewConsensusState(time.Now(), commitmenttypes.NewMerkleRoot([]byte("app_hash")), []byte("next_vals_hash"))
				consAny, err := clienttypes.PackConsensusState(consState)
				suite.Require().NoError(err)

				height, _ := upgradeHeight.(clienttypes.Height)

				msg = &clienttypes.MsgUpgradeClient{ClientId: clientA, ClientState: consAny, UpgradeHeight: &height, ProofUpgrade: proofUpgrade, Signer: suite.chainA.SenderAccount.GetAddress().String()}
			},
			expPass: false,
		},
		{
			name: "VerifyUpgrade fails",
			setup: func() {

				upgradedClient = ibctmtypes.NewClientState("newChainId", ibctmtypes.DefaultTrustLevel, ibctesting.TrustingPeriod, ibctesting.UnbondingPeriod+ibctesting.TrustingPeriod, ibctesting.MaxClockDrift, newClientHeight, ibctesting.DefaultConsensusParams, commitmenttypes.GetSDKSpecs(), ibctesting.UpgradePath, false, false)

				// upgrade Height is at next block
				upgradeHeight = clienttypes.NewHeight(0, uint64(suite.chainB.GetContext().BlockHeight()+1))

				// zero custom fields and store in upgrade store
				suite.chainB.App.UpgradeKeeper.SetUpgradedClient(suite.chainB.GetContext(), int64(upgradeHeight.GetVersionHeight()), upgradedClient)

				// commit upgrade store changes and update clients

				suite.coordinator.CommitBlock(suite.chainB)
				err := suite.coordinator.UpdateClient(suite.chainA, suite.chainB, clientA, ibctesting.Tendermint)
				suite.Require().NoError(err)

				msg, err = clienttypes.NewMsgUpgradeClient(clientA, upgradedClient, upgradeHeight, nil, suite.chainA.SenderAccount.GetAddress())
				suite.Require().NoError(err)
			},
			expPass: false,
		},
	}

	for _, tc := range cases {
		tc := tc
		clientA, _ = suite.coordinator.SetupClients(suite.chainA, suite.chainB, ibctesting.Tendermint)

		tc.setup()

		_, err := keeper.Keeper.UpgradeClient(*suite.chainA.App.IBCKeeper, sdk.WrapSDKContext(suite.chainA.GetContext()), msg)

		if tc.expPass {
			suite.Require().NoError(err, "upgrade handler failed on valid case: %s", tc.name)
			newClient, ok := suite.chainA.App.IBCKeeper.ClientKeeper.GetClientState(suite.chainA.GetContext(), clientA)
			suite.Require().True(ok)
			suite.Require().Equal(upgradedClient, newClient)
		} else {
			suite.Require().Error(err, "upgrade handler passed on invalid case: %s", tc.name)
		}
	}
}
