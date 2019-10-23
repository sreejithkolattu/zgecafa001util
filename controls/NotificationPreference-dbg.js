sap.ui.define([
	"zgecafa001util/zgecafa001util/controls/FragmentUtility"
], function (FragmentUtility) {
	"use strict";
	/**
	 * @author Amit Kumar
	 */
	return {
		ref: null,
		_handleNotificationPref: function (t, e, Source) {
			this.ref = t;
			if (!this.oEmailPopover) {
				this.oEmailPopover = new sap.m.Popover("gPPEmailId", {
					title: "Notification Preference",
					contentWidth: "35%",
					contentHeight: "20%",
					class: "sapUiContentPadding",
					placement: "Bottom",
					initialFocus: "btnSendId",
					footer: [new sap.m.Toolbar()],
					content: [],
					afterClose: function (oEvent) {
						oEvent.getSource().close();
					}
				});
				this.oEmailPopover.setFooter(false);
				this.oEmailPopover.setModel(new sap.ui.model.json.JSONModel({
					Source: Source
				}), "notiPreModel");

			}

			// this.oEmailPopover.getFooter().setVisible(false);
			this.oEmailPopover.openBy(e.getSource());
			this.readPrefernceEmail(Source);
		},

		_addContent: function () {
			var cbOffice = new sap.m.CheckBox({
				text: "Official email: {notiPreModel>/Oemail}",
				selected: "{notiPreModel>/Ioemail}"
			});
			var cbPersonal = new sap.m.CheckBox({
				text: "Personal email: {notiPreModel>/Pemail}",
				selected: "{notiPreModel>/Ipemail}"
			});

			var oNoteLbl = new sap.m.Label({
				text: "Note: Changes will be effective from start date of next month"
			});

			var oVBox = new sap.m.VBox();
			oVBox.addItem(cbOffice);
			oVBox.addItem(cbPersonal);
			oVBox.addItem(oNoteLbl);
			oVBox.addStyleClass("sapUiSmallMarginBegin");
			oNoteLbl.addStyleClass("sapUiSmallMarginBegin");
			this.oEmailPopover.addContent(oVBox);
		},

		_addFooter: function () {
			var that = this;
			var oBtnSend = new sap.m.Button("btnSendId", {
				text: "SEND",
				press: function (oEvent) {
					that.sendMailPref(oEvent.getSource().getModel("notiPreModel").getData());
				}
			});
			var oBtnCancel = new sap.m.Button("btnCancelId", {
				text: "CANCEL",
				press: function (oEvent) {
					oEvent.getSource().getParent().getParent().close();
				}
			});

			var oToolbarSpacer = new sap.m.ToolbarSpacer();

			this.oEmailPopover.getFooter().addContent(oToolbarSpacer);
			this.oEmailPopover.getFooter().addContent(oBtnCancel);
			this.oEmailPopover.getFooter().addContent(oBtnSend);
		},

		readPrefernceEmail: function (Source) {

			this.toggleBusy();
			var sServiceUrl = "/sap/opu/odata/sap/ZGEPYGS008_SRV";
			var oServiceOdataModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl);

			var sPath = "/NotificationPrefSet(Source='" + Source + "')";
			oServiceOdataModel.read(sPath, {
				success: function (oData) {
					this._addContent();
					this._addFooter();
					this.oEmailPopover.setFooter(true);
					this.oEmailPopover.getModel("notiPreModel").setData(oData);
					this.oEmailPopover.getModel("notiPreModel").refresh();
					this.toggleBusy();
				}.bind(this),
				error: function (hrex) {
					this._showCustomServiceError(hrex);
					this.oEmailPopover.setFooter(false);
					this.toggleBusy();
				}.bind(this)
			});
		},

		sendMailPref: function (oPayload) {

			this.toggleBusy();
			var sServiceUrl = "/sap/opu/odata/sap/ZGEPYGS008_SRV";
			var oServiceOdataModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
				defaultUpdateMethod: "PUT"
			});
			var sPath = oServiceOdataModel.createKey("NotificationPrefSet", oPayload);
			oServiceOdataModel.update("/" + sPath, oPayload, {
				success: function (oData) {
					// this.oEmailPopover.getModel("notiPreModel").setData(oData);
					// this.oEmailPopover.getModel("notiPreModel").refresh();
					this._fnSuccessMessage();
					this.toggleBusy();
					// this.readPrefernceEmail(oPayload.Source);
				}.bind(this),
				error: function (hrex) {
					this._showCustomServiceError(hrex);
				}.bind(this)
			});
		},

		toggleBusy: function () {
			this.oEmailPopover.setBusy(!this.oEmailPopover.getBusy());
			this.oEmailPopover.setBusyIndicatorDelay(0);
		},
		_fnSuccessMessage: function () {
			var oModel = new sap.ui.model.json.JSONModel({
				"Title": "Success",
				"BtnNoText": "OK",
				"BtnYesText": "OK",
				"SubTitle": "Changes will be effective from start date of next month.",
				"BtnOkText": "OK"
			});

			FragmentUtility.handleSuccessDialog(this.ref, oModel, "SuccessDlgId");
			sap.ui.core.Fragment.byId(this.ref.createId("SuccessDlgId"), "btnOk").attachPress(function () {
				if (this.oEmailPopover) {
					this.oEmailPopover.close();
				}
			}.bind(this));
		},
		_fnErrorMessage: function () {
			var oModel = new sap.ui.model.json.JSONModel({
				"Title": "Error",
				"BtnNoText": "OK",
				"BtnYesText": "OK",
				"SubTitle": "No notification preference found",
				"BtnOkText": "OK"
			});

			FragmentUtility.handleErrorDialog(this.ref, oModel, "ErrorDlgId");
			sap.ui.core.Fragment.byId(this.ref.createId("ErrorDlgId"), "btnOk").attachPress(function () {
				if (this.oEmailPopover) {
					this.oEmailPopover.close();
				}
			}.bind(this));
		},

		_showCustomServiceError: function (sDetails) {
			var sContentType = sDetails.headers["Content-Type"];
			var sMsg = sDetails.response;
			if (sDetails.statusCode === 504) {
				sDetails.message = "Error";
				sMsg = "Socket connection timed out for host";
			} else {
				if (!sContentType || sDetails.headers["Content-Type"].indexOf("json") <= 0) { // Content is XML
					if (sDetails.responseText) {
						sMsg = jQuery.parseXML(sDetails.responseText).querySelector("message").textContent;
						// sMsg = JSON.parse(sDetails.responseText).error.message.value;
					} else {
						sMsg = jQuery.parseXML(sDetails.body).querySelector("message").textContent;
					}
				} else { // Content is in JSON
					if (sDetails.responseText) {
						sMsg = JSON.parse(sDetails.responseText).error.message.value;
					}
				}

			}
			var error = new sap.ui.model.json.JSONModel({
				"Title": sDetails.message, //+ ":" + sDetails.statusText,
				"SubTitle": sMsg,
				"BtnOkText": "OK"
			});

			FragmentUtility.handleODataErrorDialog(null, error, "fgCustomServerErrorId", function () {

				if (this.oEmailPopover) {
					this.oEmailPopover.close();
				}

			}.bind(this));
		}
	};
});