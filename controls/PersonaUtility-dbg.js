sap.ui.define(["jquery.sap.global", "sap/ui/core/Control"], function (jQuery, Control) {
		"use strict";
		/**
		 * @author Sreejith Ravindran
		 * @version ${1.0}
		 * Date: Aug 3, 2019
		 */
		return {
			/**
			 * Function showSignatureFragment (fragInst,fragmentId) 
			 * @param {fragInst} Current Instance 
			 * @param {fragmentId} Id of fragment 
			 * @return {} 
			 * @public
			 */

			handleRoleBasedPersona: function (oComponent, fnSuccessCallback, fnErrorCallback) {
				var sAppId = oComponent.getMetadata().getManifestEntry("sap.app").id;
				//var appId = sap.ushell.Container.getService("AppLifeCycle").getCurrentApplication().componentInstance.getManifest()["sap.app"].id;
				var aFilter = [new sap.ui.model.Filter("FaId", sap.ui.model.FilterOperator.EQ, sAppId)];
				var sServiceUrl = "/sap/opu/odata/sap/ZGECAGS010_SRV/";
				var oDataModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl);
				oDataModel.read("/MultiplePersonaSet", {
					filters: aFilter,
					success: function (oData, response) {
						if (oData !== undefined && oData.results !== undefined && oData.results.length > 1) {
							oComponent._oDialog = sap.ui.xmlfragment("CLMPRJ_ID", "zgecafa001util.zgecafa001util.fragments.PersonaSelectionView",
								oComponent);
							oComponent._oDialog.setEscapeHandler(function () {
								return;
							});
							oComponent._oDialog.setModel(new sap.ui.model.json.JSONModel(oData));
							oComponent._oDialog.open();
							//, ))
							sap.ui.core.Fragment.byId("CLMPRJ_ID", 'btnOk').attachPress(onPersonaContinue.bind(this, sAppId, oComponent, fnSuccessCallback,
								fnErrorCallback));
							sap.ui.core.Fragment.byId("CLMPRJ_ID", 'btnCancel').attachPress(onPressCancelPersonaBtn);
							var oFirstListItem = sap.ui.core.Fragment.byId("CLMPRJ_ID", 'idPersonaListItem').getItems()[0];
							sap.ui.core.Fragment.byId("CLMPRJ_ID", 'idPersonaListItem').setSelectedItem(oFirstListItem, oComponent);
						} else {
							if (fnSuccessCallback !== undefined)
								fnSuccessCallback(oData.results, response);
						}
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

			}

		};

		function onSelectPersona(oEvent) {
			var oLayout = oEvent.getSource().getParent();
			var oContextObj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
			oLayout.getParent().setModel(oContextObj, "PersonaModel");
		}

		function onPersonaContinue(sAppId, oComponent, fnSuccessCallback, fnErrorCallback) {

			var oDialog = oComponent._oDialog;
			var serviceUrl1 = "/sap/opu/odata/sap/ZGECAGS010_SRV/";
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl1);
			var oPersonaObj = sap.ui.core.Fragment.byId("CLMPRJ_ID", 'idPersonaListItem').getSelectedItem().getBindingContext().getObject();
			oPersonaObj.FaId = sAppId;
			// var oPersonaObj = oDialog.getModel("PersonaModel");
			oDataModel.create("/MultiplePersonaSet", oPersonaObj, {
				success: function (oData, response) {
					if (fnSuccessCallback)
						fnSuccessCallback(oPersonaObj, oData);
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
			oDialog.close();
			oDialog.destroy();
			oDialog = undefined;
		}

		function onPressCancelPersonaBtn(oEvent) {
			var oDialog = oEvent.getSource().getParent();
			oDialog.close();
			oDialog.destroy();
			oDialog = undefined;
			window.history.go(-1);

		}

	},
	/* bExport= */
	true);