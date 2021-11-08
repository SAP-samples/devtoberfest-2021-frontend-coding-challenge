//@ui5-bundle com/devtoberfest/devtoberfest2021FrontendCodingChallenge/Component-preload.js
sap.ui.require.preload({
	"com/devtoberfest/devtoberfest2021FrontendCodingChallenge/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/devtoberfest/devtoberfest2021FrontendCodingChallenge/model/models"],function(e,t,o){"use strict";return e.extend("com.devtoberfest.devtoberfest2021FrontendCodingChallenge.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(o.createDeviceModel(),"device")}})});
},
	"com/devtoberfest/devtoberfest2021FrontendCodingChallenge/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent","com/devtoberfest/devtoberfest2021FrontendCodingChallenge/model/formatter"],function(e,t,o,n){"use strict";return e.extend("com.devtoberfest.devtoberfest2021FrontendCodingChallenge.controller.BaseController",{formatter:n,getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},navTo:function(e,t,o){this.getRouter().navTo(e,t,o)},getRouter:function(){return o.getRouterFor(this)},onNavBack:function(){var e=t.getInstance().getPreviousHash();if(e!==undefined){window.history.back()}else{this.getRouter().navTo("appHome",{},true)}}})});
},
	"com/devtoberfest/devtoberfest2021FrontendCodingChallenge/controller/MainView.controller.js":function(){sap.ui.define(["com/devtoberfest/devtoberfest2021FrontendCodingChallenge/controller/BaseController","sap/ui/model/json/JSONModel","com/devtoberfest/devtoberfest2021FrontendCodingChallenge/model/formatter"],function(e,t,o){"use strict";return e.extend("com.devtoberfest.devtoberfest2021FrontendCodingChallenge.controller.MainView",{formatter:o,onInit:function(){const e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;if(e){sap.ui.getCore().applyTheme("sap_fiori_3_dark")}const o=new t({search:"",lightTheme:!e});this.getView().setModel(o,"settings")},liveSearch:function(e){const t=e.getParameter("newValue");const o=this.getView().byId("all-list");const r=o.getBinding("items");const n=new sap.ui.model.Filter({path:"name",operator:sap.ui.model.FilterOperator.Contains,value1:t});const a=new sap.ui.model.Filter({path:"description",operator:sap.ui.model.FilterOperator.Contains,value1:t});const i=new sap.ui.model.Filter({path:"category",operator:sap.ui.model.FilterOperator.Contains,value1:t});r.filter(new sap.ui.model.Filter({filters:[n,a,i],and:false}))},onToggleTheme:function(e){const t=e.getParameter("state");sap.ui.getCore().applyTheme(t?"sap_fiori_3":"sap_fiori_3_dark")}})});
},
	"com/devtoberfest/devtoberfest2021FrontendCodingChallenge/i18n/i18n.properties":'title=Devtoberfest 2021 - Frontend Coding Challenge\nappDescription=App Description\ndark=Dark\nlight=Light\nforkMe=Fork me on GitHub\nError=Error\nInformation=Information\nSuccess=Success\nWarning=Warning\nperformanceNote=Please be aware that this application deliberately ignores best practices and therefore has a mediocre loading performance. Visit the GitHub page to learn more about this\nperformanceNoteLink=Devtoberfest 2021 Coding Challenge.\n',
	"com/devtoberfest/devtoberfest2021FrontendCodingChallenge/i18n/i18n_de.properties":'title=Devtoberfest 2021 - Frontend Coding Challenge\nappDescription=App Description\ndark=Dark\nlight=Light\nforkMe=Fork me on GitHub\nError=Error\nInformation=Information\nSuccess=Success\nWarning=Warning\nperformanceNote=Please be aware that this application deliberately ignores best practices and therefore has a mediocre loading performance. Visit the GitHub page to learn more about this\nperformanceNoteLink=Devtoberfest 2021 Coding Challenge.\n',
	"com/devtoberfest/devtoberfest2021FrontendCodingChallenge/i18n/i18n_de_DE.properties":'title=Devtoberfest 2021 - Frontend Coding Challenge\nappDescription=App Description\ndark=Dark\nlight=Light\nforkMe=Fork me on GitHub\nError=Error\nInformation=Information\nSuccess=Success\nWarning=Warning\nperformanceNote=Please be aware that this application deliberately ignores best practices and therefore has a mediocre loading performance. Visit the GitHub page to learn more about this\nperformanceNoteLink=Devtoberfest 2021 Coding Challenge.\nsearch=Search for the name or description\nBTP=SAP BTP Services\n',
	"com/devtoberfest/devtoberfest2021FrontendCodingChallenge/i18n/i18n_en.properties":'title=Devtoberfest 2021 - Frontend Coding Challenge\nappDescription=App Description\ndark=Dark\nlight=Light\nforkMe=Fork me on GitHub\nError=Error\nInformation=Information\nSuccess=Success\nWarning=Warning\nperformanceNote=Please be aware that this application deliberately ignores best practices and therefore has a mediocre loading performance. Visit the GitHub page to learn more about this\nperformanceNoteLink=Devtoberfest 2021 Coding Challenge.\n',
	"com/devtoberfest/devtoberfest2021FrontendCodingChallenge/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"com.devtoberfest.devtoberfest2021FrontendCodingChallenge","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{title}}","description":"{{appDescription}}","dataSources":{"dataSource":{"uri":"model/sampleData.json","type":"JSON"}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"rootView":{"viewName":"com.devtoberfest.devtoberfest2021FrontendCodingChallenge.view.MainView","type":"XML","id":"idAppControl","async":true},"dependencies":{"minUI5Version":"1.95.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.devtoberfest.devtoberfest2021FrontendCodingChallenge.i18n.i18n","supportedLocals":["en","de"],"fallbackLocale":"en"}},"sample":{"type":"sap.ui.model.json.JSONModel","dataSource":"dataSource"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"com.devtoberfest.devtoberfest2021FrontendCodingChallenge.view","controlId":"idAppControl","controlAggregation":"pages","async":true},"routes":[{"name":"RouteMainView","pattern":"RouteMainView","target":["TargetMainView"]}],"targets":{"TargetMainView":{"viewType":"XML","viewLevel":1,"viewId":"idAppControl","viewName":"MainView"}}}}}',
	"com/devtoberfest/devtoberfest2021FrontendCodingChallenge/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{translateState:function(e){if(!e){return""}const t=this.getView().getModel("i18n").getResourceBundle();return t.getText(e)}}});
},
	"com/devtoberfest/devtoberfest2021FrontendCodingChallenge/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/devtoberfest/devtoberfest2021FrontendCodingChallenge/view/MainView.view.xml":'<mvc:View\n\tcontrollerName="com.devtoberfest.devtoberfest2021FrontendCodingChallenge.controller.MainView"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:f="sap.f"\n\txmlns:tnt="sap.tnt"\n\txmlns:core="sap.ui.core"\n\txmlns:mvc="sap.ui.core.mvc"\n><tnt:ToolPage id="toolPage"><tnt:header><tnt:ToolHeader><Image src="resources/img/favicon.ico"><layoutData><OverflowToolbarLayoutData priority="Disappear"/></layoutData></Image><Text\n\t\t\t\t\ttext="{i18n>title}"\n\t\t\t\t\twrapping="false"\n\t\t\t\t><layoutData><OverflowToolbarLayoutData priority="NeverOverflow"/></layoutData></Text><ToolbarSpacer/><Image\n\t\t\t\t\tsrc="resources/img/github.png"\n\t\t\t\t\theight="50%"\n\t\t\t\t\tpress="goToRepo"\n\t\t\t\t/><Link\n\t\t\t\t\ttext="{i18n>forkMe}"\n\t\t\t\t\ttarget="_blank"\n\t\t\t\t\thref="https://github.com/SAP-samples/devtoberfest-2021-frontend-coding-challenge"\n\t\t\t\t\tvisible="{= ${device>/orientation/landscape} || !${device>/browser/mobile} }"\n\t\t\t\t\tclass="sapUiMediumMarginEnd"\n\t\t\t\t/><core:Icon\n\t\t\t\t\tid="barDarkIcon"\n\t\t\t\t\tvisible="{= ${device>/orientation/landscape} || !${device>/browser/mobile} }"\n\t\t\t\t\tsrc="sap-icon://energy-saving-lightbulb"\n\t\t\t\t\tcolor="{= !${settings>/lightTheme} ? \'#f9d001\' : \'\'}"\n\t\t\t\t\ttooltip="{i18n>dark}"\n\t\t\t\t/><Switch\n\t\t\t\t\tid="barThemeSwitch"\n\t\t\t\t\tvisible="{= ${device>/orientation/landscape} || !${device>/browser/mobile} }"\n\t\t\t\t\tstate="{settings>/lightTheme}"\n\t\t\t\t\tcustomTextOff="{i18n>dark}"\n\t\t\t\t\tcustomTextOn="{i18n>light}"\n\t\t\t\t\tchange="onToggleTheme"\n\t\t\t\t\ttooltip="{= ${settings>/lightTheme} ? ${i18n>dark} : ${i18n>light} }"\n\t\t\t\t/><core:Icon\n\t\t\t\t\tid="barLightIcon"\n\t\t\t\t\tvisible="{= ${device>/orientation/landscape} || !${device>/browser/mobile} }"\n\t\t\t\t\tsrc="sap-icon://circle-task-2"\n\t\t\t\t\tcolor="{= ${settings>/lightTheme} ? \'#f9d001\' : \'\'}"\n\t\t\t\t\ttooltip="{i18n>light}"\n\t\t\t\t\tclass="sapUiMediumMarginEnd"\n\t\t\t\t/></tnt:ToolHeader></tnt:header><tnt:mainContents><ScrollContainer\n\t\t\t\tid="all-page"\n\t\t\t\thorizontal="false"\n\t\t\t\tvertical="true"\n\t\t\t\theight="100%"\n\t\t\t><MessageStrip\n\t\t\t\t\ttext="{i18n>performanceNote}"\n\t\t\t\t\ttype="Warning"\n\t\t\t\t\tshowIcon="true"\n\t\t\t\t\tshowCloseButton="true"\n\t\t\t\t\tclass="sapUiSmallMarginTopBottom"\n\t\t\t\t><link><Link\n\t\t\t\t\t\t\ttext="{i18n>performanceNoteLink}"\n\t\t\t\t\t\t\ttarget="_blank"\n\t\t\t\t\t\t\thref="https://github.com/SAP-samples/devtoberfest-2021-frontend-coding-challenge"\n\t\t\t\t\t\t/></link></MessageStrip><List\n\t\t\t\t\tid="all-list"\n\t\t\t\t\titems="{sample>/}"\n\t\t\t\t><headerToolbar><OverflowToolbar id="all-list-bar"><Title\n\t\t\t\t\t\t\t\tid="all-bar-info"\n\t\t\t\t\t\t\t\ttext="{i18n>BTP}"\n\t\t\t\t\t\t\t\tlevel="H4"\n\t\t\t\t\t\t\t/><ToolbarSpacer id="all-bar-spacer"/><SearchField\n\t\t\t\t\t\t\t\tid="all-bar-search"\n\t\t\t\t\t\t\t\twidth="60%"\n\t\t\t\t\t\t\t\tplaceholder="{i18n>search}"\n\t\t\t\t\t\t\t\tliveChange=".liveSearch"\n\t\t\t\t\t\t\t/></OverflowToolbar></headerToolbar><StandardListItem\n\t\t\t\t\t\ttitle="{sample>name}"\n\t\t\t\t\t\tdescription="{sample>description}"\n\t\t\t\t\t\tinfoState="Information"\n\t\t\t\t\t\ticon="{sample>icon}"\n\t\t\t\t\t\ticonDensityAware="false"\n\t\t\t\t\t\tinfo="{sample>category}"\n\t\t\t\t\t/></List></ScrollContainer></tnt:mainContents></tnt:ToolPage></mvc:View>'
});
