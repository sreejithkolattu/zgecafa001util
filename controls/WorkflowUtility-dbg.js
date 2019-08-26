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
						window.addEventListener("beforeunload", onLeaveApp);
					} else if ("attachEvent" in window) {
						window.attachEvent("onbeforeunload", onLeaveApp);
					}
					if (sap.ui.getCore().byId("backBtn") !== undefined)
						sap.ui.getCore().byId("backBtn").attachBrowserEvent("click", onLeaveApp, this);
					if (sap.ui.getCore().byId("homeBtn") !== undefined)
						sap.ui.getCore().byId("homeBtn").attachBrowserEvent("click", onLeaveApp, this);

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
						window.removeEventListener("beforeunload", onLeaveApp);
					} else if ("detachEvent" in window) {
						window.detachEvent("onbeforeunload", onLeaveApp);
					}
					if (sap.ui.getCore().byId("backBtn") !== undefined)
						sap.ui.getCore().byId("backBtn").detachBrowserEvent("click", onLeaveApp, this);
					if (sap.ui.getCore().byId("homeBtn") !== undefined)
						sap.ui.getCore().byId("homeBtn").detachBrowserEvent("click", onLeaveApp, this);
				},
				error: function (err) {
					sap.m.MessageToast.show("Error..!!");
				}

			});

		}

	};

	function onLeaveApp() {
		var oDialog = new sap.m.Dialog({
			icon: "sap-icon://popup-window",
			title: "Workitem Locked !!!",
			content: [new sap.m.Text({
				text: " You have locked the workitem. Please unlock."
			})],
			endButton: new sap.m.Button({
				text: "OK",
				press: function () {
					oDialog.close();
				}
			})
		});
		oDialog.open();

	}

}, /* bExport= */ true);