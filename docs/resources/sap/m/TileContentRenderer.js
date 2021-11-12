/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/base/security/encodeCSS","sap/m/GenericTile","sap/ui/core/library"],function(e,t,n,o){"use strict";var i=e.GenericTileMode,r=e.FrameType,a=o.Priority;var s={apiVersion:2};s.render=function(e,n){var o=n.getTooltip_AsString();var i=n._getContentType();if(i){i=t(i)}var r=t("sapMFrameType"+n.getFrameType());e.openStart("div",n);e.class("sapMTileCnt");e.class(i);e.class(r);if(o.trim()){e.attr("title",o)}e.openEnd();this._renderContent(e,n);this._renderFooter(e,n);e.close("div")};s._renderContent=function(e,t){if(!t._bRenderContent){return}var o=t.getContent(),s=t.getPriority(),d=t.getParent(),c=d instanceof n&&d.getMode()===i.ActionMode&&d.getFrameType()===r.TwoByOne,l=c&&s&&s!==a.None;if(o){if(l){e.openStart("div",t.getId()+"-content-container");e.class("sapMTileContainer");e.openEnd();e.openStart("div",t.getId()+"-priority");e.class("sapMTilePriority");e.class(s);e.openEnd();e.openStart("div",t.getId()+"-priority-content");e.class("sapMTilePriorityCnt");e.openEnd();e.openStart("div",t.getId()+"-priority-border");e.class("sapMTilePriorityBorder");e.openEnd();e.close("div");e.openStart("span",t.getId()+"-priority-value");e.class("sapMTilePriorityValue");e.openEnd();e.text(t._getPriorityText(s));e.close("span");e.close("div");e.close("div")}e.openStart("div",t.getId()+"-content");e.class("sapMTileCntContent");e.openEnd();if(!o.hasStyleClass("sapMTcInnerMarker")){o.addStyleClass("sapMTcInnerMarker")}e.renderControl(o);e.close("div");if(l){e.close("div")}}};s._renderFooter=function(e,o){if(!o._bRenderFooter){return}var i="sapMTileCntFooterTextColor"+o.getFooterColor(),r=o._getFooterText(e,o),a=o.getParent();if(a instanceof n&&(a._isNavigateActionEnabled()||a._isActionMode())){e.openStart("div",a.getId()+"-footer-container");e.class("sapMTileFtrCnt");e.openEnd()}e.openStart("div",o.getId()+"-footer-text");e.class("sapMTileCntFtrTxt");e.class(t(i));e.openEnd();e.text(r);e.close("div");if(a instanceof n&&a._isActionMode()){e.openStart("div",a.getId()+"-actionButtons");e.class("sapMGTActionModeContainer");e.openEnd();a.getActionButtons().forEach(function(t){e.renderControl(t)});e.close("div");e.close("div")}else if(a instanceof n&&a._isNavigateActionEnabled()){e.openStart("div",a.getId()+"-navigateActionContainer");e.class("sapMTileNavContainer");e.openEnd();e.renderControl(a._getNavigateAction());e.close("div");e.close("div")}};return s},true);