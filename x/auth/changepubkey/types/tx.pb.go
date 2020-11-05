// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: cosmos/changepubkey/v1beta1/tx.proto

package types

import (
	context "context"
	fmt "fmt"
	github_com_cosmos_cosmos_sdk_types "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/gogo/protobuf/gogoproto"
	grpc1 "github.com/gogo/protobuf/grpc"
	proto "github.com/gogo/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

// MsgChangePubKey defines a message that enables changing a pubkey
// of an account.
type MsgChangePubKey struct {
	Address github_com_cosmos_cosmos_sdk_types.AccAddress `protobuf:"bytes,1,opt,name=address,proto3,casttype=github.com/cosmos/cosmos-sdk/types.AccAddress" json:"address,omitempty"`
	PubKey  []byte                                        `protobuf:"bytes,2,opt,name=pub_key,json=pubKey,proto3" json:"public_key,omitempty" yaml:"public_key"`
}

func (m *MsgChangePubKey) Reset()         { *m = MsgChangePubKey{} }
func (m *MsgChangePubKey) String() string { return proto.CompactTextString(m) }
func (*MsgChangePubKey) ProtoMessage()    {}
func (*MsgChangePubKey) Descriptor() ([]byte, []int) {
	return fileDescriptor_0c6e8f4793cfde65, []int{0}
}
func (m *MsgChangePubKey) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgChangePubKey) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgChangePubKey.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgChangePubKey) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgChangePubKey.Merge(m, src)
}
func (m *MsgChangePubKey) XXX_Size() int {
	return m.Size()
}
func (m *MsgChangePubKey) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgChangePubKey.DiscardUnknown(m)
}

var xxx_messageInfo_MsgChangePubKey proto.InternalMessageInfo

func (m *MsgChangePubKey) GetAddress() github_com_cosmos_cosmos_sdk_types.AccAddress {
	if m != nil {
		return m.Address
	}
	return nil
}

// MsgChangePubKeyResponse defines the Msg/ChangePubKey response type.
type MsgChangePubKeyResponse struct {
}

func (m *MsgChangePubKeyResponse) Reset()         { *m = MsgChangePubKeyResponse{} }
func (m *MsgChangePubKeyResponse) String() string { return proto.CompactTextString(m) }
func (*MsgChangePubKeyResponse) ProtoMessage()    {}
func (*MsgChangePubKeyResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_0c6e8f4793cfde65, []int{1}
}
func (m *MsgChangePubKeyResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgChangePubKeyResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgChangePubKeyResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgChangePubKeyResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgChangePubKeyResponse.Merge(m, src)
}
func (m *MsgChangePubKeyResponse) XXX_Size() int {
	return m.Size()
}
func (m *MsgChangePubKeyResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgChangePubKeyResponse.DiscardUnknown(m)
}

var xxx_messageInfo_MsgChangePubKeyResponse proto.InternalMessageInfo

func init() {
	proto.RegisterType((*MsgChangePubKey)(nil), "cosmos.changepubkey.v1beta1.MsgChangePubKey")
	proto.RegisterType((*MsgChangePubKeyResponse)(nil), "cosmos.changepubkey.v1beta1.MsgChangePubKeyResponse")
}

func init() {
	proto.RegisterFile("cosmos/changepubkey/v1beta1/tx.proto", fileDescriptor_0c6e8f4793cfde65)
}

var fileDescriptor_0c6e8f4793cfde65 = []byte{
	// 307 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x52, 0x49, 0xce, 0x2f, 0xce,
	0xcd, 0x2f, 0xd6, 0x4f, 0xce, 0x48, 0xcc, 0x4b, 0x4f, 0x2d, 0x28, 0x4d, 0xca, 0x4e, 0xad, 0xd4,
	0x2f, 0x33, 0x4c, 0x4a, 0x2d, 0x49, 0x34, 0xd4, 0x2f, 0xa9, 0xd0, 0x2b, 0x28, 0xca, 0x2f, 0xc9,
	0x17, 0x92, 0x86, 0xa8, 0xd2, 0x43, 0x56, 0xa5, 0x07, 0x55, 0x25, 0x25, 0x92, 0x9e, 0x9f, 0x9e,
	0x0f, 0x56, 0xa7, 0x0f, 0x62, 0x41, 0xb4, 0x28, 0x2d, 0x63, 0xe4, 0xe2, 0xf7, 0x2d, 0x4e, 0x77,
	0x06, 0xeb, 0x08, 0x28, 0x4d, 0xf2, 0x4e, 0xad, 0x14, 0xf2, 0xe6, 0x62, 0x4f, 0x4c, 0x49, 0x29,
	0x4a, 0x2d, 0x2e, 0x96, 0x60, 0x54, 0x60, 0xd4, 0xe0, 0x71, 0x32, 0xfc, 0x75, 0x4f, 0x5e, 0x37,
	0x3d, 0xb3, 0x24, 0xa3, 0x34, 0x49, 0x2f, 0x39, 0x3f, 0x57, 0x1f, 0xe6, 0x18, 0x30, 0xa5, 0x5b,
	0x9c, 0x92, 0xad, 0x5f, 0x52, 0x59, 0x90, 0x5a, 0xac, 0xe7, 0x98, 0x9c, 0xec, 0x08, 0xd1, 0x18,
	0x04, 0x33, 0x41, 0xc8, 0x8d, 0x8b, 0xbd, 0xa0, 0x34, 0x29, 0x3e, 0x3b, 0xb5, 0x52, 0x82, 0x09,
	0x6c, 0x98, 0xee, 0xab, 0x7b, 0xf2, 0x22, 0x05, 0xa5, 0x49, 0x39, 0x99, 0xc9, 0x20, 0x51, 0x9d,
	0xfc, 0xdc, 0xcc, 0x92, 0xd4, 0xdc, 0x82, 0x92, 0xca, 0x4f, 0xf7, 0xe4, 0x05, 0x2b, 0x13, 0x73,
	0x73, 0xac, 0x94, 0x10, 0xb2, 0x4a, 0x41, 0x6c, 0x05, 0x60, 0x47, 0x29, 0x49, 0x72, 0x89, 0xa3,
	0xb9, 0x33, 0x28, 0xb5, 0xb8, 0x20, 0x3f, 0xaf, 0x38, 0xd5, 0xa8, 0x92, 0x8b, 0xd9, 0xb7, 0x38,
	0x5d, 0xa8, 0x88, 0x8b, 0x07, 0xc5, 0x1b, 0x3a, 0x7a, 0x78, 0x82, 0x43, 0x0f, 0xcd, 0x30, 0x29,
	0x13, 0x52, 0x54, 0xc3, 0xac, 0x76, 0x0a, 0x38, 0xf1, 0x48, 0x8e, 0xf1, 0xc2, 0x23, 0x39, 0xc6,
	0x07, 0x8f, 0xe4, 0x18, 0x27, 0x3c, 0x96, 0x63, 0xb8, 0xf0, 0x58, 0x8e, 0xe1, 0xc6, 0x63, 0x39,
	0x86, 0x28, 0x33, 0xbc, 0xe1, 0x55, 0xa1, 0x9f, 0x58, 0x5a, 0x92, 0x81, 0x1a, 0x9d, 0xe0, 0x30,
	0x4c, 0x62, 0x03, 0xc7, 0x8b, 0x31, 0x20, 0x00, 0x00, 0xff, 0xff, 0xb8, 0xf4, 0x31, 0x6b, 0xf2,
	0x01, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// MsgClient is the client API for Msg service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type MsgClient interface {
	// ChangePubKey defines a method for changing a pubkey of an account
	ChangePubKey(ctx context.Context, in *MsgChangePubKey, opts ...grpc.CallOption) (*MsgChangePubKeyResponse, error)
}

