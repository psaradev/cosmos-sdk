(window.webpackJsonp=window.webpackJsonp||[]).push([[153],{678:function(e,t,a){"use strict";a.r(t);var n=a(1),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"customization"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#customization"}},[e._v("#")]),e._v(" Customization")]),e._v(" "),a("p",{attrs:{synopsis:""}},[e._v("Learn how to configure your application to use IBC and send data packets to other chains.")]),e._v(" "),a("p",[e._v("This document serves as a guide for developers who want to write their own Inter-blockchain\nCommunication Protocol (IBC) applications for custom "),a("a",{attrs:{href:"https://github.com/cosmos/ics/blob/master/ibc/4_IBC_USECASES.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("use-cases"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("p",[e._v("Due to the modular design of the IBC protocol, IBC\napplication developers do not need to concern themselves with the low-level details of clients,\nconnections, and proof verification. Nevertheless a brief explanation of the lower levels of the\nstack is given so that application developers may have a high-level understanding of the IBC\nprotocol. Then the document goes into detail on the abstraction layer most relevant for application\ndevelopers (channels and ports), and describes how to define your own custom packets, and\n"),a("code",[e._v("IBCModule")]),e._v(" callbacks.")]),e._v(" "),a("p",[e._v("To have your module interact over IBC you must: bind to a port(s), define your own packet data and acknolwedgement structs as well as how to encode/decode them, and implement the\n"),a("code",[e._v("IBCModule")]),e._v(" interface. Below is a more detailed explanation of how to write an IBC application\nmodule correctly.")]),e._v(" "),a("h2",{attrs:{id:"pre-requisites-readings"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pre-requisites-readings"}},[e._v("#")]),e._v(" Pre-requisites Readings")]),e._v(" "),a("ul",[a("li",{attrs:{prereq:""}},[a("RouterLink",{attrs:{to:"/ibc/overview.html"}},[e._v("IBC Overview")]),e._v(")")],1),e._v(" "),a("li",{attrs:{prereq:""}},[a("RouterLink",{attrs:{to:"/ibc/integration.html"}},[e._v("IBC default integration")])],1)]),e._v(" "),a("h2",{attrs:{id:"create-a-custom-ibc-application-module"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#create-a-custom-ibc-application-module"}},[e._v("#")]),e._v(" Create a custom IBC application module")]),e._v(" "),a("h3",{attrs:{id:"implement-ibcmodule-interface-and-callbacks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#implement-ibcmodule-interface-and-callbacks"}},[e._v("#")]),e._v(" Implement "),a("code",[e._v("IBCModule")]),e._v(" Interface and callbacks")]),e._v(" "),a("p",[e._v("The Cosmos SDK expects all IBC modules to implement the "),a("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/tree/master/x/ibc/core/05-port/types/module.go",target:"_blank",rel:"noopener noreferrer"}},[a("code",[e._v("IBCModule")]),e._v("\ninterface"),a("OutboundLink")],1),e._v(". This\ninterface contains all of the callbacks IBC expects modules to implement. This section will describe\nthe callbacks that are called during channel handshake execution.")]),e._v(" "),a("p",[e._v("Here are the channel handshake callbacks that modules are expected to implement:")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gQ2FsbGVkIGJ5IElCQyBIYW5kbGVyIG9uIE1zZ09wZW5Jbml0CmZ1bmMgKGsgS2VlcGVyKSBPbkNoYW5PcGVuSW5pdChjdHggc2RrLkNvbnRleHQsCiAgICBvcmRlciBjaGFubmVsdHlwZXMuT3JkZXIsCiAgICBjb25uZWN0aW9uSG9wcyBbXXN0cmluZywKICAgIHBvcnRJRCBzdHJpbmcsCiAgICBjaGFubmVsSUQgc3RyaW5nLAogICAgY2hhbm5lbENhcCAqY2FwYWJpbGl0eXR5cGVzLkNhcGFiaWxpdHksCiAgICBjb3VudGVycGFydHkgY2hhbm5lbHR5cGVzLkNvdW50ZXJwYXJ0eSwKICAgIHZlcnNpb24gc3RyaW5nLAopIGVycm9yIHsKICAgIC8vIE9wZW5Jbml0IG11c3QgY2xhaW0gdGhlIGNoYW5uZWxDYXBhYmlsaXR5IHRoYXQgSUJDIHBhc3NlcyBpbnRvIHRoZSBjYWxsYmFjawogICAgaWYgZXJyIDo9IGsuQ2xhaW1DYXBhYmlsaXR5KGN0eCwgY2hhbkNhcCwgaG9zdC5DaGFubmVsQ2FwYWJpbGl0eVBhdGgocG9ydElELCBjaGFubmVsSUQpKTsgZXJyICE9IG5pbCB7CgkJCXJldHVybiBlcnIKCX0KCiAgICAvLyAuLi4gZG8gY3VzdG9tIGluaXRpYWxpemF0aW9uIGxvZ2ljCgogICAgLy8gVXNlIGFib3ZlIGFyZ3VtZW50cyB0byBkZXRlcm1pbmUgaWYgd2Ugd2FudCB0byBhYm9ydCBoYW5kc2hha2UKICAgIC8vIEV4YW1wbGVzOiBBYm9ydCBpZiBvcmRlciA9PSBVTk9SREVSRUQsCiAgICAvLyBBYm9ydCBpZiB2ZXJzaW9uIGlzIHVuc3VwcG9ydGVkCiAgICBlcnIgOj0gY2hlY2tBcmd1bWVudHMoYXJncykKICAgIHJldHVybiBlcnIKfQoKLy8gQ2FsbGVkIGJ5IElCQyBIYW5kbGVyIG9uIE1zZ09wZW5UcnkKT25DaGFuT3BlblRyeSgKICAgIGN0eCBzZGsuQ29udGV4dCwKICAgIG9yZGVyIGNoYW5uZWx0eXBlcy5PcmRlciwKICAgIGNvbm5lY3Rpb25Ib3BzIFtdc3RyaW5nLAogICAgcG9ydElELAogICAgY2hhbm5lbElEIHN0cmluZywKICAgIGNoYW5uZWxDYXAgKmNhcGFiaWxpdHl0eXBlcy5DYXBhYmlsaXR5LAogICAgY291bnRlcnBhcnR5IGNoYW5uZWx0eXBlcy5Db3VudGVycGFydHksCiAgICB2ZXJzaW9uLAogICAgY291bnRlcnBhcnR5VmVyc2lvbiBzdHJpbmcsCikgZXJyb3IgewogICAgLy8gTW9kdWxlIG1heSBoYXZlIGFscmVhZHkgY2xhaW1lZCBjYXBhYmlsaXR5IGluIE9uQ2hhbk9wZW5Jbml0IGluIHRoZSBjYXNlIG9mIGNyb3NzaW5nIGhlbGxvcwogICAgLy8gKGllIGNoYWluQSBhbmQgY2hhaW5CIGJvdGggY2FsbCBDaGFuT3BlbkluaXQgYmVmb3JlIG9uZSBvZiB0aGVtIGNhbGxzIENoYW5PcGVuVHJ5KQogICAgLy8gSWYgdGhlIG1vZHVsZSBjYW4gYWxyZWFkeSBhdXRoZW50aWNhdGUgdGhlIGNhcGFiaWxpdHkgdGhlbiB0aGUgbW9kdWxlIGFscmVhZHkgb3ducyBpdCBzbyB3ZSBkb24ndCBuZWVkIHRvIGNsYWltCiAgICAvLyBPdGhlcndpc2UsIG1vZHVsZSBkb2VzIG5vdCBoYXZlIGNoYW5uZWwgY2FwYWJpbGl0eSBhbmQgd2UgbXVzdCBjbGFpbSBpdCBmcm9tIElCQwogICAgaWYgIWsuQXV0aGVudGljYXRlQ2FwYWJpbGl0eShjdHgsIGNoYW5DYXAsIGhvc3QuQ2hhbm5lbENhcGFiaWxpdHlQYXRoKHBvcnRJRCwgY2hhbm5lbElEKSkgewogICAgICAgIC8vIE9ubHkgY2xhaW0gY2hhbm5lbCBjYXBhYmlsaXR5IHBhc3NlZCBiYWNrIGJ5IElCQyBtb2R1bGUgaWYgd2UgZG8gbm90IGFscmVhZHkgb3duIGl0CiAgICAgICAgaWYgZXJyIDo9IGsuc2NvcGVkS2VlcGVyLkNsYWltQ2FwYWJpbGl0eShjdHgsIGNoYW5DYXAsIGhvc3QuQ2hhbm5lbENhcGFiaWxpdHlQYXRoKHBvcnRJRCwgY2hhbm5lbElEKSk7IGVyciAhPSBuaWwgewogICAgICAgICAgICByZXR1cm4gZXJyCiAgICAgICAgfQogICAgfQogICAgCiAgICAvLyAuLi4gZG8gY3VzdG9tIGluaXRpYWxpemF0aW9uIGxvZ2ljCgogICAgLy8gVXNlIGFib3ZlIGFyZ3VtZW50cyB0byBkZXRlcm1pbmUgaWYgd2Ugd2FudCB0byBhYm9ydCBoYW5kc2hha2UKICAgIGVyciA6PSBjaGVja0FyZ3VtZW50cyhhcmdzKQogICAgcmV0dXJuIGVycgp9CgovLyBDYWxsZWQgYnkgSUJDIEhhbmRsZXIgb24gTXNnT3BlbkFjawpPbkNoYW5PcGVuQWNrKAogICAgY3R4IHNkay5Db250ZXh0LAogICAgcG9ydElELAogICAgY2hhbm5lbElEIHN0cmluZywKICAgIGNvdW50ZXJwYXJ0eVZlcnNpb24gc3RyaW5nLAopIGVycm9yIHsKICAgIC8vIC4uLiBkbyBjdXN0b20gaW5pdGlhbGl6YXRpb24gbG9naWMKCiAgICAvLyBVc2UgYWJvdmUgYXJndW1lbnRzIHRvIGRldGVybWluZSBpZiB3ZSB3YW50IHRvIGFib3J0IGhhbmRzaGFrZQogICAgZXJyIDo9IGNoZWNrQXJndW1lbnRzKGFyZ3MpCiAgICByZXR1cm4gZXJyCn0KCi8vIENhbGxlZCBieSBJQkMgSGFuZGxlciBvbiBNc2dPcGVuQ29uZmlybQpPbkNoYW5PcGVuQ29uZmlybSgKICAgIGN0eCBzZGsuQ29udGV4dCwKICAgIHBvcnRJRCwKICAgIGNoYW5uZWxJRCBzdHJpbmcsCikgZXJyb3IgewogICAgLy8gLi4uIGRvIGN1c3RvbSBpbml0aWFsaXphdGlvbiBsb2dpYwoKICAgIC8vIFVzZSBhYm92ZSBhcmd1bWVudHMgdG8gZGV0ZXJtaW5lIGlmIHdlIHdhbnQgdG8gYWJvcnQgaGFuZHNoYWtlCiAgICBlcnIgOj0gY2hlY2tBcmd1bWVudHMoYXJncykKICAgIHJldHVybiBlcnIKfQo="}}),e._v(" "),a("p",[e._v("The channel closing handshake will also invoke module callbacks that can return errors to abort the\nclosing handshake. Closing a channel is a 2-step handshake, the initiating chain calls\n"),a("code",[e._v("ChanCloseInit")]),e._v(" and the finalizing chain calls "),a("code",[e._v("ChanCloseConfirm")]),e._v(".")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gQ2FsbGVkIGJ5IElCQyBIYW5kbGVyIG9uIE1zZ0Nsb3NlSW5pdApPbkNoYW5DbG9zZUluaXQoCiAgICBjdHggc2RrLkNvbnRleHQsCiAgICBwb3J0SUQsCiAgICBjaGFubmVsSUQgc3RyaW5nLAopIGVycm9yIHsKICAgIC8vIC4uLiBkbyBjdXN0b20gZmluYWxpemF0aW9uIGxvZ2ljCgogICAgLy8gVXNlIGFib3ZlIGFyZ3VtZW50cyB0byBkZXRlcm1pbmUgaWYgd2Ugd2FudCB0byBhYm9ydCBoYW5kc2hha2UKICAgIGVyciA6PSBjaGVja0FyZ3VtZW50cyhhcmdzKQogICAgcmV0dXJuIGVycgp9CgovLyBDYWxsZWQgYnkgSUJDIEhhbmRsZXIgb24gTXNnQ2xvc2VDb25maXJtCk9uQ2hhbkNsb3NlQ29uZmlybSgKICAgIGN0eCBzZGsuQ29udGV4dCwKICAgIHBvcnRJRCwKICAgIGNoYW5uZWxJRCBzdHJpbmcsCikgZXJyb3IgewogICAgLy8gLi4uIGRvIGN1c3RvbSBmaW5hbGl6YXRpb24gbG9naWMKCiAgICAvLyBVc2UgYWJvdmUgYXJndW1lbnRzIHRvIGRldGVybWluZSBpZiB3ZSB3YW50IHRvIGFib3J0IGhhbmRzaGFrZQogICAgZXJyIDo9IGNoZWNrQXJndW1lbnRzKGFyZ3MpCiAgICByZXR1cm4gZXJyCn0K"}}),e._v(" "),a("h4",{attrs:{id:"channel-handshake-version-negotiation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#channel-handshake-version-negotiation"}},[e._v("#")]),e._v(" Channel Handshake Version Negotiation")]),e._v(" "),a("p",[e._v("Application modules are expected to verify versioning used during the channel handshake procedure.")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("ChanOpenInit")]),e._v(" callback should verify that the "),a("code",[e._v("MsgChanOpenInit.Version")]),e._v(" is valid")]),e._v(" "),a("li",[a("code",[e._v("ChanOpenTry")]),e._v(" callback should verify that the "),a("code",[e._v("MsgChanOpenTry.Version")]),e._v(" is valid and that "),a("code",[e._v("MsgChanOpenTry.CounterpartyVersion")]),e._v(" is valid.")]),e._v(" "),a("li",[a("code",[e._v("ChanOpenAck")]),e._v(" callback should verify that the "),a("code",[e._v("MsgChanOpenAck.CounterpartyVersion")]),e._v(" is valid and supported.")])]),e._v(" "),a("p",[e._v("Versions must be strings but can implement any versioning structure. If your application plans to\nhave linear releases then semantic versioning is recommended. If your application plans to release\nvarious features in between major releases then it is advised to use the same versioning scheme\nas IBC. This versioning scheme specifies a version identifier and compatible feature set with\nthat identifier. Valid version selection includes selecting a compatible version identifier with\na subset of features supported by your application for that version. The struct is used for this\nscheme can be found in "),a("code",[e._v("03-connection/types")]),e._v(".")]),e._v(" "),a("p",[e._v("Since the version type is a string, applications have the ability to do simple version verification\nvia string matching or they can use the already impelemented versioning system and pass the proto\nencoded version into each handhshake call as necessary.")]),e._v(" "),a("p",[e._v("ICS20 currently implements basic string matching with a single supported version.")]),e._v(" "),a("h3",{attrs:{id:"bind-ports"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bind-ports"}},[e._v("#")]),e._v(" Bind Ports")]),e._v(" "),a("p",[e._v("Currently, ports must be bound on app initialization. A module may bind to ports in "),a("code",[e._v("InitGenesis")]),e._v("\nlike so:")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyBJbml0R2VuZXNpcyhjdHggc2RrLkNvbnRleHQsIGtlZXBlciBrZWVwZXIuS2VlcGVyLCBzdGF0ZSB0eXBlcy5HZW5lc2lzU3RhdGUpIHsKICAgIC8vIC4uLiBvdGhlciBpbml0aWFsaXphdGlvbiBsb2dpYwoKICAgIC8vIE9ubHkgdHJ5IHRvIGJpbmQgdG8gcG9ydCBpZiBpdCBpcyBub3QgYWxyZWFkeSBib3VuZCwgc2luY2Ugd2UgbWF5IGFscmVhZHkgb3duCiAgICAvLyBwb3J0IGNhcGFiaWxpdHkgZnJvbSBjYXBhYmlsaXR5IEluaXRHZW5lc2lzCiAgICBpZiAhaXNCb3VuZChjdHgsIHN0YXRlLlBvcnRJRCkgewogICAgICAgIC8vIG1vZHVsZSBiaW5kcyB0byBkZXNpcmVkIHBvcnRzIG9uIEluaXRDaGFpbgogICAgICAgIC8vIGFuZCBjbGFpbXMgcmV0dXJuZWQgY2FwYWJpbGl0aWVzCiAgICAgICAgY2FwMSA6PSBrZWVwZXIuSUJDUG9ydEtlZXBlci5CaW5kUG9ydChjdHgsIHBvcnQxKQogICAgICAgIGNhcDIgOj0ga2VlcGVyLklCQ1BvcnRLZWVwZXIuQmluZFBvcnQoY3R4LCBwb3J0MikKICAgICAgICBjYXAzIDo9IGtlZXBlci5JQkNQb3J0S2VlcGVyLkJpbmRQb3J0KGN0eCwgcG9ydDMpCgogICAgICAgIC8vIE5PVEU6IFRoZSBtb2R1bGUncyBzY29wZWQgY2FwYWJpbGl0eSBrZWVwZXIgbXVzdCBiZSBwcml2YXRlCiAgICAgICAga2VlcGVyLnNjb3BlZEtlZXBlci5DbGFpbUNhcGFiaWxpdHkoY2FwMSkKICAgICAgICBrZWVwZXIuc2NvcGVkS2VlcGVyLkNsYWltQ2FwYWJpbGl0eShjYXAyKQogICAgICAgIGtlZXBlci5zY29wZWRLZWVwZXIuQ2xhaW1DYXBhYmlsaXR5KGNhcDMpCiAgICB9CgogICAgLy8gLi4uIG1vcmUgaW5pdGlhbGl6YXRpb24gbG9naWMKfQo="}}),e._v(" "),a("h3",{attrs:{id:"custom-packets"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#custom-packets"}},[e._v("#")]),e._v(" Custom Packets")]),e._v(" "),a("p",[e._v("Modules connected by a channel must agree on what application data they are sending over the\nchannel, as well as how they will encode/decode it. This process is not specified by IBC as it is up\nto each application module to determine how to implement this agreement. However, for most\napplications this will happen as a version negotiation during the channel handshake. While more\ncomplex version negotiation is possible to implement inside the channel opening handshake, a very\nsimple version negotation is implemented in the "),a("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/tree/master/x/ibc-transfer/module.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("ibc-transfer module"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("p",[e._v("Thus, a module must define its a custom packet data structure, along with a well-defined way to\nencode and decode it to and from "),a("code",[e._v("[]byte")]),e._v(".")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gQ3VzdG9tIHBhY2tldCBkYXRhIGRlZmluZWQgaW4gYXBwbGljYXRpb24gbW9kdWxlCnR5cGUgQ3VzdG9tUGFja2V0RGF0YSBzdHJ1Y3QgewogICAgLy8gQ3VzdG9tIGZpZWxkcyAuLi4KfQoKRW5jb2RlUGFja2V0RGF0YShwYWNrZXREYXRhIEN1c3RvbVBhY2tldERhdGEpIFtdYnl0ZSB7CiAgICAvLyBlbmNvZGUgcGFja2V0RGF0YSB0byBieXRlcwp9CgpEZWNvZGVQYWNrZXREYXRhKGVuY29kZWQgW11ieXRlKSAoQ3VzdG9tUGFja2V0RGF0YSkgewogICAgLy8gZGVjb2RlIGZyb20gYnl0ZXMgdG8gcGFja2V0IGRhdGEKfQo="}}),e._v(" "),a("p",[e._v("Then a module must encode its packet data before sending it through IBC.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gU2VuZGluZyBjdXN0b20gYXBwbGljYXRpb24gcGFja2V0IGRhdGEKZGF0YSA6PSBFbmNvZGVQYWNrZXREYXRhKGN1c3RvbVBhY2tldERhdGEpCnBhY2tldC5EYXRhID0gZGF0YQpJQkNDaGFubmVsS2VlcGVyLlNlbmRQYWNrZXQoY3R4LCBwYWNrZXQpCg=="}}),e._v(" "),a("p",[e._v("A module receiving a packet must decode the "),a("code",[e._v("PacketData")]),e._v(" into a structure it expects so that it can\nact on it.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gUmVjZWl2aW5nIGN1c3RvbSBhcHBsaWNhdGlvbiBwYWNrZXQgZGF0YSAoaW4gT25SZWN2UGFja2V0KQpwYWNrZXREYXRhIDo9IERlY29kZVBhY2tldERhdGEocGFja2V0LkRhdGEpCi8vIGhhbmRsZSByZWNlaXZlZCBjdXN0b20gcGFja2V0IGRhdGEK"}}),e._v(" "),a("h4",{attrs:{id:"packet-flow-handling"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#packet-flow-handling"}},[e._v("#")]),e._v(" Packet Flow Handling")]),e._v(" "),a("p",[e._v("Just as IBC expected modules to implement callbacks for channel handshakes, IBC also expects modules\nto implement callbacks for handling the packet flow through a channel.")]),e._v(" "),a("p",[e._v("Once a module A and module B are connected to each other, relayers can start relaying packets and\nacknowledgements back and forth on the channel.")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://media.githubusercontent.com/media/cosmos/ics/master/spec/ics-004-channel-and-packet-semantics/packet-state-machine.png",alt:"IBC packet flow diagram"}})]),e._v(" "),a("p",[e._v("Briefly, a successful packet flow works as follows:")]),e._v(" "),a("ol",[a("li",[e._v("module A sends a packet through the IBC module")]),e._v(" "),a("li",[e._v("the packet is received by module B")]),e._v(" "),a("li",[e._v("if module B writes an acknowledgement of the packet then module A will process the\nacknowledgement")]),e._v(" "),a("li",[e._v("if the packet is not successfully received before the timeout, then module A processes the\npacket's timeout.")])]),e._v(" "),a("h5",{attrs:{id:"sending-packets"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sending-packets"}},[e._v("#")]),e._v(" Sending Packets")]),e._v(" "),a("p",[e._v("Modules do not send packets through callbacks, since the modules initiate the action of sending\npackets to the IBC module, as opposed to other parts of the packet flow where msgs sent to the IBC\nmodule must trigger execution on the port-bound module through the use of callbacks. Thus, to send a\npacket a module simply needs to call "),a("code",[e._v("SendPacket")]),e._v(" on the "),a("code",[e._v("IBCChannelKeeper")]),e._v(".")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gcmV0cmlldmUgdGhlIGR5bmFtaWMgY2FwYWJpbGl0eSBmb3IgdGhpcyBjaGFubmVsCmNoYW5uZWxDYXAgOj0gc2NvcGVkS2VlcGVyLkdldENhcGFiaWxpdHkoY3R4LCBjaGFubmVsQ2FwTmFtZSkKLy8gU2VuZGluZyBjdXN0b20gYXBwbGljYXRpb24gcGFja2V0IGRhdGEKZGF0YSA6PSBFbmNvZGVQYWNrZXREYXRhKGN1c3RvbVBhY2tldERhdGEpCnBhY2tldC5EYXRhID0gZGF0YQovLyBTZW5kIHBhY2tldCB0byBJQkMsIGF1dGhlbnRpY2F0aW5nIHdpdGggY2hhbm5lbENhcApJQkNDaGFubmVsS2VlcGVyLlNlbmRQYWNrZXQoY3R4LCBjaGFubmVsQ2FwLCBwYWNrZXQpCg=="}}),e._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",[e._v("In order to prevent modules from sending packets on channels they do not own, IBC expects\nmodules to pass in the correct channel capability for the packet's source channel.")])]),e._v(" "),a("h5",{attrs:{id:"receiving-packets"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#receiving-packets"}},[e._v("#")]),e._v(" Receiving Packets")]),e._v(" "),a("p",[e._v("To handle receiving packets, the module must implement the "),a("code",[e._v("OnRecvPacket")]),e._v(" callback. This gets\ninvoked by the IBC module after the packet has been proved valid and correctly processed by the IBC\nkeepers. Thus, the "),a("code",[e._v("OnRecvPacket")]),e._v(" callback only needs to worry about making the appropriate state\nchanges given the packet data without worrying about whether the packet is valid or not.")]),e._v(" "),a("p",[e._v("Modules may return an acknowledgement as a byte string and return it to the IBC handler.\nThe IBC handler will then commit this acknowledgement of the packet so that a relayer may relay the\nacknowledgement back to the sender module.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"T25SZWN2UGFja2V0KAogICAgY3R4IHNkay5Db250ZXh0LAogICAgcGFja2V0IGNoYW5uZWx0eXBlcy5QYWNrZXQsCikgKHJlcyAqc2RrLlJlc3VsdCwgYWNrIFtdYnl0ZSwgYWJvcnQgZXJyb3IpIHsKICAgIC8vIERlY29kZSB0aGUgcGFja2V0IGRhdGEKICAgIHBhY2tldERhdGEgOj0gRGVjb2RlUGFja2V0RGF0YShwYWNrZXQuRGF0YSkKCiAgICAvLyBkbyBhcHBsaWNhdGlvbiBzdGF0ZSBjaGFuZ2VzIGJhc2VkIG9uIHBhY2tldCBkYXRhCiAgICAvLyBhbmQgcmV0dXJuIHJlc3VsdCwgYWNrbm93bGVkZ2VtZW50IGFuZCBhYm9ydEVycgogICAgLy8gTm90ZTogYWJvcnRFcnIgaXMgb25seSBub3QgbmlsIGlmIHdlIG5lZWQgdG8gYWJvcnQgdGhlIGVudGlyZSByZWNlaXZlIHBhY2tldCwgYW5kIGFsbG93IGEgcmVwbGF5IG9mIHRoZSByZWNlaXZlLgogICAgLy8gSWYgdGhlIGFwcGxpY2F0aW9uIHN0YXRlIGNoYW5nZSBmYWlsZWQgYnV0IHdlIGRvIG5vdCB3YW50IHRvIHJlcGxheSB0aGUgcGFja2V0LAogICAgLy8gc2ltcGx5IGVuY29kZSB0aGlzIGZhaWx1cmUgd2l0aCByZWxldmFudCBpbmZvcm1hdGlvbiBpbiBhY2sgYW5kIHJldHVybiBuaWwgZXJyb3IKICAgIHJlcywgYWNrLCBhYm9ydEVyciA6PSBwcm9jZXNzUGFja2V0KGN0eCwgcGFja2V0LCBwYWNrZXREYXRhKQoKICAgIC8vIGlmIHdlIG5lZWQgdG8gYWJvcnQgdGhlIGVudGlyZSByZWNlaXZlIHBhY2tldCwgcmV0dXJuIGVycm9yCiAgICBpZiBhYm9ydEVyciAhPSBuaWwgewogICAgICAgIHJldHVybiBuaWwsIG5pbCwgYWJvcnRFcnIKICAgIH0KCiAgICAvLyBFbmNvZGUgdGhlIGFjayBzaW5jZSBJQkMgZXhwZWN0cyBhY2tub3dsZWRnZW1lbnQgYnl0ZXMKICAgIGFja0J5dGVzIDo9IEVuY29kZUFja25vd2xlZGdlbWVudChhY2spCgogICAgcmV0dXJuIHJlcywgYWNrQnl0ZXMsIG5pbAp9Cg=="}}),e._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",[a("code",[e._v("OnRecvPacket")]),e._v(" should "),a("strong",[e._v("only")]),e._v(" return an error if we want the entire receive packet execution\n(including the IBC handling) to be reverted. This will allow the packet to be replayed in the case\nthat some mistake in the relaying caused the packet processing to fail.")]),e._v(" "),a("p",[e._v("If some application-level error happened while processing the packet data, in most cases, we will\nnot want the packet processing to revert. Instead, we may want to encode this failure into the\nacknowledgement and finish processing the packet. This will ensure the packet cannot be replayed,\nand will also allow the sender module to potentially remediate the situation upon receiving the\nacknowledgement. An example of this technique is in the "),a("code",[e._v("ibc-transfer")]),e._v(" module's\n"),a("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/tree/master/x/ibc-transfer/module.go",target:"_blank",rel:"noopener noreferrer"}},[a("code",[e._v("OnRecvPacket")]),a("OutboundLink")],1),e._v(".")])]),e._v(" "),a("h3",{attrs:{id:"acknowledgements"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#acknowledgements"}},[e._v("#")]),e._v(" Acknowledgements")]),e._v(" "),a("p",[e._v("Modules may commit an acknowledgement upon receiving and processing a packet in the case of synchronous packet processing.\nIn the case where a packet is processed at some later point after the packet has been received (asynchronous execution), the acknowledgement\nwill be written once the packet has been processed by the application which may be well after the packet receipt.")]),e._v(" "),a("p",[e._v("NOTE: Most blockchain modules will want to use the synchronous execution model in which the module processes and writes the acknowledgement\nfor a packet as soon as it has been received from the IBC module.")]),e._v(" "),a("p",[e._v("This acknowledgement can then be relayed back to the original sender chain, which can take action\ndepending on the contents of the acknowledgement.")]),e._v(" "),a("p",[e._v("Just as packet data was opaque to IBC, acknowledgements are similarly opaque. Modules must pass and\nreceive acknowledegments with the IBC modules as byte strings.")]),e._v(" "),a("p",[e._v("Thus, modules must agree on how to encode/decode acknowledgements. The process of creating an\nacknowledgement struct along with encoding and decoding it, is very similar to the packet data\nexample above. "),a("a",{attrs:{href:"https://github.com/cosmos/ics/tree/master/spec/ics-004-channel-and-packet-semantics#acknowledgement-envelope",target:"_blank",rel:"noopener noreferrer"}},[e._v("ICS 04"),a("OutboundLink")],1),e._v("\nspecifies a recommended format for acknowledgements. This acknowledgement type can be imported from\n"),a("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/tree/master/x/ibc/core/04-channel/types",target:"_blank",rel:"noopener noreferrer"}},[e._v("channel types"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("p",[e._v("While modules may choose arbitrary acknowledgement structs, a default acknowledgement types is provided by IBC "),a("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/blob/master/proto/ibc/core/channel/v1/channel.proto",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),a("OutboundLink")],1),e._v(":")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"proto",base64:"Ly8gQWNrbm93bGVkZ2VtZW50IGlzIHRoZSByZWNvbW1lbmRlZCBhY2tub3dsZWRnZW1lbnQgZm9ybWF0IHRvIGJlIHVzZWQgYnkKLy8gYXBwLXNwZWNpZmljIHByb3RvY29scy4KLy8gTk9URTogVGhlIGZpZWxkIG51bWJlcnMgMjEgYW5kIDIyIHdlcmUgZXhwbGljaXRseSBjaG9zZW4gdG8gYXZvaWQgYWNjaWRlbnRhbAovLyBjb25mbGljdHMgd2l0aCBvdGhlciBwcm90b2J1ZiBtZXNzYWdlIGZvcm1hdHMgdXNlZCBmb3IgYWNrbm93bGVkZ2VtZW50cy4KLy8gVGhlIGZpcnN0IGJ5dGUgb2YgYW55IG1lc3NhZ2Ugd2l0aCB0aGlzIGZvcm1hdCB3aWxsIGJlIHRoZSBub24tQVNDSUkgdmFsdWVzCi8vIGAweGFhYCAocmVzdWx0KSBvciBgMHhiMmAgKGVycm9yKS4gSW1wbGVtZW50ZWQgYXMgZGVmaW5lZCBieSBJQ1M6Ci8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jb3Ntb3MvaWNzL3RyZWUvbWFzdGVyL3NwZWMvaWNzLTAwNC1jaGFubmVsLWFuZC1wYWNrZXQtc2VtYW50aWNzI2Fja25vd2xlZGdlbWVudC1lbnZlbG9wZQptZXNzYWdlIEFja25vd2xlZGdlbWVudCB7CiAgLy8gcmVzcG9uc2UgY29udGFpbnMgZWl0aGVyIGEgcmVzdWx0IG9yIGFuIGVycm9yIGFuZCBtdXN0IGJlIG5vbi1lbXB0eQogIG9uZW9mIHJlc3BvbnNlIHsKICAgIGJ5dGVzICByZXN1bHQgPSAyMTsKICAgIHN0cmluZyBlcnJvciAgPSAyMjsKICB9Cn0K"}}),e._v(" "),a("h4",{attrs:{id:"acknowledging-packets"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#acknowledging-packets"}},[e._v("#")]),e._v(" Acknowledging Packets")]),e._v(" "),a("p",[e._v("After a module writes an acknowledgement, a relayer can relay back the acknowledgement to the sender module. The sender module can\nthen process the acknowledgement using the "),a("code",[e._v("OnAcknowledgementPacket")]),e._v(" callback. The contents of the\nacknowledgement is entirely upto the modules on the channel (just like the packet data); however, it\nmay often contain information on whether the packet was successfully processed along\nwith some additional data that could be useful for remediation if the packet processing failed.")]),e._v(" "),a("p",[e._v("Since the modules are responsible for agreeing on an encoding/decoding standard for packet data and\nacknowledgements, IBC will pass in the acknowledgements as "),a("code",[e._v("[]byte")]),e._v(" to this callback. The callback\nis responsible for decoding the acknowledgement and processing it.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"T25BY2tub3dsZWRnZW1lbnRQYWNrZXQoCiAgICBjdHggc2RrLkNvbnRleHQsCiAgICBwYWNrZXQgY2hhbm5lbHR5cGVzLlBhY2tldCwKICAgIGFja25vd2xlZGdlbWVudCBbXWJ5dGUsCikgKCpzZGsuUmVzdWx0LCBlcnJvcikgewogICAgLy8gRGVjb2RlIGFja25vd2xlZGdlbWVudAogICAgYWNrIDo9IERlY29kZUFja25vd2xlZGdlbWVudChhY2tub3dsZWRnZW1lbnQpCgogICAgLy8gcHJvY2VzcyBhY2sKICAgIHJlcywgZXJyIDo9IHByb2Nlc3NBY2soYWNrKQogICAgcmV0dXJuIHJlcywgZXJyCn0K"}}),e._v(" "),a("h4",{attrs:{id:"timeout-packets"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#timeout-packets"}},[e._v("#")]),e._v(" Timeout Packets")]),e._v(" "),a("p",[e._v("If the timeout for a packet is reached before the packet is successfully received or the\ncounterparty channel end is closed before the packet is successfully received, then the receiving\nchain can no longer process it. Thus, the sending chain must process the timeout using\n"),a("code",[e._v("OnTimeoutPacket")]),e._v(" to handle this situation. Again the IBC module will verify that the timeout is\nindeed valid, so our module only needs to implement the state machine logic for what to do once a\ntimeout is reached and the packet can no longer be received.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"T25UaW1lb3V0UGFja2V0KAogICAgY3R4IHNkay5Db250ZXh0LAogICAgcGFja2V0IGNoYW5uZWx0eXBlcy5QYWNrZXQsCikgKCpzZGsuUmVzdWx0LCBlcnJvcikgewogICAgLy8gZG8gY3VzdG9tIHRpbWVvdXQgbG9naWMKfQo="}}),e._v(" "),a("h3",{attrs:{id:"routing"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#routing"}},[e._v("#")]),e._v(" Routing")]),e._v(" "),a("p",[e._v("As mentioned above, modules must implement the IBC module interface (which contains both channel\nhandshake callbacks and packet handling callbacks). The concrete implementation of this interface\nmust be registered with the module name as a route on the IBC "),a("code",[e._v("Router")]),e._v(".")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"Ly8gYXBwLmdvCmZ1bmMgTmV3QXBwKC4uLmFyZ3MpICpBcHAgewovLyAuLi4KCi8vIENyZWF0ZSBzdGF0aWMgSUJDIHJvdXRlciwgYWRkIG1vZHVsZSByb3V0ZXMsIHRoZW4gc2V0IGFuZCBzZWFsIGl0CmliY1JvdXRlciA6PSBwb3J0Lk5ld1JvdXRlcigpCgppYmNSb3V0ZXIuQWRkUm91dGUoaWJjdHJhbnNmZXJ0eXBlcy5Nb2R1bGVOYW1lLCB0cmFuc2Zlck1vZHVsZSkKLy8gTm90ZTogbW9kdWxlQ2FsbGJhY2tzIG11c3QgaW1wbGVtZW50IElCQ01vZHVsZSBpbnRlcmZhY2UKaWJjUm91dGVyLkFkZFJvdXRlKG1vZHVsZU5hbWUsIG1vZHVsZUNhbGxiYWNrcykKCi8vIFNldHRpbmcgUm91dGVyIHdpbGwgZmluYWxpemUgYWxsIHJvdXRlcyBieSBzZWFsaW5nIHJvdXRlcgovLyBObyBtb3JlIHJvdXRlcyBjYW4gYmUgYWRkZWQKYXBwLklCQ0tlZXBlci5TZXRSb3V0ZXIoaWJjUm91dGVyKQo="}}),e._v(" "),a("h2",{attrs:{id:"working-example"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#working-example"}},[e._v("#")]),e._v(" Working Example")]),e._v(" "),a("p",[e._v("For a real working example of an IBC application, you can look through the "),a("code",[e._v("ibc-transfer")]),e._v(" module\nwhich implements everything discussed above.")]),e._v(" "),a("p",[e._v("Here are the useful parts of the module to look at:")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/blob/master/x/ibc-transfer/genesis.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("Binding to transfer\nport"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/blob/master/x/ibc-transfer/keeper/relay.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("Sending transfer\npackets"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/blob/master/x/ibc-transfer/module.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("Implementing IBC\ncallbacks"),a("OutboundLink")],1)]),e._v(" "),a("h2",{attrs:{hide:"",id:"next"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#next"}},[e._v("#")]),e._v(" Next")]),e._v(" "),a("p",{attrs:{hide:""}},[e._v("Learn about "),a("RouterLink",{attrs:{to:"/building-modules/intro.html"}},[e._v("building modules")])],1)],1)}),[],!1,null,null,null);t.default=o.exports}}]);