sap.ui.define(["jquery.sap.global", "sap/ui/core/Control"], function (jQuery, Control) {
	"use strict";
	/**
	 * @author Sreejith Ravindran
	 * @version ${1.0}
	 * Date: Nov 3, 2018
	 */
	return {
		/**
		 * Function 
		 * Format yyyy-mm-ddThh:mm:ss
		 * @param {function} format 
		 * @return {Date} 
		 * @public
		 */
		handleOdataError: function (that, sDetails) {
			var i18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl : "/i18n/i18nTest.properties"
            });
			var error =  new sap.ui.model.json.JSONModel({
				"Title":sDetails.message +":" +sDetails.statusText,
				"SubTitle":jQuery.parseXML(sDetails.responseText).querySelector("message").textContent,
				"BtnOkText":"OK"
				 });
        	that._oDialog = sap.ui.xmlfragment("oDataError", "ytestss.ytestss.view.GenericError", this);
		    that._oDialog.setModel(error);
		    that._oDialog.addStyleClass( "sapUiSizeCompact");
			that._oDialog.open();
		}

	};

	//============================================================================================================
	//------------------------------------------------------------------------------------------------------------
	//                Generic Functions for Element utility 
	//------------------------------------------------------------------------------------------------------------


	function getPattern(oParams) {
		return jQuery.parseXML(oParams.response.responseText).querySelector("message").textContent;
	}

}, /* bExport= */ true);