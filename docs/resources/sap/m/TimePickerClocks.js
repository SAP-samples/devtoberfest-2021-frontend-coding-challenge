/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./TimePickerInternals","./TimePickerClock","./ToggleButton","./SegmentedButton","./SegmentedButtonItem","./TimePickerClocksRenderer","./ToggleButtonRenderer","sap/ui/core/Renderer","sap/ui/events/KeyCodes","sap/ui/Device","sap/ui/core/library","sap/ui/thirdparty/jquery"],function(e,t,s,i,n,o,l,a,r,c,u,h){"use strict";var d=1e3;var g=u.TextDirection;var _=e.extend("sap.m.TimePickerClocks",{metadata:{aggregations:{_buttons:{type:"sap.m.internal.ToggleSpinButton",multiple:true,visibility:"hidden"},_clocks:{type:"sap.m.TimePickerClock",multiple:true,visibility:"hidden"}}}});var p=a.extend(l);p.apiVersion=2;p.render=function(e,t){var s=t.getId(),i=t.getType(),n=t.getEnabled(),o=t.getWidth(),l=t._getTooltip(),a=t._getText(),r=t.getTextDirection(),u=c.browser.internet_explorer||c.browser.edge,h=r===g.Inherit&&!u;e.openStart("div",t);e.class("sapMBtnBase");e.class("sapMBtn");var d=this.generateAccProps(t);d["pressed"]=null;d["valuemin"]=t.getMin();d["valuemax"]=t.getMax();d["valuenow"]=parseInt(t.getText());d["label"]=t.getLabel();d["valuetext"]=parseInt(t.getText()).toString()+" "+t.getLabel();d["role"]="spinbutton";e.accessibilityState(t,d);if(!n){e.attr("disabled","disabled");e.class("sapMBtnDisabled")}if(o!=""||o.toLowerCase()==="auto"){e.style("width",o);e.style("min-width","2.25rem")}e.attr("tabindex","0");e.openEnd();e.openStart("span",s+"-inner");e.class("sapMBtnInner");if(t._isHoverable()){e.class("sapMBtnHoverable")}if(n){e.class("sapMFocusable");if(u){e.class("sapMIE")}}if(a){e.class("sapMBtnText")}if(t.getPressed()){e.class("sapMToggleBtnPressed")}if(i!==""){e.class("sapMBtn"+i)}e.openEnd();if(a){e.openStart("span",s+"-content");e.class("sapMBtnContent");if(r!==g.Inherit){e.attr("dir",r.toLowerCase())}e.openEnd();if(h){e.openStart("bdi",s+"-BDI-content");e.openEnd()}e.text(a);if(h){e.close("bdi")}e.close("span")}if(u&&n){e.openStart("span");e.class("sapMBtnFocusDiv");e.openEnd();e.close("span")}e.close("span");if(l){e.openStart("span",s+"-tooltip");e.class("sapUiInvisibleText");e.openEnd();e.text(l);e.close("span")}e.close("div")};var f=s.extend("sap.m.internal.ToggleSpinButton",{metadata:{library:"sap.m",properties:{label:{type:"string",defaultValue:""},min:{type:"int",defaultValue:0},max:{type:"int",defaultValue:0}}},renderer:p});_.prototype.init=function(){e.prototype.init.apply(this,arguments);this._activeClock=0};_.prototype.onAfterRendering=function(){if(!this._clickAttached){this._attachClickEvent()}this._clockConstraints=this._getClocksConstraints()};_.prototype.onkeyup=function(e){var t=e.which||e.keyCode;if(t===r.CONTROL){e.preventDefault();if(this._clockIndexes.H===this._getActiveClockIndex()&&this.getSupport2400()&&this._ctrlKeyDown===1){this._getActiveClock()._toggle2400(true)._markToggleAsSelected(false)}this._ctrlKeyDown=0}else if(t===r.SPACE){this._spaceKeyDown=false}};_.prototype.onkeydown=function(e){var t=e.which||e.keyCode,s=e.key,i=this.getAggregation("_clocks"),n=this._getActiveClock(),o=this._getActiveClockIndex(),l=this.getSupport2400(),a=["0","1","2","3","4","5","6","7","8","9",":"],c,u,h,d="",g,_,p,f=0,k=-1,C=e.srcControl&&e.srcControl.getMetadata().getName().indexOf("ToggleSpinButton")===-1?false:true;if(this._clockIndexes.H===o&&l&&t===r.CONTROL&&!this._ctrlKeyDown){e.preventDefault();this._ctrlKeyDown=1;n._toggle2400(true)._markToggleAsSelected(true)}else if(t===r.ENTER){if(!C){return}if(typeof this._parentAcceptCallback==="function"){this._parentAcceptCallback()}}else if((t===r.ARROW_UP||t===r.ARROW_DOWN)&&!e.altKey&&!e.metaKey){n&&n.getEnabled()&&n.modifyValue(t===r.ARROW_UP);e.preventDefault()}else if((t===r.PAGE_UP||t===r.PAGE_DOWN)&&!e.altKey&&!e.metaKey){e.preventDefault();if(!e.shiftKey&&!e.ctrlKey){n=this._getHoursClock()}else if(e.shiftKey&&!e.ctrlKey){n=this._getMinutesClock()}else{n=this._getSecondsClock()}n&&n.getEnabled()&&n.modifyValue(t===r.PAGE_UP);n&&this._switchClock(this._getClockIndex(n))}else if(t===r.P||t===r.A){e.preventDefault();c=this._getFormatButton();c&&c.setSelectedKey(t===r.P?"pm":"am")}else if(t===r.SPACE&&!this._spaceKeyDown){if(!C){return}e.preventDefault();this._spaceKeyDown=true;h=n.getSelectedValue();u=n._get24HoursVisible()?24:0;if(this._clockIndexes.H===o&&l&&h!==u&&(h===24||h===0)){n.setSelectedValue(u)}this._kbdBuffer="";this._resetCooldown(true);setTimeout(function(){this._switchNextClock(true)}.bind(this),0)}else if(a.indexOf(s)!==-1){this._exactMatch=null;this._resetCooldown(true);if(s===":"){this._kbdBuffer="";this._resetCooldown(true);this._switchNextClock(true)}else if(this._clockConstraints[o]){d=this._kbdBuffer+s;g=parseInt(d);if(this._clockConstraints[o].step===1){if(g>this._clockConstraints[o].max){i[o].setSelectedValue(parseInt(this._kbdBuffer));this._switchNextClock();this._kbdBuffer=s;o=this._getActiveClockIndex();i[o].setSelectedValue(parseInt(s));this._resetCooldown(true)}else{this._kbdBuffer=d;i[o].setSelectedValue(parseInt(this._kbdBuffer));if(this._kbdBuffer.length===2||parseInt(this._kbdBuffer+"0")>this._clockConstraints[o].max){this._resetCooldown(this._kbdBuffer.length===2?false:true);this._kbdBuffer="";this._switchNextClock()}}}else{for(_=this._clockConstraints[o].min;_<=this._clockConstraints[o].max;_++){if(_%this._clockConstraints[o].step===0){p=_.toString();if(d===p.substr(0,d.length)||g===_){f++;k=f===1?_:-1;if(g===_){this._exactMatch=_}}}}if(f===1){i[o].setSelectedValue(k);this._exactMatch=null;this._kbdBuffer="";this._resetCooldown(true);this._switchNextClock()}else if(d.length===2){this._exactMatch=null;this._kbdBuffer="";this._resetCooldown(true)}else{this._kbdBuffer=d}}}}};_.prototype.setValue=function(t){var s=this._getHoursClock(),i=this._getValueFormatPattern(),n=i.indexOf("HH"),o=i.indexOf("H"),l=s&&s.getSelectedValue()===24,a=e._isHoursValue24(t,n,o),r;if(l&&this._isFormatSupport24()&&!a){t=e._replaceZeroHoursWith24(t,n,o)}t=this.validateProperty("value",t);this.setProperty("value",t,true);if(t){r=this._parseValue(a?e._replace24HoursWithZero(t,n,o):t)}if(r){this._setTimeValues(r,a)}return this};_.prototype.getTimeValues=function(){var e=this._getHoursClock(),t=this._getMinutesClock(),s=this._getSecondsClock(),i=this._getFormatButton(),n=null,o=null,l=new Date;if(e){n=parseInt(e.getSelectedValue())}if(i){o=i.getSelectedKey()}if(o==="am"&&n===12){n=0}else if(o==="pm"&&n!==12){n+=12}if(n!==null){l.setHours(n.toString())}if(t){l.setMinutes(t.getSelectedValue())}if(s){l.setSeconds(s.getSelectedValue())}return l};_.prototype.showFirstClock=function(){this._switchClock(0);return this};_.prototype._attachClickEvent=function(){var e=this.getDomRef();e.addEventListener("click",h.proxy(this._focusActiveButton,this),false);this._clickAttached=true};_.prototype._focusActiveButton=function(){var e=this.getAggregation("_buttons"),t=this._getActiveClockIndex();e&&e[t]&&e[t].focus()};_.prototype._setAcceptCallback=function(e){this._parentAcceptCallback=e};_.prototype._resetCooldown=function(e){if(d===0){return}if(this._typeCooldownId){clearTimeout(this._typeCooldownId)}if(e){this._startCooldown()}};_.prototype._startCooldown=function(){if(d===0){return}this._typeCooldownId=setTimeout(function(){this._kbdBuffer="";this._typeCooldownId=null;if(this._exactMatch){this._getActiveClock().setSelectedValue(this._exactMatch);this._exactMatch=null}}.bind(this),d)};_.prototype._switchNextClock=function(e){var t=this._getActiveClockIndex(),s=this.getAggregation("_clocks"),i=s.length,n=this._getActiveClock(),o=t;if(!s){return}if(this._clockIndexes.H===t&&this.getSupport2400()){n._save2400State();if(n.getSelectedValue()===24){return}}do{t++;if(t>=i){t=e?0:i-1}}while(!n.getEnabled()&&t!==o&&(e||t<i-1));this._ctrlKeyDown=0;if(t!==o&&s[t].getEnabled()){this._switchClock(t)}};_.prototype._getClocksConstraints=function(){var e=this.getAggregation("_clocks"),t=this.getSupport2400(),s=[],i,n,o,l,a;if(e){for(a=0;a<e.length;a++){i=e[a].getItemMin();n=e[a]._getMaxValue();o=e[a].getValueStep();l=e[a].getLastItemReplacement();if(l!==-1&&l<i){i=l;if(n!==24||!t){n--}}else if(n===24&&t){i=0}s[a]={min:i,max:n,step:o,prependZero:e[a].getPrependZero()}}}return s};_.prototype._getActiveClockIndex=function(){return this._activeClock||0};_.prototype._getActiveClock=function(){var e=this._getActiveClockIndex(),t=this.getAggregation("_clocks");return t&&t[e]?t[e]:null};_.prototype._setTimeValues=function(e,t){var s=this._getHoursClock(),i=this._getMinutesClock(),n=this._getSecondsClock(),o=this._getMinutesButton(),l=this._getSecondsButton(),a=this._getFormatButton(),r=this.getValueFormat(),c,u=null;e=e||new Date;if(Object.prototype.toString.call(e)!=="[object Date]"||isNaN(e)){throw new Error("Date must be a JavaScript date object; "+this)}if(!t){var h=this._formatValue(e,true);this.setProperty("value",h,true);c=e.getHours()}else{c=24}if((r.indexOf("a")!==-1||r==="")&&a){u=c>=12?"pm":"am";c=c>12?c-12:c;c=c===0?12:c;a&&a.setSelectedKey(u)}s&&s.setSelectedValue(c);i&&i.setSelectedValue(e.getMinutes());n&&n.setSelectedValue(e.getSeconds());s&&this.getSupport2400()&&s._save2400State();if(t){i&&i.setSelectedValue(0).setEnabled(false);n&&n.setSelectedValue(0).setEnabled(false);o&&o.setEnabled(false);l&&l.setEnabled(false)}else{i&&i.setEnabled(true);n&&n.setEnabled(true);o&&o.setEnabled(true);l&&l.setEnabled(true)}};_.prototype._getHoursClock=function(){var e=this.getAggregation("_clocks");return e&&this._clockIndexes&&e[this._clockIndexes.H]?e[this._clockIndexes.H]:null};_.prototype._getMinutesClock=function(){var e=this.getAggregation("_clocks");return e&&this._clockIndexes&&e[this._clockIndexes.M]?e[this._clockIndexes.M]:null};_.prototype._getSecondsClock=function(){var e=this.getAggregation("_clocks");return e&&this._clockIndexes&&e[this._clockIndexes.S]?e[this._clockIndexes.S]:null};_.prototype._getHoursButton=function(){var e=this.getAggregation("_buttons");return e&&this._clockIndexes&&e[this._clockIndexes.H]?e[this._clockIndexes.H]:null};_.prototype._getMinutesButton=function(){var e=this.getAggregation("_buttons");return e&&this._clockIndexes&&e[this._clockIndexes.M]?e[this._clockIndexes.M]:null};_.prototype._getSecondsButton=function(){var e=this.getAggregation("_buttons");return e&&this._clockIndexes&&e[this._clockIndexes.S]?e[this._clockIndexes.S]:null};_.prototype._destroyControls=function(){this.destroyAggregation("_buttons");this.destroyAggregation("_clocks");this.destroyAggregation("_buttonAmPm")};_.prototype._createControls=function(){var s=this._getDisplayFormatPattern(),o=this.getId(),l=this._isFormatSupport24(),a=this.getSupport2400(),r=0,c=0,u=0,h="",d=-1,g,_,p,k,C,x=0,b,m,y,S=false,v,I;this._clockIndexes={};if(s===undefined){return}g=s.indexOf("HH");_=s.indexOf("H");if(g!==-1){b=true;S=true;d=a?24:0;m=0;y=23}else if(_!==-1){b=true;d=a?24:0;m=0;y=23}else if(s.indexOf("hh")!==-1){b=true;S=true;m=1;y=12}else if(s.indexOf("h")!==-1){b=true;m=1;y=12}if(b){this.addAggregation("_clocks",new t(o+"-clockH",{label:this._oResourceBundle.getText("TIMEPICKER_LBL_HOURS"),selectedValue:r,itemMin:1,itemMax:12,valueStep:1,displayStep:1,innerItems:l,lastItemReplacement:d,prependZero:S,support2400:a}));if(a){y++}this.addAggregation("_buttons",new f(o+"-btnH",{label:this._oResourceBundle.getText("TIMEPICKER_LBL_HOURS"),min:m,max:y}));this._clockIndexes.H=x++}if(s.indexOf("m")!==-1){if(s.indexOf("mm")!==-1){d=0;S=true}else{d=0;S=false}this.addAggregation("_clocks",new t(o+"-clockM",{label:this._oResourceBundle.getText("TIMEPICKER_LBL_MINUTES"),selectedValue:c,itemMin:1,itemMax:60,valueStep:this.getMinutesStep(),lastItemReplacement:d,prependZero:S}));this.addAggregation("_buttons",new f(o+"-btnM",{label:this._oResourceBundle.getText("TIMEPICKER_LBL_MINUTES"),min:0,max:59}));this._clockIndexes.M=x++}if(s.indexOf("s")!==-1){if(s.indexOf("ss")!==-1){d=0;S=true}else{d=0;S=false}this.addAggregation("_clocks",new t(o+"-clockS",{label:this._oResourceBundle.getText("TIMEPICKER_LBL_SECONDS"),selectedValue:u,itemMin:1,itemMax:60,valueStep:this.getSecondsStep(),lastItemReplacement:d,prependZero:S}));this.addAggregation("_buttons",new f(o+"-btnS",{label:this._oResourceBundle.getText("TIMEPICKER_LBL_SECONDS"),min:0,max:59}));this._clockIndexes.S=x++}if(s.indexOf("a")!==-1){this.setAggregation("_buttonAmPm",new i(o+"-format",{items:[new n({text:this._sAM,key:"am"}),new n({text:this._sPM,key:"pm"})],selectedKey:h,tooltip:this._oResourceBundle.getText("TIMEPICKER_AMPM_BUTTON_TOOLTIP")}))}k=this.getAggregation("_buttons");C=this.getAggregation("_clocks");this._clockCount=C.length;this._switchClock(0);for(x=0;x<this._clockCount;x++){this._attachEvents(C[x],k[x])}v=this.getValue();if(v){p=e._isHoursValue24(v,g,_);I=this._parseValue(p?e._replace24HoursWithZero(v,g,_):v);if(I){this._setTimeValues(I,p)}}};_.prototype._attachEvents=function(e,t){e.attachChange(function(e){var t=e.getParameter("value"),s=e.getParameter("finalChange"),i=e.getParameter("stringValue"),n=this.getAggregation("_buttons"),o=e.getParameter("id").slice(-1);n[this._clockIndexes[o]]&&n[this._clockIndexes[o]].setText(i).focus();if(!s){if(o==="H"){this._handleHoursChange(e)}return}if(!this.getSupport2400()||t!==24){setTimeout(function(){this._switchNextClock()}.bind(this),0)}}.bind(this));t.attachPress(function(e){var t=e.getParameter("id").slice(-1),s=this.getAggregation("_clocks");if(s[this._clockIndexes[t]].getEnabled()){this._switchClock(this._clockIndexes[t])}}.bind(this));t.onfocusin=function(e){var t=e.target.id.slice(-1),s=this.getAggregation("_clocks");if(s[this._clockIndexes[t]].getEnabled()){this._switchClock(this._clockIndexes[t])}}.bind(this)};_.prototype._switchClock=function(e){var t=this.getAggregation("_clocks"),s=this.getAggregation("_buttons"),i=this._getActiveClock();if(e!==this._activeClock){i._save2400State()}if(this._activeClock!==undefined){s[this._activeClock].setPressed(false);t[this._activeClock].removeStyleClass("sapMTPCActive")}t[e].addStyleClass("sapMTPCActive");s[e].setPressed(true);s[e].focus();this._activeClock=e};_.prototype._getClockIndex=function(e){var t=e.getId().slice(-1);return this._clockIndexes[t]};_.prototype._handleHoursChange=function(e){var t=parseInt(e.getParameter("value")),s=this._getMinutesClock(),i=this._getSecondsClock(),n=this._getMinutesButton(),o=this._getSecondsButton();if(!this.getSupport2400()){return}this._ctrlKeyDown=this._ctrlKeyDown?2:0;if(t===24){if(s&&s.getEnabled()){this._sMinutes=s.getSelectedValue();this._setControlValueAndEnabled(s,n,0,false)}if(i&&i.getEnabled()){this._sSeconds=i.getSelectedValue();this._setControlValueAndEnabled(i,o,0,false)}}else{if(s&&!s.getEnabled()){this._setControlValueAndEnabled(s,n,this._sMinutes,true)}if(i&&!i.getEnabled()){this._setControlValueAndEnabled(i,o,parseInt(this._sSeconds),true)}}this._getHoursButton().focus()};_.prototype._setControlValueAndEnabled=function(e,t,s,i){e.setSelectedValue(parseInt(s));e.setEnabled(i);t.setEnabled(i)};_.prototype._formatNumberToString=function(e,t,s,i){var n;if(t&&e<10){n=e.toString().padStart(2,"0")}else if(e===s&&i!==""){n=i}else{n=e.toString()}return n};return _});