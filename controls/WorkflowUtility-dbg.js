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
						window.addEventListener("beforeunload", onLeaveApp, that);
					} else if ("attachEvent" in window) {
						window.attachEvent("onbeforeunload", onLeaveApp, that);
					}
					if (sap.ui.getCore().byId("backBtn") !== undefined)
						sap.ui.getCore().byId("backBtn").attachBrowserEvent("click", onLeaveAppBack, that);
					if (sap.ui.getCore().byId("homeBtn") !== undefined)
						sap.ui.getCore().byId("homeBtn").attachBrowserEvent("click", onLeaveAppBack, that);

				},
				error: function (err) {
					sap.m.MessageToast.show("Error..!!");
				}

			});

		},
		handleUnLocking: function (currInst, wid) {
			var that = currInst;
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
					//window.onbeforeunload = null;
					if (sap.ui.getCore().byId("backBtn") !== undefined)
						sap.ui.getCore().byId("backBtn").detachBrowserEvent("click", onLeaveAppBack, this);
					if (sap.ui.getCore().byId("homeBtn") !== undefined)
						sap.ui.getCore().byId("homeBtn").detachBrowserEvent("click", onLeaveAppBack, this);
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