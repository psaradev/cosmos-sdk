package host

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/x/ibc/core/exported"
)

const (
	// ModuleName is the name of the IBC module
	ModuleName = "ibc"

	// StoreKey is the string store representation
	StoreKey string = ModuleName

	// QuerierRoute is the querier route for the IBC module
	QuerierRoute string = ModuleName

	// RouterKey is the msg router key for the IBC module
	RouterKey string = ModuleName
)

// KVStore key prefixes for IBC
var (
	KeyClientStorePrefix     = []byte("clients")
	KeyConsensusStatesPrefix = []byte("consensusStates")
	KeyConnectionPrefix      = []byte("connections")
)

// KVStore key prefixes for IBC
const (
	KeyChannelPrefix           = "channelEnds"
	KeyChannelCapabilityPrefix = "capabilities"
	KeyNextSeqSendPrefix       = "seqSends"
	KeyNextSeqRecvPrefix       = "seqRecvs"
	KeyNextSeqAckPrefix        = "seqAcks"
	KeyPacketCommitmentPrefix  = "commitments"
	KeyPacketAckPrefix         = "acks"
	KeyPacketReceiptPrefix     = "receipts"
)

// FullClientPath returns the full path of a specific client path in the format:
// "clients/{clientID}/{path}" as a string.
func FullClientPath(clientID string, path string) string {
	return string(FullKeyClientPath(clientID, []byte(path)))
}

// FullKeyClientPath returns the full path of specific client path in the format:
// "clients/{clientID}/{path}" as a byte array.
func FullKeyClientPath(clientID string, path []byte) []byte {
	return append(KeyClientStorePrefix, append([]byte("/"+clientID+"/"), path...)...)
}

// ICS02
// The following paths are the keys to the store as defined in https://github.com/cosmos/ics/tree/master/spec/ics-002-client-semantics#path-space

// ClientStatePath takes an Identifier and returns a Path under which to store a
// particular client state
func ClientStatePath() string {
	return "clientState"
}

// ConsensusStatePath takes an Identifier and returns a Path under which to
// store the consensus state of a client.
func ConsensusStatePath(height exported.Height) string {
	return fmt.Sprintf("%s/%s", KeyConsensusStatesPrefix, height)
}

// KeyClientState returns the store key for a particular client state
func KeyClientState() []byte {
	return []byte(ClientStatePath())
}

// KeyConsensusState returns the store key for the consensus state of a particular
// client
func KeyConsensusState(height exported.Height) []byte {
	return []byte(ConsensusStatePath(height))
}

// ICS03
// The following paths are the keys to the store as defined in https://github.com/cosmos/ics/tree/master/spec/ics-003-connection-semantics#store-paths

// ClientConnectionsPath defines a reverse mapping from clients to a set of connections
func ClientConnectionsPath(clientID string) string {
	return fmt.Sprintf("%s/%s/connections", KeyClientStorePrefix, clientID)
}

// ConnectionPath defines the path under which connection paths are stored
func ConnectionPath(connectionID string) string {
	return fmt.Sprintf("%s/%s", KeyConnectionPrefix, connectionID)
}

// KeyClientConnections returns the store key for the connections of a given client
func KeyClientConnections(clientID string) []byte {
	return []byte(ClientConnectionsPath(clientID))
}

// KeyConnection returns the store key for a particular connection
func KeyConnection(connectionID string) []byte {
	return []byte(ConnectionPath(connectionID))
}

// ICS04
// The following paths are the keys to the store as defined in https://github.com/cosmos/ics/tree/master/spec/ics-004-channel-and-packet-semantics#store-paths

// ChannelPath defines the path under which channels are stored
func ChannelPath(portID, channelID string) string {
	return fmt.Sprintf("%s/", KeyChannelPrefix) + channelPath(portID, channelID)
}

// ChannelCapabilityPath defines the path under which capability keys associated
// with a channel are stored
func ChannelCapabilityPath(portID, channelID string) string {
	return fmt.Sprintf("%s/", KeyChannelCapabilityPrefix) + channelPath(portID, channelID) + "/key"
}

