/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.m.OverflowToolbarButton.
sap.ui.define(['sap/m/Button', 'sap/m/ButtonRenderer'],
	function(Button, ButtonRenderer) {
	"use strict";



	/**
	 * Constructor for a new <code>OverflowToolbarButton</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 * Represents an {@link sap.m.Button} that shows its text only when in the overflow area of an {@link sap.m.OverflowToolbar}.
	 *
	 * <b>Note:</b> This control is intended to be used exclusively in the context of the <code>OverflowToolbar</code>, whenever it is required
	 * to have buttons that show only an icon in the toolbar, but icon and text in the overflow menu.
	 * @extends sap.m.Button
	 *
	 * @implements sap.f.IShellBar
	 *
	 * @author SAP SE
	 * @version 1.96.0
	 *
	 * @constructor
	 * @public
	 * @since 1.28
	 * @alias sap.m.OverflowToolbarButton
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var OverflowToolbarButton = Button.extend("sap.m.OverflowToolbarButton", /** @lends sap.m.OverflowToolbarButton.prototype */ {
		metadata: {
			interfaces: [
				"sap.f.IShellBar",
				"sap.m.IOverflowToolbarContent"
			]
		},
		renderer: ButtonRenderer
	});

	OverflowToolbarButton.prototype._getText = function() {
			if (this._bInOverflow) {
				return Button.prototype._getText.call(this);
			}

			return "";
	};

	OverflowToolbarButton.prototype._getTooltip = function() {
			var sTooltip = Button.prototype._getTooltip.call(this);

			if (this._bInOverflow) {
				return this._getText() === sTooltip ? "" : sTooltip;
			}

			return sTooltip;
	};

		/**
		 * OVERFLOW TOOLBAR settings
		 */
		OverflowToolbarButton.prototype._onBeforeEnterOverflow = function () {this._bInOverflow = true;};

		OverflowToolbarButton.prototype._onAfterExitOverflow = function () {this._bInOverflow = false;};

		OverflowToolbarButton.prototype.getOverflowToolbarConfig = function () {
			var oConfig = {
				canOverflow: true,
				propsUnrelatedToSize: ["enabled", "type"],
				autoCloseEvents: ["press"]
			};

			oConfig.onBeforeEnterOverflow = this._onBeforeEnterOverflow.bind(this);
			oConfig.onAfterExitOverflow = this._onAfterExitOverflow.bind(this);

			return oConfig;
		};

	return OverflowToolbarButton;

});
