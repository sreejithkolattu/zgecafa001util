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
							that._oDialog.setEscapeHandler(function () {
								return;
							});
							that._oDialog.setModel(new sap.ui.model.json.JSONModel(oData));
							that._oDialog.open();
							sap.ui.core.Fragment.byId("CLMPRJ_ID", 'btnOk').attachPress(onPersonaSelection);
							sap.ui.core.Fragment.byId("CLMPRJ_ID", 'btnCancel').attachPress(onPressCancelPersonaBtn);
							var oFirstListItem = sap.ui.core.Fragment.byId("CLMPRJ_ID", 'idPersonaListItem').getItems()[0];
							// that.getView().setModel(oFirstListItem.getBindingContext().getObject(), "PersonaModel");
							sap.ui.core.Fragment.byId("CLMPRJ_ID", 'idPersonaListItem').setSelectedItem(oFirstListItem, true);
							// sap.ui.core.Fragment.byId("CLMPRJ_ID", 'idPersonaListItem').attachSelectionChange(onSelectPersona);

						} else {
							that.onPersonaSelection();
						}

					},
					error: function (err) {
						sap.m.MessageToast.show("Data not saved..!!");
					}

				});

			}

		};

		function onSelectPersona(oEvent) {
			var oLayout = oEvent.getSource().getParent();
			var oContextObj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
			oLayout.getParent().setModel(oContextObj, "PersonaModel");
		}

		function onPersonaSelection(oEvent) {
			var that = this;
			var oDialog = oEvent.getSource().getParent();
			var serviceUrl1 = "/sap/opu/odata/sap/ZGECAGS010_SRV/";
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl1);
			var oPersonaObj = sap.ui.core.Fragment.byId("CLMPRJ_ID", 'idPersonaListItem').getSelectedItem().getBindingContext().getObject();
			// var oPersonaObj = oDialog.getModel("PersonaModel");
			oDataModel.create("/MultiplePersonaSet", oPersonaObj, {
				success: function (oData, response) {
					// try {
					that.onPersonaSelection();
					// } catch (e) {
					// 	sap.m.MessageBox.error("Please implement 'onPersonaSelection' method");
					// }
				},
				error: function (err) {
					sap.m.MessageBox.error("Error in retrieving data");
					return;
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