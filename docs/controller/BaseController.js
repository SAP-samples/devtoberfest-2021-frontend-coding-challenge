sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent","com/devtoberfest/devtoberfest2021FrontendCodingChallenge/model/formatter"],function(e,t,o,n){"use strict";return e.extend("com.devtoberfest.devtoberfest2021FrontendCodingChallenge.controller.BaseController",{formatter:n,getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},navTo:function(e,t,o){this.getRouter().navTo(e,t,o)},getRouter:function(){return o.getRouterFor(this)},onNavBack:function(){var e=t.getInstance().getPreviousHash();if(e!==undefined){window.history.back()}else{this.getRouter().navTo("appHome",{},true)}}})});