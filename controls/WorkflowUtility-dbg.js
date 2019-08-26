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
					//Browser close functionalities
					if ("addEventListener" in window) {
						window.addEventListener("beforeunload", function (event) {
							event.returnValue = "Are you sure you want to leave?";
							sap.m.MessageToast.show("added..!!");
							// that.onAppExit();
						});
					} else if ("attachEvent" in window) {
						window.attachEvent("onbeforeunload", function (event) {
							event.returnValue = "Are you sure you want to leave?";
							// that.onAppExit();
						});
					}
					if (sap.ui.getCore().byId("backBtn") !== undefined)
						sap.ui.getCore().byId("backBtn").attachBrowserEvent("click", function (event) {
							event.returnValue = "Are you sure you want to leave?";
							// that.onAppExit();
						}, this);
					if (sap.ui.getCore().byId("homeBtn") !== undefined)
						sap.ui.getCore().byId("homeBtn").attachBrowserEvent("click", function (event) {
							event.returnValue = "Are you sure you want to leave?";
							// that.onAppExit();
						}, this);

				},
				error: function (err) {
					sap.m.MessageToast.show("Error..!!");
				}

			});

		},
		handleUnLocking: function (currInst, wid) {
			var that = currInst;
			/*var serviceUrl1 = "/sap/opu/odata/sap/Y88GECAGS004_SRV/";
			var sPath = "/Check_Wi_Lock?Wid=" + wid;*/
			var serviceUrl1 = "/sap/opu/odata/sap/ZGECAGS010_SRV/";
			var sPath = "/MultiplePersonaSet";
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl1);
			oDataModel.read(sPath, {
				success: function (oData, response) {
					sap.m.MessageToast.show("Success..!!");
					//Browser close functionalities

					if ("removeEventListener" in window) {
						window.removeEventListener("beforeunload", function (event) {
							event.returnValue = "Are you sure you want to leave?";
							sap.m.MessageToast.show("removed..!!");
							// that.onAppExit();
						});
					} else if ("detachEvent" in window) {
						window.detachEvent("onbeforeunload", function (event) {
							event.returnValue = "Are you sure you want to leave?";
							// that.onAppExit();
						});
					}
					if (sap.ui.getCore().byId("backBtn") !== undefined)
						sap.ui.getCore().byId("backBtn").detachBrowserEvent("click", function (event) {
							event.returnValue = "Are you sure you want to leave?";
							// that.onAppExit();
						}, this);
					if (sap.ui.getCore().byId("homeBtn") !== undefined)
						sap.ui.getCore().byId("homeBtn").detachBrowserEvent("click", function (event) {
							event.returnValue = "Are you sure you want to leave?";
							// that.onAppExit();
						}, this);
				},
				error: function (err) {
					sap.m.MessageToast.show("Error..!!");
				}

			});

		}

	};

	/*	function onAppExit() {
		//This code should be executed when we do any closing activity for documents
		var that = this;
		var homebtnModel = new sap.ui.model.json.JSONModel({
			"Title": "Confirmation",
			"SubTitle": "You are about to Leave this page.Please note that any unsaved changes will be lost.",
			"SubTitle2": "Do you want to save changes?",
			"BtnNoText": "NO",
			"BtnYesText": "YES"
		});
		FragmentUtility.handleConfirmationDialog(that, homebtnModel, "HomeNav");

		}*/

}, /* bExport= */ true);