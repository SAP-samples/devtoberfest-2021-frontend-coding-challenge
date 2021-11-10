/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/Toolbar","sap/m/Button","sap/m/ResponsivePopover","sap/m/ToolbarSpacer","sap/ui/dom/containsOrEquals"],function(e,t,o,i,r,n){"use strict";var a=e.extend("sap.m.ColumnHeaderPopover",{metadata:{library:"sap.m",properties:{},aggregations:{items:{type:"sap.m.ColumnPopoverItem",multiple:true,singularName:"item",bindable:true},_popover:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}},defaultAggregation:"items",associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}},renderer:null});a.prototype.init=function(){this._bPopoverCreated=false;this._oShownCustomContent=null;var e=this;this._minWidthDelegate=function(){this.$().css("min-width",e.minWidth)}};a.prototype.exit=function(){if(this._oToolbar){this._oToolbar.destroy();this._oToolbar=null}this._closeBtn=null;this._spacer=null;this._aButtons=null;this._oShownCustomContent=null};a.prototype._createPopover=function(){var e=this;this._oShownCustomContent=null;var n=sap.ui.getCore().getLibraryResourceBundle("sap.m"),a=n.getText("COLUMNHEADERPOPOVER_CLOSE_BUTTON");var s=new i(this.getId()+"-popover",{showArrow:false,showHeader:false,placement:"Bottom",verticalScrolling:true,horizontalScrolling:false,ariaLabelledBy:this.getAriaLabelledBy(),beforeClose:function(t){if(e._oShownCustomContent){e._oShownCustomContent.setVisible(false);e._oShownCustomContent=null}e._cleanSelection()}});s._oControl.addDelegate({onAfterRendering:this._minWidthDelegate},s._oControl);this.setAggregation("_popover",s);var l=new t(this.getId()+"-tb");this._spacer=new r;this._closeBtn=new o(l.getId()+"-closeBtn",{type:"Transparent",icon:"sap-icon://decline",tooltip:a,press:[s.close,s]});l.addContent(this._spacer);l.addContent(this._closeBtn);s.addContent(l);this._oToolbar=l};a.prototype._cleanSelection=function(e){var t=this._aButtons;if(t){t.forEach(function(t){if((!e||t!==e)&&t.getPressed&&t.getPressed()){t.setPressed(false)}})}};a.prototype.openBy=function(e){if(!this._bPopoverCreated){this._createPopover();this._bPopoverCreated=true}else{this._oToolbar.removeContent(this._spacer);this._oToolbar.removeContent(this._closeBtn);this._oToolbar.destroyContent()}var t=this.getAggregation("_popover");var o=[];var i=this.getItems();var r=5;for(var n=0;n<i.length&&o.length<r;n++){var a=i[n];if(a.getVisible()){var s=a._createButton(this._oToolbar.getId()+"-btn_"+n,this);s._sContentId=a._sContentId;o.push(s);this._oToolbar.insertContent(s,n)}}if(o.length===0){return}this._aButtons=o;this._oToolbar.addContent(this._spacer);this._oToolbar.addContent(this._closeBtn);if(!this._bAppendedToUIArea&&!this.getParent()){var l=sap.ui.getCore().getStaticAreaRef();l=sap.ui.getCore().getUIArea(l);l.addContent(this,true);this._bAppendedToUIArea=true}var p=e.getFocusDomRef();if(p){t.setOffsetY(-p.clientHeight);this.minWidth=p.clientWidth}t.openBy(e)};a.prototype.invalidate=function(t){var o=this.getAggregation("_popover");if(t===o){e.prototype.invalidate.apply(this,arguments)}return this};a.prototype.addAriaLabelledBy=function(e){var t=this.getAggregation("_popover");if(t){t.addAriaLabelledBy(e)}return this.addAssociation("ariaLabelledBy",e)};a.prototype.removeAriaLabelledBy=function(e){var t=this.getAggregation("_popover");if(t){t.removeAriaLabelledBy(e)}return this.removeAssociation("ariaLabelledBy",e)};a.prototype.removeAllAssociation=function(t,o){if(t==="ariaLabelledBy"){var i=this.getAggregation("_popover");if(i){i.removeAllAssociation(t,o)}}return e.prototype.removeAllAssociation.apply(this,arguments)};return a});