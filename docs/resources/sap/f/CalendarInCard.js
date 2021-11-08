/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Button","sap/m/Toolbar","sap/ui/core/Core","sap/ui/core/date/UniversalDate","sap/ui/core/format/DateFormat","sap/ui/core/IconPool","sap/ui/core/InvisibleText","sap/ui/dom/containsOrEquals","sap/ui/unified/Calendar","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","./CalendarInCardRenderer"],function(t,e,a,i,r,o,s,n,h,c,_,p){"use strict";var g=h.extend("sap.f.CalendarInCard",{metadata:{library:"sap.f"}});g.prototype.init=function(){h.prototype.init.apply(this,arguments);this.setProperty("_currentPicker","month")};g.prototype.onBeforeRendering=function(){var t=this.getAggregation("month"),e=this._getFocusedDate().toLocalJSDate();t[0].displayDate(e);this._iSize=0;switch(this._iMode){case 0:this._oPickerBtn.setText(this._formatPickerText(e));break;case 1:this._oPickerBtn.setText(this._formatMonthPickerText());break;case 2:case 3:this._oPickerBtn.setText(this._formatYearPickerText());break}this._updateTodayButtonState()};g.prototype.onAfterRendering=function(t){};g.prototype.onsaptabnext=function(t){};g.prototype.onsaptabprevious=function(t){};g.prototype._initializeHeader=function(){var i=this.getId()+"--Head",r=a.getLibraryResourceBundle("sap.f"),n=new t(i+"-PrevBtn",{icon:o.getIconURI("slim-arrow-left"),tooltip:r.getText("CALENDAR_BTN_PREV"),type:"Transparent",press:function(){this._handlePrevious()}.bind(this)}),h=new t({icon:o.getIconURI("slim-arrow-right"),tooltip:r.getText("CALENDAR_BTN_NEXT"),type:"Transparent",press:function(){this._handleNext()}.bind(this)}),c=new e(i,{ariaLabelledBy:s.getStaticId("sap.f","CALENDAR_NAVIGATION")});this._oTodayBtn=new t({text:r.getText("CALENDAR_TODAY"),ariaLabelledBy:s.getStaticId("sap.f","CALENDAR_NAVIGATE_TO_TODAY"),type:"Transparent",press:function(){this._handleTodayPress()}.bind(this)});this._oPickerBtn=new t({type:"Transparent",ariaLabelledBy:s.getStaticId("sap.f","CALENDAR_SELECT_RANGE"),press:function(){this._handlePickerButtonPress()}.bind(this)});c.addContent(n).addContent(this._oTodayBtn).addContent(h).addContent(this._oPickerBtn);this.setAggregation("header",c)};g.prototype._handlePickerButtonPress=function(){switch(this._iMode){case 0:this._showMonthPicker();this._oPickerBtn.getDomRef().focus();break;case 1:this._showYearPicker();this._oPickerBtn.getDomRef().focus();break;case 2:this._showYearRangePicker();break}};g.prototype._handleTodayPress=function(){var t=new Date,e=c.fromLocalJSDate(t);this.getAggregation("month")[0].setDate(t);this.getSelectedDates()[0].setStartDate(t);this._setFocusedDate(e);if(this._iMode===3){t.setFullYear(t.getFullYear()-this._getYearRangePicker().getRangeSize()/2);this._getYearRangePicker().setDate(t);this._oPickerBtn.setText(this._formatYearPickerText())}else if(this._iMode===2){this._getYearPicker().setDate(t);this._oPickerBtn.setText(this._formatYearPickerText())}else if(this._iMode===1){this.displayDate(t);this._getMonthPicker()._iYear=t.getFullYear();this._getMonthPicker().setMonth(t.getMonth());this._oPickerBtn.setText(this._formatMonthPickerText())}else{this._oPickerBtn.setText(this._formatPickerText())}this._updateTodayButtonState();this.fireStartDateChange();this.fireSelect()};g.prototype._formatPickerText=function(t){var e=t?t:this.getSelectedDates()[0].getStartDate(),i=a.getConfiguration().getRTL(),o=r.getDateInstance({format:"yMMMM"}),s=o.format(e),n,h;if(!i){n=s;if(h){n+=" - "+h}}else{if(h){n=h+" - "+s}else{n=s}}return n};g.prototype._formatYearPickerText=function(){var t=this._getYearPicker().getDate().getFullYear(),e=this._getYearPicker().getYears(),a=t-Math.floor(e/2),i=t+e/2-1;return""+a+" - "+i};g.prototype._formatMonthPickerText=function(){return r.getDateInstance({format:"y"}).format(this.getStartDate())};g.prototype._showMonthPicker=function(t){var e=this._getFocusedDate(),a=this._getMonthPicker();this.setProperty("_currentPicker","monthPicker");a._setYear(e.getYear());if(!t){a.setMonth(e.getMonth());this._setDisabledMonths(e.getYear(),a)}this._iMode=1;this._togglePrevNext(e,false);this._oPickerBtn.setText(this._formatMonthPickerText())};g.prototype._showYearPicker=function(){var t=this._getFocusedDate(),e=this._getYearPicker();this.setProperty("_currentPicker","yearPicker");this._togglePrevNexYearPicker();this._iMode=2;e.setDate(t.toLocalJSDate());this._oPickerBtn.setText(this._formatYearPickerText())};g.prototype._showYearRangePicker=function(){h.prototype._showYearRangePicker.apply(this,arguments);this._oPickerBtn.setVisible(false)};g.prototype._selectMonth=function(){h.prototype._selectMonth.apply(this,arguments);this._oPickerBtn.setText(this._formatPickerText());this._updateTodayButtonState()};g.prototype._selectYear=function(){h.prototype._selectYear.apply(this,arguments);this._oPickerBtn.setText(this._formatMonthPickerText());this._showMonthPicker();this._updateTodayButtonState()};g.prototype._selectYearRange=function(){var t=this.getAggregation("yearRangePicker"),e=t.getRangeSize(),a=this.getPrimaryCalendarType(),i=c.fromLocalJSDate(t.getDate(),a),r=this._getFocusedDate();i.setMonth(r.getMonth(),r.getDate());i.setYear(i.getYear()+Math.floor(e/2));r.setYear(i.getYear());this._setFocusedDate(r);this._showYearPicker();this._oPickerBtn.setVisible(true).setText(this._formatYearPickerText());this._updateTodayButtonState()};g.prototype._handlePrevious=function(){h.prototype._handlePrevious.apply(this,arguments);this._handleArrowNavigation(-1)};g.prototype._handleNext=function(){h.prototype._handleNext.apply(this,arguments);this._handleArrowNavigation(1)};g.prototype._handleArrowNavigation=function(t){var e,a,i;if(this._iMode===3){i=this._getYearRangePicker();i.getDate().setFullYear(i.getDate().getFullYear()+t*i.getYears());this._oPickerBtn.setText(this._formatYearPickerText())}else if(this._iMode===2){a=this._getYearPicker();a.getDate().setFullYear(a.getDate().getFullYear()+t*a.getYears());this._oPickerBtn.setText(this._formatYearPickerText())}else if(this._iMode===1){e=this._getMonthPicker();this._getFocusedDate().setYear(e._iYear);this.getAggregation("month")[0].getDate().setYear(e._iYear);this._oPickerBtn.setText(this._formatMonthPickerText())}else{this._oPickerBtn.setText(this._formatPickerText(this._getFocusedDate().toLocalJSDate()))}this._updateTodayButtonState()};g.prototype._dateMatchesVisibleRange=function(){var t=c.fromLocalJSDate(new Date),e,a,i,r,o;switch(this._iMode){case 0:e=this.getSelectedDates().length?this.getSelectedDates()[0].getStartDate():this.getStartDate();a=e.getDate()===t.getDate();return a&&_._isSameMonthAndYear(c.fromLocalJSDate(this.getStartDate()),t);case 1:return _._isSameMonthAndYear(c.fromLocalJSDate(this.getStartDate()),t);case 2:return _._isSameMonthAndYear(c.fromLocalJSDate(this._getYearPicker().getDate()),t);case 3:i=this._getYearRangePicker();r=i.getDate();o=new Date(r.getFullYear()+i.getRangeSize()/2,r.getMonth(),r.getDate());return _._isSameMonthAndYear(c.fromLocalJSDate(o),t)}};g.prototype._updateTodayButtonState=function(){if(this._oTodayBtn){this._oTodayBtn.setEnabled(!this._dateMatchesVisibleRange())}};g.prototype._updateHeader=function(){};g.prototype.onsapescape=function(){this.fireCancel();this._closePickers();this._oPickerBtn.setVisible(true);this._oPickerBtn.setText(this._formatPickerText())};g.prototype._updateHeadersButtons=function(){};g.prototype._togglePrevNext=function(){};g.prototype._togglePrevNexYearPicker=function(){};g.prototype._initializeSecondMonthHeader=function(){};g.prototype._updateHeadersYearPrimaryText=function(){};g.prototype._updateHeadersYearAdditionalText=function(){};g.prototype._updateActiveHeaderYearButtonVisibility=function(){};g.prototype._setHeaderText=function(){};return g});