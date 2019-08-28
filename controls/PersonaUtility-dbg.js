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

			handleRoleBasedPersona: function (diaInst) {
				var that = diaInst;
				var serviceUrl1 = "/sap/opu/odata/sap/ZGECAGS010_SRV/";
				var oDataModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl1);
				oDataModel.read("/MultiplePersonaSet", {
					success: function (oData, response) {
						if (oData !== undefined && oData.results !== undefined && oData.results.length > 1) {
							that._oDialog = sap.ui.xmlfragment("CLMPRJ_ID", "zgecafa001util.zgecafa001util.fragments.PersonaSelectionView", that);
							that.getView().addDependent(that._oDialog);
							jQuery.sap.syncStyleClass("sapUiSizeCompact", that.getView(), that._oDialog);
							that._oDialog.setModel(new sap.ui.model.json.JSONModel(oData));
							that._oDialog.open();

						} else {
							that.onPersonaSelection();
						}

					},
					error: function (err) {
						sap.m.MessageToast.show("Data not saved..!!");
					}

				});

			},
			onSelectPersona: function (oEvent) {
				var oContextObj = oEvent.getSource().getBindingContext().getObject();
				this._oDialog.setModel(oContextObj, "PersonaModel");
			},
			onPressOkBtn: function () {
				var that = this;
				var serviceUrl1 = "/sap/opu/odata/sap/ZGECAGS010_SRV/";
				var oDataModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl1);
				var oPersonaObj = this._oDialog.getModel("PersonaModel");
				oDataModel.create("/MultiplePersonaSet", oPersonaObj, {
					success: function (oData, response) {
						that._oDialog.close();
						that._oDialog.destroy();
						that._oDialog = undefined;
					},
					error: function (err) {
						sap.m.MessageToast.show("Data not saved..!!");
						return;
					}
				});

			}
		};

	},
	/* bExport= */
	true);