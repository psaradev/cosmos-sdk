(window.webpackJsonp=window.webpackJsonp||[]).push([[273],{692:function(C,g,I){"use strict";I.r(g);var A=I(1),t=Object(A.a)({},(function(){var C=this,g=C.$createElement,I=C._self._c||g;return I("ContentSlotsDistributor",{attrs:{"slot-key":C.$parent.slotKey}},[I("h1",{attrs:{id:"обзор-дизаина-cosmos-sdk"}},[I("a",{staticClass:"header-anchor",attrs:{href:"#обзор-дизаина-cosmos-sdk"}},[C._v("#")]),C._v(" Обзор дизайна Cosmos SDK")]),C._v(" "),I("p",[C._v("Cosmos SDK - это фреймворк, который облегчает разработку безопасных конечных автоматов поверх движка консенсуса Tendermint. По своей сути, SDK представляет собой реализацию ABCI на языке программирования Go. Он поставляется с хранилищем данных "),I("code",[C._v("multistore")]),C._v(" и маршрутизатором для обработки транзакций "),I("code",[C._v("router")]),C._v(".")]),C._v(" "),I("p",[C._v("Далее представлен алгоритм обработки транзакций в приложении на Cosmos SDK при передаче транзакций из Tendermint через "),I("code",[C._v("DeliverTx")]),C._v(":")]),C._v(" "),I("ol",[I("li",[I("p",[C._v("Декодируйте "),I("code",[C._v("transactions")]),C._v(", полученные от механизма консенсуса Tendermint (помните, что Tendermint работает только с "),I("code",[C._v("[]bytes")]),C._v(").")])]),C._v(" "),I("li",[I("p",[C._v("Извлеките "),I("code",[C._v("messages")]),C._v(" из "),I("code",[C._v("transactions")]),C._v(" и выполните базовые проверки.")])]),C._v(" "),I("li",[I("p",[C._v("Направьте каждое сообщение в соответствующий модуль для его обработки.")])]),C._v(" "),I("li",[I("p",[C._v("Сохраните изменения состояния.")])])]),C._v(" "),I("p",[C._v("Приложение также позволяет генерировать транзакции, кодировать их и передавать их базовому движку Tendermint для их трансляции.")]),C._v(" "),I("h2",{attrs:{id:"baseapp"}},[I("a",{staticClass:"header-anchor",attrs:{href:"#baseapp"}},[C._v("#")]),C._v(" "),I("code",[C._v("baseapp")])]),C._v(" "),I("p",[I("code",[C._v("baseApp")]),C._v(" — это базовая реализация ABCI в Cosmos SDK. Она поставляется с модулем "),I("code",[C._v("router")]),C._v(" для маршрутизации транзакций в соответствующий модуль. Файл "),I("code",[C._v("app.go")]),C._v(" вашего приложения будет определять ваш тип "),I("code",[C._v("app")]),C._v(", который будет встраивать "),I("code",[C._v("baseapp")]),C._v(". Таким образом, ваш пользовательский тип "),I("code",[C._v("app")]),C._v(" будет автоматически наследовать все ABCI-методы "),I("code",[C._v("baseapp")]),C._v(". Пример этого в [туториале по созданию приложения с помощью SDK] (https://github.com/cosmos/sdk-application-tutorial/blob/master/app.go#L27).")]),C._v(" "),I("p",[C._v("Цель "),I("code",[C._v("baseapp")]),C._v(": обеспечить безопасный интерфейс между хранилищем и расширяемым конечным автоматом, в то же время определяя как можно меньше о конечном компьютере (соответствуя ABCI).")]),C._v(" "),I("p",[C._v("УЗнать больше о "),I("code",[C._v("baseapp")]),C._v(" можно "),I("RouterLink",{attrs:{to:"/ru/concepts/baseapp.html"}},[C._v("здесь")]),C._v(".")],1),C._v(" "),I("h2",{attrs:{id:"multistore"}},[I("a",{staticClass:"header-anchor",attrs:{href:"#multistore"}},[C._v("#")]),C._v(" "),I("code",[C._v("multistore")])]),C._v(" "),I("p",[C._v("В составе Cosmos SDK есть хранилище для сохранения состояния. Это хранилище позволяет разработчикам создавать любое количество "),I("a",{attrs:{href:"https://github.com/blocklayerhq/chainkit",target:"_blank",rel:"noopener noreferrer"}},[I("code",[C._v("KVStores")]),I("OutboundLink")],1),C._v(". Эти "),I("code",[C._v("KVStores")]),C._v(" принимают только "),I("code",[C._v("[] byte")]),C._v(" в качестве значения, и поэтому любая пользовательская структура должна быть собрана с помощью "),I("a",{attrs:{href:"https://github.com/tendermint/go-amino",target:"_blank",rel:"noopener noreferrer"}},[C._v("go-amin"),I("OutboundLink")],1),C._v(" перед сохранением.")]),C._v(" "),I("p",[C._v("Абстракция в виде этого хранилища используется для разделения состояния на отдельные части, каждый из которых управляется своим собственным модулем. Получить больше информации о "),I("code",[C._v("multistore")]),C._v(" можно "),I("RouterLink",{attrs:{to:"/ru/concepts/store.html"}},[C._v("здесь")]),C._v(".")],1),C._v(" "),I("h2",{attrs:{id:"модули"}},[I("a",{staticClass:"header-anchor",attrs:{href:"#модули"}},[C._v("#")]),C._v(" Модули")]),C._v(" "),I("p",[C._v("Основное преимуществе Cosmos SDK заключается в его модульности. Приложения SDK создаются путем объединения набора совместимых модулей. Каждый модуль определяет подмножество состояния и содержит свой собственный обработчик сообщений/транзакций, в то время как SDK отвечает за маршрутизацию каждого сообщения в соответствующий модуль.")]),C._v(" "),I("p",[C._v("Вот упрощенное представление о том, как транзакция обрабатывается приложением каждого полной ноды, когда она получена в валидном блоке:")]),C._v(" "),I("tm-code-block",{staticClass:"codeblock",attrs:{language:"",base64:"ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgINCi0YDQsNC90LfQsNC60YbQuNGPINGA0LXRgtGA0LDQvdGB0LvQuNGA0YPQtdGC0YHRjyDQuNC3INC00LLQuNC20LrQsCBUZW5kZXJtaW50CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAg0L/QvtC70L3QvtC5INC90L7QtNGLINCyINC/0YDQuNC70L7QttC10L3QuNC1INC90L7QtNGLINGH0LXRgNC10LcgRGVsaXZlclR4CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwKICAgICAgICAgICAgICAgICstLS0tLS0tLS0tLS0tLS0tLS0tLS12LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rCiAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICDQn9GA0LjQu9C+0LbQtdC90LjQtSAgICAgICAgICAgICAgICAgICAgIHwKICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8CiAgICAgICAgICAgICAgICB8ICAgICDQmNGB0L/QvtC70YzQt9GD0Y8g0LzQtdGC0L7QtNGLIGJhc2VhcHAsINC00LXQutC+0LTQuNGA0YPQuSBUeCwgICAgfAogICAgICAgICAgICAgICAgfCAgICAg0LjQt9Cy0LvQtdC60Lgg0YHQvtC+0LHRidC10L3QuNC1INC4INC80LDRgNGI0YDRg9GC0LjQt9C40YDRg9C5INC10LPQviAgICAgIHwKICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8CiAgICAgICAgICAgICAgICArLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICDQodC+0L7QsdGJ0LXQvdC40LUg0L7RgtC/0YDQsNCy0LvQtdC90L4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAg0LIg0L3Rg9C20L3Ri9C5INC80L7QtNGD0LvRjAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICDQtNC70Y8g0L7QsdGA0LDQsdC+0YLQutC4CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfAorLS0tLS0tLS0tLS0tLS0tLSsgICstLS0tLS0tLS0tLS0tLS0rICArLS0tLS0tLS0tLS0tLS0tLSsgICstLS0tLS12LS0tLS0tLS0tLSsKfCAgICAgICAgICAgICAgICB8ICB8ICAgICAgICAgICAgICAgfCAgfCAgICAgICAgICAgICAgICB8ICB8ICAgICAgICAgICAgICAgICB8CnwgIEFVVEggTU9EVUxFICAgfCAgfCAgQkFOSyBNT0RVTEUgIHwgIHwgU1RBS0lORyBNT0RVTEUgfCAgfCAgIEdPViBNT0RVTEUgICAgfAp8ICAgICAgICAgICAgICAgIHwgIHwgICAgICAgICAgICAgICB8ICB8ICAgICAgICAgICAgICAgIHwgIHwgICAgICAgICAgICAgICAgIHwKfCAgICAgICAgICAgICAgICB8ICB8ICAgICAgICAgICAgICAgfCAgfCAgICAgICAgICAgICAgICB8ICB8INCe0LHRgNCw0LHQvtGC0LDQuSDRgdC+0L7QsS4sfAp8ICAgICAgICAgICAgICAgIHwgIHwgICAgICAgICAgICAgICB8ICB8ICAgICAgICAgICAgICAgIHwgIHwg0L7QsdC90L7QstC4INGB0L7RgdGC0L7Rj9C90LjQtXwKfCAgICAgICAgICAgICAgICB8ICB8ICAgICAgICAgICAgICAgfCAgfCAgICAgICAgICAgICAgICB8ICB8ICAgICAgICAgICAgICAgICB8CistLS0tLS0tLS0tLS0tLS0tKyAgKy0tLS0tLS0tLS0tLS0tLSsgICstLS0tLS0tLS0tLS0tLS0tKyAgKy0tLS0tLSstLS0tLS0tLS0tKwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8INCS0LXRgNC90Lgg0YDQtdC30YPQu9GM0YLQsNGCINCyIFRlbmRlcm1pbnQKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAoMD1PaywgMT1FcnIpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYK"}}),C._v(" "),I("p",[C._v("Каждый модуль можно рассматривать как самостоятельный конечный автомат. Разработчикам необходимо определить подмножество состояния, обрабатываемого модулем, а также настраиваемые типы сообщений, которые изменяют состояние (следует отметить, что "),I("code",[C._v("messages")]),C._v(" извлекаются из "),I("code",[C._v("transactions")]),C._v(" с использованием "),I("code",[C._v("baseapp")]),C._v("). В общем, каждый модуль создает свой собственный "),I("code",[C._v("KVStore")]),C._v(" в "),I("code",[C._v("multistore")]),C._v(", чтобы сохранить подмножество состояния, которое он определяет. Большинству разработчиков потребуется доступ к другим сторонним модулям при создании своих собственных модулей. Учитывая, что Cosmos-SDK является открытой платформой, некоторые модули могут быть вредоносными, что означает необходимость создания правил безопасности для определения межмодульных взаимодействий. Эти правила основаны на "),I("RouterLink",{attrs:{to:"/ru/core/ocap.html"}},[C._v("object-capabilities")]),C._v(". На практике это означает, что вместо того, чтобы каждый модуль вел список контроля доступа для других модулей, каждый модуль реализует специальные объекты, называемые хранителями, которые могут быть переданы другим модулям для предоставления предварительно определенного набора возможностей.")],1),C._v(" "),I("p",[C._v("Модули SDK определены в директории "),I("code",[C._v("x/")]),C._v(" SDK. Основные модули в составе Cosmos SDK:")]),C._v(" "),I("ul",[I("li",[I("p",[I("code",[C._v("x/auth")]),C._v(": используется для управления учетными записями и подписями.")])]),C._v(" "),I("li",[I("p",[I("code",[C._v("x/bank")]),C._v(": используется для создания и передачи токенов.")])]),C._v(" "),I("li",[I("p",[I("code",[C._v("x/staking")]),C._v(" и "),I("code",[C._v("x/slashing")]),C._v(": используется для создания блокчейнов Proof-of-Stake.")])])]),C._v(" "),I("p",[C._v("В дополнение к уже существующим модулям в "),I("code",[C._v("x/")]),C._v(", которые каждый может использовать в своем приложении, SDK позволяет "),I("a",{attrs:{href:"https://cosmos.network/docs/tutorial/keeper.html",target:"_blank",rel:"noopener noreferrer"}},[C._v("создавать собственные модули"),I("OutboundLink")],1),C._v(".")]),C._v(" "),I("h3",{attrs:{id:"далее-узнаите-больше-о-модели-безопасности-cosmos-sdk-ocap"}},[I("a",{staticClass:"header-anchor",attrs:{href:"#далее-узнаите-больше-о-модели-безопасности-cosmos-sdk-ocap"}},[C._v("#")]),C._v(" Далее, узнайте больше о модели безопасности Cosmos SDK, "),I("RouterLink",{attrs:{to:"/ru/intro/ocap.html"}},[C._v("ocap")])],1)],1)}),[],!1,null,null,null);g.default=t.exports}}]);