type msgClient struct {
	cc grpc1.ClientConn
}

func NewMsgClient(cc grpc1.ClientConn) MsgClient {
	return &msgClient{cc}
}

func (c *msgClient) ChangePubKey(ctx context.Context, in *MsgChangePubKey, opts ...grpc.CallOption) (*MsgChangePubKeyResponse, error) {
	out := new(MsgChangePubKeyResponse)
	err := c.cc.Invoke(ctx, "/cosmos.changepubkey.v1beta1.Msg/ChangePubKey", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MsgServer is the server API for Msg service.
type MsgServer interface {
	// ChangePubKey defines a method for changing a pubkey of an account
	ChangePubKey(context.Context, *MsgChangePubKey) (*MsgChangePubKeyResponse, error)
}

// UnimplementedMsgServer can be embedded to have forward compatible implementations.
type UnimplementedMsgServer struct {
}

func (*UnimplementedMsgServer) ChangePubKey(ctx context.Context, req *MsgChangePubKey) (*MsgChangePubKeyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ChangePubKey not implemented")
}

func RegisterMsgServer(s grpc1.Server, srv MsgServer) {
	s.RegisterService(&_Msg_serviceDesc, srv)
}

func _Msg_ChangePubKey_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgChangePubKey)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).ChangePubKey(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/cosmos.changepubkey.v1beta1.Msg/ChangePubKey",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).ChangePubKey(ctx, req.(*MsgChangePubKey))
	}
	return interceptor(ctx, in, info, handler)
}

var _Msg_serviceDesc = grpc.ServiceDesc{
	ServiceName: "cosmos.changepubkey.v1beta1.Msg",
	HandlerType: (*MsgServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "ChangePubKey",
			Handler:    _Msg_ChangePubKey_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "cosmos/changepubkey/v1beta1/tx.proto",
}

func (m *MsgChangePubKey) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgChangePubKey) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgChangePubKey) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.PubKey) > 0 {
		i -= len(m.PubKey)
		copy(dAtA[i:], m.PubKey)
		i = encodeVarintTx(dAtA, i, uint64(len(m.PubKey)))
		i--
		dAtA[i] = 0x12
	}
	if len(m.Address) > 0 {
		i -= len(m.Address)
		copy(dAtA[i:], m.Address)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Address)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *MsgChangePubKeyResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgChangePubKeyResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgChangePubKeyResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	return len(dAtA) - i, nil
}

func encodeVarintTx(dAtA []byte, offset int, v uint64) int {
	offset -= sovTx(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *MsgChangePubKey) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Address)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.PubKey)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	return n
}

func (m *MsgChangePubKeyResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	return n
}

func sovTx(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozTx(x uint64) (n int) {
	return sovTx(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *MsgChangePubKey) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: MsgChangePubKey: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgChangePubKey: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Address", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Address = append(m.Address[:0], dAtA[iNdEx:postIndex]...)
			if m.Address == nil {
				m.Address = []byte{}
			}
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field PubKey", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.PubKey = append(m.PubKey[:0], dAtA[iNdEx:postIndex]...)
			if m.PubKey == nil {
				m.PubKey = []byte{}
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if skippy < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *MsgChangePubKeyResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: MsgChangePubKeyResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgChangePubKeyResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if skippy < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipTx(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowTx
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowTx
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowTx
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthTx
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupTx
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthTx
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthTx        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowTx          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupTx = fmt.Errorf("proto: unexpected end of group")
)
