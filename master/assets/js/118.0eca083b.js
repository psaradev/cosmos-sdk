(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{767:function(e,c,t){"use strict";t.r(c);var l=t(1),o=Object(l.a)({},(function(){var e=this,c=e.$createElement,t=e._self._c||c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"query-services"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#query-services"}},[e._v("#")]),e._v(" Query Services")]),e._v(" "),t("p",{attrs:{synopsis:""}},[e._v("A query service processes "),t("RouterLink",{attrs:{to:"/building-modules/messages-and-queries.html#queries"}},[t("code",[e._v("queries")])]),e._v(". Query services are specific to the module in which they are defined, and only process "),t("code",[e._v("queries")]),e._v(" defined within said module. They are called from "),t("code",[e._v("BaseApp")]),e._v("'s "),t("RouterLink",{attrs:{to:"/core/baseapp.html#query"}},[t("code",[e._v("Query")]),e._v(" method")]),e._v(".")],1),e._v(" "),t("h2",{attrs:{id:"pre-requisite-readings"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#pre-requisite-readings"}},[e._v("#")]),e._v(" Pre-requisite Readings")]),e._v(" "),t("ul",[t("li",{attrs:{prereq:""}},[t("RouterLink",{attrs:{to:"/building-modules/module-manager.html"}},[e._v("Module Manager")])],1),e._v(" "),t("li",{attrs:{prereq:""}},[t("RouterLink",{attrs:{to:"/building-modules/messages-and-queries.html"}},[e._v("Messages and Queries")])],1)]),e._v(" "),t("h2",{attrs:{id:"querier-type"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#querier-type"}},[e._v("#")]),e._v(" "),t("code",[e._v("Querier")]),e._v(" type")]),e._v(" "),t("p",[e._v("The "),t("code",[e._v("querier")]),e._v(" type defined in the Cosmos SDK will be deprecated in favor of "),t("a",{attrs:{href:"#grpc-service"}},[e._v("gRPC Services")]),e._v(". It specifies the typical structure of a "),t("code",[e._v("querier")]),e._v(" function:")]),e._v(" "),t("p",[t("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"cGFja2FnZSB0eXBlcwoKaW1wb3J0ICgKCWFiY2kgJnF1b3Q7Z2l0aHViLmNvbS90ZW5kZXJtaW50L3RlbmRlcm1pbnQvYWJjaS90eXBlcyZxdW90OwopCgovLyBRdWVyaWVyIGRlZmluZXMgYSBmdW5jdGlvbiB0eXBlIHRoYXQgYSBtb2R1bGUgcXVlcmllciBtdXN0IGltcGxlbWVudCB0byBoYW5kbGUKLy8gY3VzdG9tIGNsaWVudCBxdWVyaWVzLgp0eXBlIFF1ZXJpZXIgPSBmdW5jKGN0eCBDb250ZXh0LCBwYXRoIFtdc3RyaW5nLCByZXEgYWJjaS5SZXF1ZXN0UXVlcnkpIChbXWJ5dGUsIGVycm9yKQo="}})],1),e._v(" "),t("p",[e._v("Let us break it down:")]),e._v(" "),t("ul",[t("li",[e._v("The "),t("code",[e._v("path")]),e._v(" is an array of "),t("code",[e._v("string")]),e._v("s that contains the type of the query, and that can also contain "),t("code",[e._v("query")]),e._v(" arguments. See "),t("RouterLink",{attrs:{to:"/building-modules/messages-and-queries.html#queries"}},[t("code",[e._v("queries")])]),e._v(" for more information.")],1),e._v(" "),t("li",[e._v("The "),t("code",[e._v("req")]),e._v(" itself is primarily used to retrieve arguments if they are too large to fit in the "),t("code",[e._v("path")]),e._v(". This is done using the "),t("code",[e._v("Data")]),e._v(" field of "),t("code",[e._v("req")]),e._v(".")]),e._v(" "),t("li",[e._v("The "),t("RouterLink",{attrs:{to:"/core/context.html"}},[t("code",[e._v("Context")])]),e._v(" contains all the necessary information needed to process the "),t("code",[e._v("query")]),e._v(", as well as a branch of the latest state. It is primarily used by the "),t("RouterLink",{attrs:{to:"/building-modules/keeper.html"}},[t("code",[e._v("keeper")])]),e._v(" to access the state.")],1),e._v(" "),t("li",[e._v("The result "),t("code",[e._v("res")]),e._v(" returned to "),t("code",[e._v("BaseApp")]),e._v(", marshalled using the application's "),t("RouterLink",{attrs:{to:"/core/encoding.html"}},[t("code",[e._v("codec")])]),e._v(".")],1)]),e._v(" "),t("h2",{attrs:{id:"implementation-of-a-module-query-service"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#implementation-of-a-module-query-service"}},[e._v("#")]),e._v(" Implementation of a module query service")]),e._v(" "),t("h3",{attrs:{id:"grpc-service"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#grpc-service"}},[e._v("#")]),e._v(" gRPC Service")]),e._v(" "),t("p",[e._v("When defining a Protobuf "),t("code",[e._v("Query")]),e._v(" service, a "),t("code",[e._v("QueryServer")]),e._v(" interface is generated for each module with all the service methods:")]),e._v(" "),t("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"dHlwZSBRdWVyeVNlcnZlciBpbnRlcmZhY2UgewoJUXVlcnlCYWxhbmNlKGNvbnRleHQuQ29udGV4dCwgKlF1ZXJ5QmFsYW5jZVBhcmFtcykgKCp0eXBlcy5Db2luLCBlcnJvcikKCVF1ZXJ5QWxsQmFsYW5jZXMoY29udGV4dC5Db250ZXh0LCAqUXVlcnlBbGxCYWxhbmNlc1BhcmFtcykgKCpRdWVyeUFsbEJhbGFuY2VzUmVzcG9uc2UsIGVycm9yKQp9Cg=="}}),e._v(" "),t("p",[e._v("These custom queries methods should be implemented by a module's keeper, typically in "),t("code",[e._v("./keeper/grpc_query.go")]),e._v(". The first parameter of these methods is a generic "),t("code",[e._v("context.Context")]),e._v(", whereas querier methods generally need an instance of "),t("code",[e._v("sdk.Context")]),e._v(" to read\nfrom the store. Therefore, the SDK provides a function "),t("code",[e._v("sdk.UnwrapSDKContext")]),e._v(" to retrieve the "),t("code",[e._v("sdk.Context")]),e._v(" from the provided\n"),t("code",[e._v("context.Context")]),e._v(".")]),e._v(" "),t("p",[e._v("Here's an example implementation for the bank module:")]),e._v(" "),t("p",[t("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"cGFja2FnZSBrZWVwZXIKCmltcG9ydCAoCgkmcXVvdDtjb250ZXh0JnF1b3Q7CgoJJnF1b3Q7Z29vZ2xlLmdvbGFuZy5vcmcvZ3JwYy9jb2RlcyZxdW90OwoJJnF1b3Q7Z29vZ2xlLmdvbGFuZy5vcmcvZ3JwYy9zdGF0dXMmcXVvdDsKCgkmcXVvdDtnaXRodWIuY29tL2Nvc21vcy9jb3Ntb3Mtc2RrL3N0b3JlL3ByZWZpeCZxdW90OwoJc2RrICZxdW90O2dpdGh1Yi5jb20vY29zbW9zL2Nvc21vcy1zZGsvdHlwZXMmcXVvdDsKCSZxdW90O2dpdGh1Yi5jb20vY29zbW9zL2Nvc21vcy1zZGsvdHlwZXMvcXVlcnkmcXVvdDsKCSZxdW90O2dpdGh1Yi5jb20vY29zbW9zL2Nvc21vcy1zZGsveC9iYW5rL3R5cGVzJnF1b3Q7CikKCnZhciBfIHR5cGVzLlF1ZXJ5U2VydmVyID0gQmFzZUtlZXBlcnt9CgovLyBCYWxhbmNlIGltcGxlbWVudHMgdGhlIFF1ZXJ5L0JhbGFuY2UgZ1JQQyBtZXRob2QKZnVuYyAoayBCYXNlS2VlcGVyKSBCYWxhbmNlKGN0eCBjb250ZXh0LkNvbnRleHQsIHJlcSAqdHlwZXMuUXVlcnlCYWxhbmNlUmVxdWVzdCkgKCp0eXBlcy5RdWVyeUJhbGFuY2VSZXNwb25zZSwgZXJyb3IpIHsKCWlmIHJlcSA9PSBuaWwgewoJCXJldHVybiBuaWwsIHN0YXR1cy5FcnJvcihjb2Rlcy5JbnZhbGlkQXJndW1lbnQsICZxdW90O2VtcHR5IHJlcXVlc3QmcXVvdDspCgl9CgoJaWYgcmVxLkFkZHJlc3MgPT0gJnF1b3Q7JnF1b3Q7IHsKCQlyZXR1cm4gbmlsLCBzdGF0dXMuRXJyb3IoY29kZXMuSW52YWxpZEFyZ3VtZW50LCAmcXVvdDthZGRyZXNzIGNhbm5vdCBiZSBlbXB0eSZxdW90OykKCX0KCglpZiByZXEuRGVub20gPT0gJnF1b3Q7JnF1b3Q7IHsKCQlyZXR1cm4gbmlsLCBzdGF0dXMuRXJyb3IoY29kZXMuSW52YWxpZEFyZ3VtZW50LCAmcXVvdDtpbnZhbGlkIGRlbm9tJnF1b3Q7KQoJfQoKCXNka0N0eCA6PSBzZGsuVW53cmFwU0RLQ29udGV4dChjdHgpCglhZGRyZXNzLCBlcnIgOj0gc2RrLkFjY0FkZHJlc3NGcm9tQmVjaDMyKHJlcS5BZGRyZXNzKQoJaWYgZXJyICE9IG5pbCB7CgkJcmV0dXJuIG5pbCwgZXJyCgl9CgoJYmFsYW5jZSA6PSBrLkdldEJhbGFuY2Uoc2RrQ3R4LCBhZGRyZXNzLCByZXEuRGVub20pCgoJcmV0dXJuICZhbXA7dHlwZXMuUXVlcnlCYWxhbmNlUmVzcG9uc2V7QmFsYW5jZTogJmFtcDtiYWxhbmNlfSwgbmlsCn0KCi8vIEFsbEJhbGFuY2VzIGltcGxlbWVudHMgdGhlIFF1ZXJ5L0FsbEJhbGFuY2VzIGdSUEMgbWV0aG9kCmZ1bmMgKGsgQmFzZUtlZXBlcikgQWxsQmFsYW5jZXMoY3R4IGNvbnRleHQuQ29udGV4dCwgcmVxICp0eXBlcy5RdWVyeUFsbEJhbGFuY2VzUmVxdWVzdCkgKCp0eXBlcy5RdWVyeUFsbEJhbGFuY2VzUmVzcG9uc2UsIGVycm9yKSB7CglpZiByZXEgPT0gbmlsIHsKCQlyZXR1cm4gbmlsLCBzdGF0dXMuRXJyb3IoY29kZXMuSW52YWxpZEFyZ3VtZW50LCAmcXVvdDtlbXB0eSByZXF1ZXN0JnF1b3Q7KQoJfQoKCWFkZHIsIGVyciA6PSBzZGsuQWNjQWRkcmVzc0Zyb21CZWNoMzIocmVxLkFkZHJlc3MpCglpZiBlcnIgIT0gbmlsIHsKCQlyZXR1cm4gbmlsLCBlcnIKCX0KCglzZGtDdHggOj0gc2RrLlVud3JhcFNES0NvbnRleHQoY3R4KQoKCWJhbGFuY2VzIDo9IHNkay5OZXdDb2lucygpCglzdG9yZSA6PSBzZGtDdHguS1ZTdG9yZShrLnN0b3JlS2V5KQoJYmFsYW5jZXNTdG9yZSA6PSBwcmVmaXguTmV3U3RvcmUoc3RvcmUsIHR5cGVzLkJhbGFuY2VzUHJlZml4KQoJYWNjb3VudFN0b3JlIDo9IHByZWZpeC5OZXdTdG9yZShiYWxhbmNlc1N0b3JlLCBhZGRyLkJ5dGVzKCkpCgoJcGFnZVJlcywgZXJyIDo9IHF1ZXJ5LlBhZ2luYXRlKGFjY291bnRTdG9yZSwgcmVxLlBhZ2luYXRpb24sIGZ1bmMoa2V5IFtdYnl0ZSwgdmFsdWUgW11ieXRlKSBlcnJvciB7CgkJdmFyIHJlc3VsdCBzZGsuQ29pbgoJCWVyciA6PSBrLmNkYy5Vbm1hcnNoYWxCaW5hcnlCYXJlKHZhbHVlLCAmYW1wO3Jlc3VsdCkKCQlpZiBlcnIgIT0gbmlsIHsKCQkJcmV0dXJuIGVycgoJCX0KCQliYWxhbmNlcyA9IGFwcGVuZChiYWxhbmNlcywgcmVzdWx0KQoJCXJldHVybiBuaWwKCX0pCgoJaWYgZXJyICE9IG5pbCB7CgkJcmV0dXJuICZhbXA7dHlwZXMuUXVlcnlBbGxCYWxhbmNlc1Jlc3BvbnNle30sIGVycgoJfQoKCXJldHVybiAmYW1wO3R5cGVzLlF1ZXJ5QWxsQmFsYW5jZXNSZXNwb25zZXtCYWxhbmNlczogYmFsYW5jZXMsIFBhZ2luYXRpb246IHBhZ2VSZXN9LCBuaWwKfQoKLy8gVG90YWxTdXBwbHkgaW1wbGVtZW50cyB0aGUgUXVlcnkvVG90YWxTdXBwbHkgZ1JQQyBtZXRob2QKZnVuYyAoayBCYXNlS2VlcGVyKSBUb3RhbFN1cHBseShjdHggY29udGV4dC5Db250ZXh0LCBfICp0eXBlcy5RdWVyeVRvdGFsU3VwcGx5UmVxdWVzdCkgKCp0eXBlcy5RdWVyeVRvdGFsU3VwcGx5UmVzcG9uc2UsIGVycm9yKSB7CglzZGtDdHggOj0gc2RrLlVud3JhcFNES0NvbnRleHQoY3R4KQoJdG90YWxTdXBwbHkgOj0gay5HZXRTdXBwbHkoc2RrQ3R4KS5HZXRUb3RhbCgpCgoJcmV0dXJuICZhbXA7dHlwZXMuUXVlcnlUb3RhbFN1cHBseVJlc3BvbnNle1N1cHBseTogdG90YWxTdXBwbHl9LCBuaWwKfQoKLy8gU3VwcGx5T2YgaW1wbGVtZW50cyB0aGUgUXVlcnkvU3VwcGx5T2YgZ1JQQyBtZXRob2QKZnVuYyAoayBCYXNlS2VlcGVyKSBTdXBwbHlPZihjIGNvbnRleHQuQ29udGV4dCwgcmVxICp0eXBlcy5RdWVyeVN1cHBseU9mUmVxdWVzdCkgKCp0eXBlcy5RdWVyeVN1cHBseU9mUmVzcG9uc2UsIGVycm9yKSB7CglpZiByZXEgPT0gbmlsIHsKCQlyZXR1cm4gbmlsLCBzdGF0dXMuRXJyb3IoY29kZXMuSW52YWxpZEFyZ3VtZW50LCAmcXVvdDtlbXB0eSByZXF1ZXN0JnF1b3Q7KQoJfQoKCWlmIHJlcS5EZW5vbSA9PSAmcXVvdDsmcXVvdDsgewoJCXJldHVybiBuaWwsIHN0YXR1cy5FcnJvcihjb2Rlcy5JbnZhbGlkQXJndW1lbnQsICZxdW90O2ludmFsaWQgZGVub20mcXVvdDspCgl9CgoJY3R4IDo9IHNkay5VbndyYXBTREtDb250ZXh0KGMpCglzdXBwbHkgOj0gay5HZXRTdXBwbHkoY3R4KS5HZXRUb3RhbCgpLkFtb3VudE9mKHJlcS5EZW5vbSkKCglyZXR1cm4gJmFtcDt0eXBlcy5RdWVyeVN1cHBseU9mUmVzcG9uc2V7QW1vdW50OiBzZGsuTmV3Q29pbihyZXEuRGVub20sIHN1cHBseSl9LCBuaWwKfQoKLy8gUGFyYW1zIGltcGxlbWVudHMgdGhlIGdSUEMgc2VydmljZSBoYW5kbGVyIGZvciBxdWVyeWluZyB4L2JhbmsgcGFyYW1ldGVycy4KZnVuYyAoayBCYXNlS2VlcGVyKSBQYXJhbXMoY3R4IGNvbnRleHQuQ29udGV4dCwgcmVxICp0eXBlcy5RdWVyeVBhcmFtc1JlcXVlc3QpICgqdHlwZXMuUXVlcnlQYXJhbXNSZXNwb25zZSwgZXJyb3IpIHsKCWlmIHJlcSA9PSBuaWwgewoJCXJldHVybiBuaWwsIHN0YXR1cy5FcnJvcmYoY29kZXMuSW52YWxpZEFyZ3VtZW50LCAmcXVvdDtlbXB0eSByZXF1ZXN0JnF1b3Q7KQoJfQoKCXNka0N0eCA6PSBzZGsuVW53cmFwU0RLQ29udGV4dChjdHgpCglwYXJhbXMgOj0gay5HZXRQYXJhbXMoc2RrQ3R4KQoKCXJldHVybiAmYW1wO3R5cGVzLlF1ZXJ5UGFyYW1zUmVzcG9uc2V7UGFyYW1zOiBwYXJhbXN9LCBuaWwKfQo="}})],1),e._v(" "),t("h3",{attrs:{id:"legacy-queriers"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#legacy-queriers"}},[e._v("#")]),e._v(" Legacy Queriers")]),e._v(" "),t("p",[e._v("Module legacy "),t("code",[e._v("querier")]),e._v("s are typically implemented in a "),t("code",[e._v("./keeper/querier.go")]),e._v(" file inside the module's folder. The "),t("RouterLink",{attrs:{to:"/building-modules/module-manager.html"}},[e._v("module manager")]),e._v(" is used to add the module's "),t("code",[e._v("querier")]),e._v("s to the "),t("RouterLink",{attrs:{to:"/core/baseapp.html#query-routing"}},[e._v("application's "),t("code",[e._v("queryRouter")])]),e._v(" via the "),t("code",[e._v("NewQuerier()")]),e._v(" method. Typically, the manager's "),t("code",[e._v("NewQuerier()")]),e._v(" method simply calls a "),t("code",[e._v("NewQuerier()")]),e._v(" method defined in "),t("code",[e._v("keeper/querier.go")]),e._v(", which looks like the following:")],1),e._v(" "),t("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyBOZXdRdWVyaWVyKGtlZXBlciBLZWVwZXIpIHNkay5RdWVyaWVyIHsKCXJldHVybiBmdW5jKGN0eCBzZGsuQ29udGV4dCwgcGF0aCBbXXN0cmluZywgcmVxIGFiY2kuUmVxdWVzdFF1ZXJ5KSAoW11ieXRlLCBlcnJvcikgewoJCXN3aXRjaCBwYXRoWzBdIHsKCQljYXNlIFF1ZXJ5VHlwZTE6CgkJCXJldHVybiBxdWVyeVR5cGUxKGN0eCwgcGF0aFsxOl0sIHJlcSwga2VlcGVyKQoKCQljYXNlIFF1ZXJ5VHlwZTI6CgkJCXJldHVybiBxdWVyeVR5cGUyKGN0eCwgcGF0aFsxOl0sIHJlcSwga2VlcGVyKQoKCQlkZWZhdWx0OgoJCQlyZXR1cm4gbmlsLCBzZGtlcnJvcnMuV3JhcGYoc2RrZXJyb3JzLkVyclVua25vd25SZXF1ZXN0LCAmcXVvdDt1bmtub3duICVzIHF1ZXJ5IGVuZHBvaW50OiAlcyZxdW90OywgdHlwZXMuTW9kdWxlTmFtZSwgcGF0aFswXSkKCQl9Cgl9Cn0K"}}),e._v(" "),t("p",[e._v("This simple switch returns a "),t("code",[e._v("querier")]),e._v(" function specific to the type of the received "),t("code",[e._v("query")]),e._v(". At this point of the "),t("RouterLink",{attrs:{to:"/interfaces/query-lifecycle.html"}},[e._v("query lifecycle")]),e._v(", the first element of the "),t("code",[e._v("path")]),e._v(" ("),t("code",[e._v("path[0]")]),e._v(") contains the type of the query. The following elements are either empty or contain arguments needed to process the query.")],1),e._v(" "),t("p",[e._v("The "),t("code",[e._v("querier")]),e._v(" functions themselves are pretty straighforward. They generally fetch a value or values from the state using the "),t("RouterLink",{attrs:{to:"/building-modules/keeper.html"}},[t("code",[e._v("keeper")])]),e._v(". Then, they marshall the value(s) using the "),t("RouterLink",{attrs:{to:"/core/encoding.html"}},[t("code",[e._v("codec")])]),e._v(" and return the "),t("code",[e._v("[]byte")]),e._v(" obtained as result.")],1),e._v(" "),t("p",[e._v("For a deeper look at "),t("code",[e._v("querier")]),e._v("s, see this "),t("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/blob/7f59723d889b69ca19966167f0b3a7fec7a39e53/x/gov/keeper/querier.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("example implementation of a "),t("code",[e._v("querier")]),e._v(" function"),t("OutboundLink")],1),e._v(" from the bank module.")]),e._v(" "),t("h2",{attrs:{hide:"",id:"next"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#next"}},[e._v("#")]),e._v(" Next")]),e._v(" "),t("p",{attrs:{hide:""}},[e._v("Learn about "),t("RouterLink",{attrs:{to:"/building-modules/beginblock-endblock.html"}},[t("code",[e._v("BeginBlocker")]),e._v(" and "),t("code",[e._v("EndBlocker")])])],1)],1)}),[],!1,null,null,null);c.default=o.exports}}]);