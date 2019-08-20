sap.ui.define(["jquery.sap.global", "sap/ui/core/Control"], function (jQuery, Control) {
	"use strict";
	/**
	 * @author Sreejith Ravindran
	 * @version ${1.0}
	 * Date: Nov 3, 2018
	 */
	return {
		/**
		 * Function showSignatureFragment (fragInst,fragmentId) 
		 * @param {fragInst} Current Instance 
		 * @param {fragmentId} Id of fragment 
		 * @return {} 
		 * @public
		 */

		handleLocking: function (currInst, wid) {
			var that = currInst;
			/*var serviceUrl1 = "/sap/opu/odata/sap/Y88GECAGS004_SRV/";
			var sPath = "/Check_Wi_Lock?Wid=" + wid;*/
			var serviceUrl1 = "/sap/opu/odata/sap/ZGECAGS010_SRV/";
			var sPath = "/MultiplePersonaSet";
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl1);
			oDataModel.read(sPath, {
				success: function (oData, response) {
					sap.m.MessageToast.show("Success..!!");
					sap.ui.getCore().byId("backBtn").attachBrowserEvent("click", function (event) {
						event.returnValue = "Are you sure you want to leave?";
						// that.onAppExit();
					}, this);
					sap.ui.getCore().byId("homeBtn").attachBrowserEvent("click", function (event) {
						event.returnValue = "Are you sure you want to leave?";
						// that.onAppExit();
					}, this);
					//Browser close functionalities
					if ("addEventListener" in window) {
						window.addEventListener("beforeunload", function (event) {
							event.returnValue = "Are you sure you want to leave?";
							// that.onAppExit();
						});
					} else if ("attachEvent" in window) {
						window.attachEvent("onbeforeunload", function (event) {
							event.returnValue = "Are you sure you want to leave?";
							// that.onAppExit();
						});
					}

				},
				error: function (err) {
					sap.m.MessageToast.show("Error..!!");
				}

			});

		}
	};

}, /* bExport= */ true);