// NextSequenceSendPath defines the next send sequence counter store path
func NextSequenceSendPath(portID, channelID string) string {
	return fmt.Sprintf("%s/", KeyNextSeqSendPrefix) + channelPath(portID, channelID) + "/nextSequenceSend"
}

// NextSequenceRecvPath defines the next receive sequence counter store path
func NextSequenceRecvPath(portID, channelID string) string {
	return fmt.Sprintf("%s/", KeyNextSeqRecvPrefix) + channelPath(portID, channelID) + "/nextSequenceRecv"
}

// NextSequenceAckPath defines the next acknowledgement sequence counter store path
func NextSequenceAckPath(portID, channelID string) string {
	return fmt.Sprintf("%s/", KeyNextSeqAckPrefix) + channelPath(portID, channelID) + "/nextSequenceAck"
}

// PacketCommitmentPath defines the commitments to packet data fields store path
func PacketCommitmentPath(portID, channelID string, sequence uint64) string {
	return fmt.Sprintf("%s/", KeyPacketCommitmentPrefix) + channelPath(portID, channelID) + fmt.Sprintf("/packets/%d", sequence)
}

// PacketCommitmentPrefixPath defines the prefix for commitments to packet data fields store path.
func PacketCommitmentPrefixPath(portID, channelID string) string {
	return fmt.Sprintf("%s/", KeyPacketCommitmentPrefix) + channelPath(portID, channelID)
}

// PacketAcknowledgementPath defines the packet acknowledgement store path
func PacketAcknowledgementPath(portID, channelID string, sequence uint64) string {
	return fmt.Sprintf("%s/", KeyPacketAckPrefix) + channelPath(portID, channelID) + fmt.Sprintf("/acknowledgements/%d", sequence)
}

// PacketReceiptPath defines the packet receipt store path
func PacketReceiptPath(portID, channelID string, sequence uint64) string {
	return fmt.Sprintf("%s/", KeyPacketReceiptPrefix) + channelPath(portID, channelID) + fmt.Sprintf("/receipts/%d", sequence)
}

// KeyChannel returns the store key for a particular channel
func KeyChannel(portID, channelID string) []byte {
	return []byte(ChannelPath(portID, channelID))
}

// KeyNextSequenceSend returns the store key for the send sequence of a particular
// channel binded to a specific port
func KeyNextSequenceSend(portID, channelID string) []byte {
	return []byte(NextSequenceSendPath(portID, channelID))
}

// KeyNextSequenceRecv returns the store key for the receive sequence of a particular
// channel binded to a specific port
func KeyNextSequenceRecv(portID, channelID string) []byte {
	return []byte(NextSequenceRecvPath(portID, channelID))
}

// KeyNextSequenceAck returns the store key for the acknowledgement sequence of
// a particular channel binded to a specific port.
func KeyNextSequenceAck(portID, channelID string) []byte {
	return []byte(NextSequenceAckPath(portID, channelID))
}

// KeyPacketCommitment returns the store key of under which a packet commitment
// is stored
func KeyPacketCommitment(portID, channelID string, sequence uint64) []byte {
	return []byte(PacketCommitmentPath(portID, channelID, sequence))
}

// KeyPacketAcknowledgement returns the store key of under which a packet
// acknowledgement is stored
func KeyPacketAcknowledgement(portID, channelID string, sequence uint64) []byte {
	return []byte(PacketAcknowledgementPath(portID, channelID, sequence))
}

// KeyPacketReceipt returns the store key of under which a packet
// receipt is stored
func KeyPacketReceipt(portID, channelID string, sequence uint64) []byte {
	return []byte(PacketReceiptPath(portID, channelID, sequence))
}

func channelPath(portID, channelID string) string {
	return fmt.Sprintf("ports/%s/channels/%s", portID, channelID)
}

// ICS05
// The following paths are the keys to the store as defined in https://github.com/cosmos/ics/tree/master/spec/ics-005-port-allocation#store-paths

// PortPath defines the path under which ports paths are stored on the capability module
func PortPath(portID string) string {
	return fmt.Sprintf("ports/%s", portID)
}
