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

			handlePersona: function (that) {
				var serviceUrl1 = "/sap/opu/odata/sap/ZGECAGS010_SRV/";
				var oDataModel = new sap.ui.model.odata.v2.ODataModel(serviceUrl1);
				oDataModel.read("/MultiplePersonaSet", {
					success: function (oData, response) {
						if (oData !== undefined && oData.results !== undefined && oData.results.length > 0) {
							var rb1 = new sap.m.RadioButtonGroup("rbgPersona", {
								buttons: {
									path: '/results',
									template: new sap.m.RadioButton({
										key: '{Rfp01}',
										text: '{Stext}'
									})

								},
								selectedIndex: 1,
								select: function (e) {
									var btn = this.getSelectedButton();
									if (e.getSource().getParent().getModel("Persona") === undefined) {
										e.getSource().getParent().setModel(btn.getBindingContext().getObject(), "Persona");
									} else {
										e.getSource().getParent().setModel(btn.getBindingContext().getObject(), "Persona");
									}
								}
							});
							rb1.setModel(new sap.ui.model.json.JSONModel(oData));
							var oDialog = new sap.m.Dialog({
								title: "Persona Settings",
								content: [rb1],
								endButton: new sap.m.Button({
									text: "Continue",
									type: "Emphasized",
									press: function (e) {
										var oModelData = oDialog.getModel("Persona");
										oDataModel.create("/MultiplePersonaSet", oModelData, {
											success: function (data, response) {
												sap.m.MessageToast.show("The selected Persona have saved");
												oDialog.close();
												oDialog.destroy(true);
											},
											error: function () {
												sap.m.MessageToast.show("Error !!!");
												oDialog.close();
												oDialog.destroy(true);
											}
										});

									}
								})
							});
							oDialog.setModel(rb1.getModel().getProperty("/results")[0], "Persona");
							oDialog.open();

						}

					},
					error: function (err) {
						sap.m.MessageToast.show("Data not saved..!!");
					}

				});

			}
		};

	},
	/* bExport= */
	true);