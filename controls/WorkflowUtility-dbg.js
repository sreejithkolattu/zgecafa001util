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
			if (wid === undefined || wid === null || wid === "") {
				sap.m.MessageToast.show(" Workitem id is missing");
				return false;
			}
			var serviceUrl1 = "/sap/opu/odata/sap/Y88GECAGS004_SRV/";
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl1);
			oDataModel.callFunction("/Check_Wi_Lock", {
				method: "GET",
				urlParameters: {
					Wid: wid
				},
				success: function (oData, response) {
					//Browser close functionalities
					if ("addEventListener" in window) {
						window.addEventListener("beforeunload", onLeaveApp, this);
					} else if ("attachEvent" in window) {
						window.attachEvent("onbeforeunload", onLeaveApp, this);
					}
					if (sap.ui.getCore().byId("backBtn") !== undefined)
						sap.ui.getCore().byId("backBtn").attachBrowserEvent("click", onLeaveAppBack, this);
					if (sap.ui.getCore().byId("homeBtn") !== undefined)
						sap.ui.getCore().byId("homeBtn").attachBrowserEvent("click", onLeaveAppBack, this);
					sap.m.MessageToast.show(" Your Work item have locked !!!");
				},
				error: function (err) {
					sap.m.MessageToast.show("Error..!!");
				}
			});
		},
		handleUnLocking: function (currInst, wid) {
			var that = currInst;
			if (wid === undefined || wid === null || wid === "") {
				sap.m.MessageToast.show(" Workitem id is missing");
				return false;
			}
			var serviceUrl1 = "/sap/opu/odata/sap/Y88GECAGS004_SRV/";
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl1);
			oDataModel.read("/Unlock_Wid", {
				method: "POST",
				urlParameters: {
					Wid: wid
				},
				success: function (oData, response) {
					//Browser close functionalities
					if ("removeEventListener" in window) {
						window.removeEventListener("beforeunload", onLeaveApp);
					} else if ("detachEvent" in window) {
						window.detachEvent("onbeforeunload", onLeaveApp);
					}
					if (sap.ui.getCore().byId("backBtn") !== undefined)
						sap.ui.getCore().byId("backBtn").detachBrowserEvent("click", onLeaveAppBack, this);
					if (sap.ui.getCore().byId("homeBtn") !== undefined)
						sap.ui.getCore().byId("homeBtn").detachBrowserEvent("click", onLeaveAppBack, this);
					sap.m.MessageToast.show(" Your Work item have unlocked !!!");
				},
				error: function (err) {
					sap.m.MessageToast.show("Error..!!");
				}

			});

		}

	};

	function onLeaveApp(oEvent) {
		var e = e || window.event;
		if (e) {
			e.returnValue = "message";
		}
		return "message";
	}

	function onLeaveAppBack(oEvent) {
		oEvent.preventDefault();
		var oDialog = new sap.m.Dialog({
			icon: "sap-icon://SAP-icons-TNT/exceptions",
			title: "Workitem Locked",
			content: [new sap.m.Text({
				text: "Please unlock your workitem"
			})],
			endButton: new sap.m.Button({
				text: "OK",
				press: function () {
					oDialog.close();
				}
			})
		});
		oDialog.open();
		return false;
	}

}, /* bExport= */ true);