/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","sap/ui/events/KeyCodes","sap/ui/model/BindingMode","sap/ui/Device","sap/ui/core/library","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/Icon","sap/ui/core/InvisibleText","sap/ui/core/theming/Parameters","./library","./Button","./CheckBox","./RadioButton","./ListItemBaseRenderer","sap/base/strings/capitalize","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Selectors"],function(t,e,i,o,s,n,r,a,l,c,h,u,p,d,g,f,y){"use strict";var S=h.ListKeyboardMode;var I=h.ListMode;var v=h.ListType;var T=h.ButtonType;var _=s.MessageType;var m=n.extend("sap.m.ListItemBase",{metadata:{library:"sap.m",properties:{type:{type:"sap.m.ListType",group:"Misc",defaultValue:v.Inactive},visible:{type:"boolean",group:"Appearance",defaultValue:true},unread:{type:"boolean",group:"Misc",defaultValue:false},selected:{type:"boolean",defaultValue:false},counter:{type:"int",group:"Misc",defaultValue:null},highlight:{type:"string",group:"Appearance",defaultValue:"None"},highlightText:{type:"string",group:"Misc",defaultValue:""},navigated:{type:"boolean",group:"Appearance",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{tap:{deprecated:true},detailTap:{deprecated:true},press:{},detailPress:{}},designtime:"sap/m/designtime/ListItemBase.designtime"}});m.getAccessibilityText=function(t,e){var i=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(!t||!t.getVisible||!t.getVisible()){return e?i.getText("CONTROL_EMPTY"):""}var o;if(t.getAccessibilityInfo){o=t.getAccessibilityInfo()}if(!o||!t.getAccessibilityInfo){o=this.getDefaultAccessibilityInfo(t.getDomRef())}o=y.extend({type:"",description:"",children:[]},o);var s=o.type+" "+o.description+" ",n=t.getTooltip_AsString();if(o.enabled===false){s+=i.getText("CONTROL_DISABLED")+" "}if(o.editable===false){s+=i.getText("CONTROL_READONLY")+" "}if(!o.type&&n&&s.indexOf(n)==-1){s=n+" "+s}o.children.forEach(function(t){s+=m.getAccessibilityText(t)+" "});s=s.trim();if(e&&!s){s=i.getText("CONTROL_EMPTY")}return s};m.getDefaultAccessibilityInfo=function(t){if(!t){return null}var e=[],i=window.Node,o=window.NodeFilter,s=document.createTreeWalker(t,o.SHOW_TEXT+o.SHOW_ELEMENT);while(s.nextNode()){var n=s.currentNode;if(n.nodeType===i.TEXT_NODE){var r=(n.nodeValue||"").trim();if(r){e.push(r)}}}return{description:e.join(" ")}};m.prototype.DetailIconURI=r.getIconURI("edit");m.prototype.NavigationIconURI=r.getIconURI("slim-arrow-right");m.prototype.TagName="li";m.prototype.init=function(){this._active=false;this._bGroupHeader=false;this._bNeedsHighlight=false;this._bNeedsNavigated=false};m.prototype.onAfterRendering=function(){this.informList("DOMUpdate",true);this._checkHighlight();this._checkNavigated()};m.prototype.invalidate=function(){if(!this.bOutput){return}n.prototype.invalidate.apply(this,arguments)};m.prototype.getBindingContextPath=function(t){var e=this.getList();if(e&&!t){t=(e.getBindingInfo("items")||{}).model}var i=this.getBindingContext(t);if(i){return i.getPath()}};m.prototype.isSelectedBoundTwoWay=function(){var t=this.getBinding("selected");if(t&&t.getBindingMode()==i.TwoWay){return true}};m.prototype.getList=function(){var t=this.getParent();if(t&&t.isA("sap.m.ListBase")){return t}};m.prototype.getListProperty=function(t,e){var i=this.getList();if(i){t=f(t);return i["get"+t]()}return e};m.prototype.informList=function(t,e,i){var o=this.getList();if(o){var s="onItem"+t;if(o[s]){o[s](this,e,i)}}};m.prototype.informSelectedChange=function(t){var e=this.getList();if(e){e.onItemSelectedChange(this,t);this.bSelectedDelayed=undefined}else{this.bSelectedDelayed=t}};m.prototype.getAccessibilityType=function(t){return t.getText("ACC_CTR_TYPE_OPTION")};m.prototype.getGroupAnnouncement=function(){return this.$().prevAll(".sapMGHLI:first").text()};m.prototype.getAccessibilityDescription=function(t){var e=[],i=this.getType(),o=this.getHighlight(),s=this.getTooltip_AsString();if(this.getSelected()){e.push(t.getText("LIST_ITEM_SELECTED"))}if(o!==_.None){var n=this.getHighlightText();if(o in _&&!n){n=t.getText("LIST_ITEM_STATE_"+o.toUpperCase())}e.push(n)}if(this.getUnread()&&this.getListProperty("showUnread")){e.push(t.getText("LIST_ITEM_UNREAD"))}if(this.getCounter()){e.push(t.getText("LIST_ITEM_COUNTER",this.getCounter()))}if(i==v.Navigation){e.push(t.getText("LIST_ITEM_NAVIGATION"))}else{if(i==v.Detail||i==v.DetailAndActive){e.push(t.getText("LIST_ITEM_DETAIL"))}if(i==v.Active||i==v.DetailAndActive){e.push(t.getText("LIST_ITEM_ACTIVE"))}}var r=this.getGroupAnnouncement()||"";if(r){e.push(r)}if(this.getContentAnnouncement){e.push((this.getContentAnnouncement(t)||"").trim())}if(s){e.push(s)}if(this._bAnnounceNotSelected&&this.isSelectable()&&!this.getSelected()){e.push(t.getText("LIST_ITEM_NOT_SELECTED"))}return e.join(" . ")};m.prototype.getAccessibilityInfo=function(){var t=sap.ui.getCore().getLibraryResourceBundle("sap.m");return{type:this.getAccessibilityType(t),description:this.getAccessibilityDescription(t),focusable:true}};m.prototype.getMode=function(){return this.getListProperty("mode","")};m.prototype.updateAccessibilityState=function(t){var e=this.$();if(!e.length){return}var i=e.parent().children(".sapMLIB");e.attr(y.extend({"aria-setsize":i.length,"aria-posinset":i.index(e)+1},t))};m.prototype.getDeleteControl=function(t){if(!t||this._oDeleteControl){return this._oDeleteControl}if(!this.DeleteIconURI){m.prototype.DeleteIconURI=r.getIconURI(c.get({name:"_sap_m_ListItemBase_DeleteIcon"})||"decline")}this._oDeleteControl=new u({id:this.getId()+"-imgDel",icon:this.DeleteIconURI,type:T.Transparent,tooltip:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("LIST_ITEM_DELETE")}).addStyleClass("sapMLIBIconDel sapMLIBSelectD").setParent(this,null,true).attachPress(function(t){this.informList("Delete")},this);this._oDeleteControl._bExcludeFromTabChain=true;this._oDeleteControl.useEnabledPropagator(false);return this._oDeleteControl};m.prototype.onThemeChanged=function(){m.prototype.DeleteIconURI=r.getIconURI(c.get({name:"_sap_m_ListItemBase_DeleteIcon"}));if(this._oDeleteControl){this._oDeleteControl.setIcon(this.DeleteIconURI)}};m.prototype.getDetailControl=function(t){if(!t||this._oDetailControl){return this._oDetailControl}this._oDetailControl=new u({id:this.getId()+"-imgDet",icon:this.DetailIconURI,type:T.Transparent,tooltip:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("LIST_ITEM_EDIT")}).addStyleClass("sapMLIBType sapMLIBIconDet").setParent(this,null,true).attachPress(function(){this.fireDetailTap();this.fireDetailPress()},this);this._oDetailControl._bExcludeFromTabChain=true;this._oDetailControl.useEnabledPropagator(false);return this._oDetailControl};m.prototype.getNavigationControl=function(t){if(!t||this._oNavigationControl){return this._oNavigationControl}this._oNavigationControl=new a({id:this.getId()+"-imgNav",src:this.NavigationIconURI,useIconTooltip:false,noTabStop:true}).setParent(this,null,true).addStyleClass("sapMLIBType sapMLIBImgNav");return this._oNavigationControl};m.prototype.getSingleSelectControl=function(t){if(!t||this._oSingleSelectControl){t&&this._oSingleSelectControl.setSelected(this.getSelected());return this._oSingleSelectControl}this._oSingleSelectControl=new d({id:this.getId()+"-selectSingle",groupName:this.getListProperty("id")+"_selectGroup",activeHandling:false,selected:this.getSelected(),ariaLabelledBy:l.getStaticId("sap.m","LIST_ITEM_SELECTION")}).addStyleClass("sapMLIBSelectS").setParent(this,null,true).setTabIndex(-1).attachSelect(function(t){var e=t.getParameter("selected");this.setSelected(e);this.informList("Select",e)},this);this._oSingleSelectControl.useEnabledPropagator(false);return this._oSingleSelectControl};m.prototype.getMultiSelectControl=function(t){if(!t||this._oMultiSelectControl){t&&this._oMultiSelectControl.setSelected(this.getSelected());return this._oMultiSelectControl}this._oMultiSelectControl=new p({id:this.getId()+"-selectMulti",activeHandling:false,selected:this.getSelected(),ariaLabelledBy:l.getStaticId("sap.m","LIST_ITEM_SELECTION")}).addStyleClass("sapMLIBSelectM").setParent(this,null,true).setTabIndex(-1).addEventDelegate({onkeydown:function(t){this.informList("KeyDown",t)},onkeyup:function(t){this.informList("KeyUp",t)}},this).attachSelect(function(t){var e=t.getParameter("selected");this.setSelected(e);this.informList("Select",e)},this);this._oMultiSelectControl.useEnabledPropagator(false);return this._oMultiSelectControl};m.prototype.getModeControl=function(t){var e=this.getMode();if(!e||e==I.None){return}if(e==I.Delete){return this.getDeleteControl(t)}if(e==I.MultiSelect){return this.getMultiSelectControl(t)}return this.getSingleSelectControl(t)};m.prototype.getTypeControl=function(t){var e=this.getType();if(e==v.Detail||e==v.DetailAndActive){return this.getDetailControl(t)}if(e==v.Navigation){return this.getNavigationControl(t)}};m.prototype.destroyControls=function(t){t.forEach(function(t){t="_o"+t+"Control";if(this[t]){this[t].destroy("KeepDom");this[t]=null}},this)};m.prototype.isActionable=function(){return this.isIncludedIntoSelection()||this.getType()!=v.Inactive&&this.getType()!=v.Detail};m.prototype.exit=function(){this._oLastFocused=null;this._checkHighlight(false);this._checkNavigated(false);this.setActive(false);this.destroyControls(["Delete","SingleSelect","MultiSelect","Detail","Navigation"])};m.prototype.setHighlight=function(e){if(e==null){e=_.None}else if(!t.getType("sap.ui.core.MessageType").isValid(e)&&!t.getType("sap.ui.core.IndicationColor").isValid(e)){throw new Error('"'+e+'" is not a value of the enums sap.ui.core.MessageType or sap.ui.core.IndicationColor for property "highlight" of '+this)}return this.setProperty("highlight",e)};m.prototype.isSelectable=function(){var t=this.getMode();return!(t==I.None||t==I.Delete)};m.prototype.getSelected=function(){if(this.isSelectable()){return this.getProperty("selected")}return false};m.prototype.isSelected=m.prototype.getSelected;m.prototype.setSelected=function(t,e){t=this.validateProperty("selected",t);if(!this.isSelectable()||t==this.getSelected()){return this}if(!e){this.informSelectedChange(t)}var i=this.getModeControl();if(i){i.setSelected(t)}this.updateSelectedDOM(t,this.$());this.setProperty("selected",t,true);return this};m.prototype.updateSelectedDOM=function(t,e){e.toggleClass("sapMLIBSelected",t);e.attr("aria-selected",t)};m.prototype.setParent=function(t){n.prototype.setParent.apply(this,arguments);if(!t){this._bGroupHeader=false;return}this.informList("Inserted",this.bSelectedDelayed);return this};m.prototype.setBindingContext=function(){n.prototype.setBindingContext.apply(this,arguments);this.informList("BindingContextSet");return this};m.prototype.isGroupHeader=function(){return this._bGroupHeader};m.prototype.isIncludedIntoSelection=function(){if(!this.isSelectable()){return false}var t=this.getMode();return t==I.SingleSelectMaster||this.getListProperty("includeItemInSelection")&&(t==I.SingleSelectLeft||t==I.SingleSelect||t==I.MultiSelect)};m.prototype._checkHighlight=function(t){if(t==undefined){t=this.getVisible()&&this.getHighlight()!=_.None}if(this._bNeedsHighlight!=t){this._bNeedsHighlight=t;this.informList("HighlightChange",t)}};m.prototype._checkNavigated=function(t){if(t==undefined){t=this.getVisible()&&this.getNavigated()}if(this._bNeedsNavigated!=t){this._bNeedsNavigated=t;this.informList("NavigatedChange",t)}};m.prototype.hasActiveType=function(){var t=this.getType();return t==v.Active||t==v.Navigation||t==v.DetailAndActive};m.prototype.setActive=function(t){if(t==this._active){return this}if(t&&this.getListProperty("activeItem")){return this}var e=this.$();this._active=t;this._activeHandling(e);if(this.getType()==v.Navigation){this._activeHandlingNav(e)}if(t){this._activeHandlingInheritor(e)}else{this._inactiveHandlingInheritor(e)}this.informList("ActiveChange",t)};m.detectTextSelection=function(t){var e=window.getSelection(),i=e.toString().replace("\n","");return i&&y.contains(t,e.focusNode)};m.prototype.ontap=function(t){if(this._eventHandledByControl){return t.setMarked()}if(m.detectTextSelection(this.getDomRef())){return}if(this.isIncludedIntoSelection()){if(this.getMode()==I.MultiSelect){this.setSelected(!this.getSelected());this.informList("Select",this.getSelected())}else if(!this.getSelected()){this.setSelected(true);this.informList("Select",true)}}else if(this.hasActiveType()){window.clearTimeout(this._timeoutIdStart);window.clearTimeout(this._timeoutIdEnd);this.setActive(true);if(o.os.ios){this.focus()}setTimeout(function(){this.setActive(false)}.bind(this),180);setTimeout(function(){this.fireTap();this.firePress()}.bind(this),0)}this.informList("Press",t.srcControl)};m.prototype.ontouchstart=function(t){this._eventHandledByControl=t.isMarked();var e=t.targetTouches[0];this._touchedY=e.clientY;this._touchedX=e.clientX;if(this._eventHandledByControl||t.touches.length!=1||!this.hasActiveType()){if(this.getListProperty("includeItemInSelection")&&this.getList()._mRangeSelection){t.preventDefault()}return}this._timeoutIdStart=setTimeout(function(){this.setActive(true)}.bind(this),100)};m.prototype.ontouchmove=function(t){if((this._active||this._timeoutIdStart)&&(Math.abs(this._touchedY-t.targetTouches[0].clientY)>10||Math.abs(this._touchedX-t.targetTouches[0].clientX)>10)){clearTimeout(this._timeoutIdStart);this._timeoutIdStart=null;this._timeoutIdEnd=null;this.setActive(false)}};m.prototype.ontouchend=function(t){if(this.hasActiveType()){this._timeoutIdEnd=setTimeout(function(){this.setActive(false)}.bind(this),100)}};m.prototype.ontouchcancel=m.prototype.ontouchend;m.prototype.ondragend=m.prototype.ontouchend;m.prototype._activeHandlingNav=function(){};m.prototype._activeHandlingInheritor=function(){};m.prototype._inactiveHandlingInheritor=function(){};m.prototype._activeHandling=function(t){t.toggleClass("sapMLIBActive",this._active);if(o.system.desktop&&this.isActionable()){t.toggleClass("sapMLIBHoverable",!this._active)}};m.prototype.onsapspace=function(t){if(t.srcControl!==this){return}t.preventDefault();if(t.isMarked()||!this.isSelectable()){return}if(this.getMode()==I.MultiSelect){this.setSelected(!this.getSelected());this.informList("Select",this.getSelected())}else if(!this.getSelected()){this.setSelected(true);this.informList("Select",true)}t.setMarked()};m.prototype.onsapenter=function(t){var e=this.getList();if(t.isMarked()||!e){return}if(t.srcControl!==this&&e.getKeyboardMode()==S.Edit){e.setKeyboardMode(S.Navigation);this._switchFocus(t);return}if(t.srcControl!==this){return}if(this.isIncludedIntoSelection()){this.onsapspace(t)}else if(this.hasActiveType()){t.setMarked();this.setActive(true);setTimeout(function(){this.setActive(false)}.bind(this),180);setTimeout(function(){this.fireTap();this.firePress()}.bind(this),0)}e.onItemPress(this,t.srcControl)};m.prototype.onsapdelete=function(t){if(t.isMarked()||t.srcControl!==this||this.getMode()!=I.Delete){return}this.informList("Delete");t.preventDefault();t.setMarked()};m.prototype._switchFocus=function(t){var e=this.getList();if(!e){return}var i=this.getTabbables();if(t.srcControl!==this){e._iLastFocusPosOfItem=i.index(t.target);this.focus()}else if(i.length){var o=e._iLastFocusPosOfItem||0;o=i[o]?o:-1;i.eq(o).trigger("focus")}t.preventDefault();t.setMarked()};m.prototype.onkeydown=function(t){if(t.isMarked()){return}if(t.which==e.F7){this._switchFocus(t);return}if(t.which==e.F2){if(t.srcControl===this&&this.getType().indexOf("Detail")==0&&this.hasListeners("detailPress")||this.hasListeners("detailTap")){this.fireDetailTap();this.fireDetailPress();t.preventDefault();t.setMarked()}else{var i=this.getList();if(i){this.$().prop("tabIndex",-1);i.setKeyboardMode(i.getKeyboardMode()==S.Edit?S.Navigation:S.Edit);this._switchFocus(t)}}}if(t.srcControl!==this){return}this.informList("KeyDown",t)};m.prototype.onkeyup=function(t){if(t.isMarked()||t.srcControl!==this){return}this.informList("KeyUp",t)};m.prototype.onsapupmodifiers=function(t){if(t.isMarked()||t.srcControl!==this){return}this.informList("UpDownModifiers",t,-1)};m.prototype.onsapdownmodifiers=function(t){if(t.isMarked()||t.srcControl!==this){return}this.informList("UpDownModifiers",t,1)};m.prototype.getTabbables=function(){return this.$().find(":sapTabbable")};m.prototype.onsaptabnext=function(t){var e=this.getList();if(!e||t.isMarked()||e.getKeyboardMode()==S.Edit){return}var i=this.getTabbables().get(-1)||this.getDomRef();if(t.target===i){e.forwardTab(true);t.setMarked()}};m.prototype.onsaptabprevious=function(t){var e=this.getList();if(!e||t.isMarked()||e.getKeyboardMode()==S.Edit){return}if(t.target===this.getDomRef()){e.forwardTab(false);t.setMarked()}};m.prototype.onfocusin=function(t){var e=this.getList();if(!e||t.isMarked()){return}this.informList("FocusIn",t.srcControl);if(t.srcControl===this){return}if(e.getKeyboardMode()==S.Edit||!y(t.target).is(":sapFocusable")){return}setTimeout(e["setItemFocusable"].bind(e,this),0);t.setMarked()};m.prototype.onsapup=function(t){if(t.isMarked()||t.srcControl===this||this.getListProperty("keyboardMode")===S.Navigation){return}this.informList("ArrowUpDown",t)};m.prototype.oncontextmenu=function(t){if(this._bGroupHeader){return}if(y(document.activeElement).is(":focusable")&&document.activeElement!==this.getDomRef()&&t.srcControl!==this.getModeControl()){return}this.informList("ContextMenu",t)};m.prototype.onsapdown=m.prototype.onsapup;return m});