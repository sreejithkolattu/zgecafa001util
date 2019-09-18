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

		handleLocking: function (currInst, wid, target, fnSuccessCallback, fnErrorCallback) {
			var that = currInst;
			if (wid === undefined || wid === null || wid === "") {
				sap.m.MessageToast.show(" Workitem id is missing");
				return false;
			}
			var serviceUrl1 = "/sap/opu/odata/sap/";
			serviceUrl1 += target ? "" : "Y88GECAGS004_SRV/";
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl1);
			oDataModel.callFunction("/Check_Wi_Lock", {
				method: "GET",
				urlParameters: {
					Wid: wid
				},
				success: function (oData, response) {
					//Browser close functionalities
					if ("addEventListener" in window) {
						window.addEventListener("beforeunload", onLeaveAppBack.bind(this, wid, target), this);
					} else if ("attachEvent" in window) {
						window.attachEvent("onbeforeunload", onLeaveAppBack.bind(this, wid, target), this);
					}
					if (sap.ui.getCore().byId("backBtn") !== undefined)
						sap.ui.getCore().byId("backBtn").attachBrowserEvent("click", onLeaveAppBack.bind(this, wid, target), this);
					if (sap.ui.getCore().byId("homeBtn") !== undefined)
						sap.ui.getCore().byId("homeBtn").attachBrowserEvent("click", onLeaveAppHome.bind(this, wid, target), this);
					if (fnSuccessCallback)
						fnSuccessCallback(oData, response);
					//sap.m.MessageToast.show(" Your Work item have locked !!!");
				},
				error: function (oError) {
					try {
						var sErrorMsg = jQuery.parseJSON(oError.responseText).error.innererror.errordetails[0].message;
					} catch (oEx) {
						sErrorMsg = "An unexpected error has occurred. Contact your administrator.";
					}
					if (fnErrorCallback)
						fnErrorCallback(sErrorMsg, oError);
				}
			});
		},
		handleUnLocking: function (currInst, wid, target, fnSuccessCallback, fnErrorCallback) {
			var that = currInst;
			if (wid === undefined || wid === null || wid === "") {
				sap.m.MessageToast.show(" Workitem id is missing");
				return false;
			}
			var serviceUrl1 = "/sap/opu/odata/sap";
			serviceUrl1 += target ? "" : "Y88GECAGS004_SRV/";
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl1);
			oDataModel.callFunction("/Unlock_Wid", {
				method: "POST",
				urlParameters: {
					Wid: wid
				},
				success: function (oData, response) {
					//Browser close functionalities
					if ("removeEventListener" in window) {
						window.removeEventListener("beforeunload", onLeaveAppBack);
					} else if ("detachEvent" in window) {
						window.detachEvent("onbeforeunload", onLeaveAppBack);
					}
					if (sap.ui.getCore().byId("backBtn") !== undefined)
						sap.ui.getCore().byId("backBtn").detachBrowserEvent("click", onLeaveAppBack, this);
					if (sap.ui.getCore().byId("homeBtn") !== undefined)
						sap.ui.getCore().byId("homeBtn").detachBrowserEvent("click", onLeaveAppHome, this);
					sap.m.MessageToast.show(" Your Work item have unlocked !!!");
					if (fnSuccessCallback)
						fnSuccessCallback(oData, response);

				},
				error: function (oError) {
					try {
						var sErrorMsg = jQuery.parseJSON(oError.responseText).error.innererror.errordetails[0].message;
					} catch (oEx) {
						sErrorMsg = "An unexpected error has occurred. Contact your administrator.";
					}
					if (fnErrorCallback)
						fnErrorCallback(sErrorMsg, oError);
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

	function onLeaveAppBack(wid, target) {
		if (wid === undefined || wid === null || wid === "") {
			sap.m.MessageToast.show(" Workitem id is missing");
			return false;
		}
		var serviceUrl1 = "/sap/opu/odata/sap/Y88GECAGS004_SRV/";
		var oDataModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl1);
		oDataModel.callFunction("/Unlock_Wid", {
			method: "POST",
			urlParameters: {
				Wid: wid
			},
			success: function (oData, response) {
				window.history.go(-1);
				//sap.m.MessageToast.show(" Your Work item have unlocked !!!");
			},
			error: function (oError) {
				//sap.m.MessageToast.show("Error..!!");
			}

		});

		return false;
	}

	function onLeaveAppHome(wid, target) {
		if (wid === undefined || wid === null || wid === "") {
			sap.m.MessageToast.show(" Workitem id is missing");
			return false;
		}
		var serviceUrl1 = "/sap/opu/odata/sap/Y88GECAGS004_SRV/";
		var oDataModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl1);
		oDataModel.callFunction("/Unlock_Wid", {
			method: "POST",
			urlParameters: {
				Wid: wid
			},
			success: function (oData, response) {
				var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
				oCrossAppNavigator.toExternal({
					target: {
						shellHash: "#"
					}
				});
				//sap.m.MessageToast.show(" Your Work item have unlocked !!!");
			},
			error: function (oError) {
				//sap.m.MessageToast.show("Error..!!");
			}

		});

		return false;
	}

}, /* bExport= */ true);