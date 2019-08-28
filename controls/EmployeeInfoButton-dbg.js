/*!
 * ${copyright}
 */
// Provides buttom zgecafa001util.zgecafa001util.EmployeeInfoButton.
sap.ui.define(["jquery.sap.global", "./../library","sap/m/Button"],
	function (jQuery, library,Button) {
		"use strict";
		/**
		 * Constructor for a new EmployeeInfoButton buttom.
		 *
		 * @param {string} [sId] id for the new buttom, generated automatically if no id is given
		 * @param {object} [mSettings] initial settings for the new buttom
		 *
		 * @class
		 * Some class description goes here.
		 * @extends sap.m.buttom
		 *
		 * @author Sreejith Ravindran
		 * @version ${1.0}
		 *
		 * @constructor
		 * @public
		 * @alias zgecafa001util.zgecafa001util.buttoms.EmployeeInfoButton
		 * @ui5-metamodel This buttom/element also will be described in the UI5 (legacy) designtime metamodel
		 */
		var EmployeeInfoButton = Button.extend("zgecafa001util.zgecafa001util.controls.EmployeeInfoButton", {
			metadata: {
				events: {
					 "employeeHover":{}
				}
			},
			// the employeeHover event handler....
		   onmouseover : function(evt) {  
		    this.fireEmployeeHover();
		   },
		   renderer: {}
		});
		return EmployeeInfoButton;
	}, /* bExport= */ true);