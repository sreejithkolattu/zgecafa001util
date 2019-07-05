sap.ui.define(["jquery.sap.global", "sap/ui/model/Filter", "sap/ui/comp/filterbar/FilterBar", "sap/ui/model/FilterOperator",
	"sap/ui/comp/valuehelpdialog/ValueHelpDialog"
], function (jQuery, Filter, FilterBar, FilterOperator, ValueHelpDialog) {
	"use strict";
	/**
	 * @author Sreejith Ravindran
	 * @version ${1.0}
	 * Date: Dec 3, 2018
	 * This file is below mentioned functionalities:
	 *  1) for F4 Help
	 *  2) Employee card
	 */
	return {

		/** For Position F4 help 
		 * Function showValueHelpDialog
		 * @param {function} that To get the current Object
		 * @param {function} dialogProperties Gives the properties from user
		 * @param {function} userInput Gives the user entered value
		 * @param {function} reqestedField Gives the Table model if any
		 * @param {function} fieldId The id of the field
		 * @return {void} 
		 * @public
		 */
		showValueHelpDialog: function (that, f4h) {
			try {

				f4h = (f4h === null || f4h === undefined) ? setDefaultF4HelpProperties() : f4h;
				f4h.autoFill = !isEmptyValue(f4h.autoFill) || f4h.autoFill ? true : false;
				f4h.control = !isEmptyValue(f4h.control) ? !isEmptyValue(f4h.isFragment) ? sap.ui.core.Fragment.byId(that.createId(f4h.fragmentName),
					f4h.idOfUIElement) : that.getView().byId(f4h.idOfUIElement) : f4h.control;
				f4h.title = !isEmptyValue(f4h.title) ? "Position ID" : f4h.title;
				f4h.multiSelect = isEmptyValue(f4h.multiSelect) ? f4h.multiSelect : false;
				f4h.isFragment = (f4h.isFragment !== "" && f4h.isFragment) ? true : false;
				f4h.getToken = (f4h.getToken !== "" && f4h.getToken) ? true : false;
				if (that.vhDialog !== undefined) {
					that.vhDialog.destroy();
				}
				that.vhDialog = showValueHelpToDialog(that, f4h);
			} catch (e) {
				handleException(e);
			}
		}
	};

	//============================================================================================================
	//------------------------------------------------------------------------------------------------------------
	//                Generic Functions for Element utility 
	//------------------------------------------------------------------------------------------------------------

	// Gen_Fun #1
	/**
	 * Function showValueHelpToDialog
	 * @param {function} that To get the current Object
	 * @param {function} dialogProperties Gives the properties from user
	 * @param {function} reqestedField Gives the Table model if any
	 * @param {function} fieldId The id of the field
	 * @return {void} 
	 * @public
	 */
	function showValueHelpToDialog(that, f4h) {
		try {
			if (!isEmptyValue(f4h.reqestedField)) {
				f4h.reqestedField = "PositionId";
			}
			var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog(that.createId("F4H"), {
				basicSearchText: f4h.inputValue,
				title: f4h.title,
				supportMultiselect: f4h.multiSelect,
				supportRanges: false,
				supportRangesOnly: false,
				key: "PositionId",
				descriptionKey: "nachn",
				ok: function (oControlEvent) {
					var oTable = oValueHelpDialog.getTable();
					var oIndices = oTable.getSelectedIndices();
					var oModel = sap.ui.getCore().getModel().getProperty("/");
					oModel = [];
					for (var i = 0; i < oIndices.length; i++) {
						oModel.push(oTable.getModel().getProperty("/" + String(oIndices[i])));
					}

					if (!f4h.autoFill) {
						try {
							that.onPositionHelpSelection(oModel, f4h.scenario);
							oValueHelpDialog.close();
						} catch (e) {
							sap.m.MessageToast.show(" Implement of onPositionHelpSelection(oModel) is missing");
						}

					} else if (isBlankValue(f4h.control)) {
						try { // To set Token to UI element - multi line mode should enable
							if (f4h.getToken && f4h.control.getEnableMultiLineMode()) {
								f4h.control.setTokens(oControlEvent.getParameter("tokens"));
								oValueHelpDialog.close();
							} else if (!f4h.getToken) { // set single value
								f4h.control.setValue(oModel[0][f4h.reqestedField]);
								oValueHelpDialog.close();
							}

						} catch (e) {
							sap.m.MessageToast.show("Token assingment failed.");
						}
						// Assign the values to model
						if (f4h.oModel !== undefined && f4h.control.getModel(f4h.oModel) !== undefined) {
							if (f4h.control.getModel(f4h.oModel).getData().length > 0) {
								oModel.forEach(function (s) {
									f4h.control.getModel(f4h.oModel).getData().push(s);
								});
							} else {
								f4h.control.getModel(f4h.oModel).setData(oModel);
							}
							f4h.control.getModel(f4h.oModel).refresh();
						} else if (f4h.oModel !== "" && f4h.oModel !== undefined) {
							var myModel = new sap.ui.model.json.JSONModel();
							myModel.setData(oModel);
							f4h.control.setModel(myModel, f4h.oModel);
						}

					} else {
						sap.m.MessageToast.show("Element is not available !!!");
					}
					oValueHelpDialog.close();
				},

				cancel: function (oControlEvent) {
					sap.m.MessageToast.show("Cancel pressed!");
					oValueHelpDialog.close();
				},
				afterClose: function () {
					oValueHelpDialog.destroy();
				}
			});

			// Set the model in ValueHelp Dialog
			sap.ui.getCore().setModel(getCoreModel());
			oValueHelpDialog.getTable().setModel(getColumnModel(), "columns");
			oValueHelpDialog.getTable().setModel(getRowModel());
			oValueHelpDialog.getTable().bindRows("/");

			oValueHelpDialog.setRangeKeyFields([{
				label: "Personnel ID",
				key: "PositionId"
			}, {
				label: "Position Name",
				key: "nachn"
			}]);
			try {
				var myUIElement = (f4h.fragmentName !== undefined && f4h.fragmentName.length > 0) ? sap.ui.core.Fragment.byId(that.createId(f4h.fragmentName),
					f4h.idOfUIElement) : that.getView().byId(f4h.idOfUIElement);
				if (isBlankValue(f4h.idOfUIElement) && myUIElement !== undefined && f4h.getToken && f4h.oModel.length === 0) {
					oValueHelpDialog.setTokens(myUIElement.getTokens());
				}
			} catch (e) {
				sap.m.MessageToast.show("Token assingment failed.");
			}

			if (isEmptyValue(f4h.reqestedField)) {
				setFilterSearch(that, oValueHelpDialog, f4h.reqestedField);
			}

			oValueHelpDialog.addStyleClass((that.theTokenInput !== undefined && that.theTokenInput.$().closest(".sapUiSizeCompact").length > 0) ?
				"sapUiSizeCompact" : "sapUiSizeCozy");

			oValueHelpDialog.open();
			oValueHelpDialog.update();
			return oValueHelpDialog;
		} catch (e) {
			handleException(e);

		}
	}
	/**
	 * Function : validateExistance
	 * @return {oRowsModel} Model for Row
	 * @public
	 */
	function validateExistance(element) {
		if (element === undefined) { // If the view is not available, stop
			sap.m.MessageToast.show("View is not available !!!");
			return false;
		} else {
			return true;
		}
	}
	/**
	 * Function : getRowModel
	 * @return {oRowsModel} Model for Row
	 * @public
	 */
	function getRowModel() {
		try {
			var oRowsModel = new sap.ui.model.json.JSONModel();
			oRowsModel.setData([]);
			return oRowsModel;
		} catch (e) {
			sap.m.MessageToast.show("Error !!!");
		}
	}

	/**
	 * Function setFilterSearch
	 * Restricting the user with only 3 selection to limit the complexity
	 * @param {function} dialogProperties Gives the properties from user
	 * @return {void} 
	 * @public
	 */
	function setFilterSearch(that, oValueHelpDialog, reqestedField) {
		try {
			if (reqestedField === undefined) {
				reqestedField = 'PositionId';
			}
			// set the models for suggetion help
			var oModel;
			if (that.getView().getModel("suggetionModel") === undefined) {
				oModel = new sap.ui.model.json.JSONModel({
					PArea: [],
					PSArea: [],
					EmpInfo: []
				});
				that.getView().setModel(oModel, "suggetionModel");
			}
			var oFilterBar = getFilterbar(oValueHelpDialog);
			oFilterBar.setModel(that.getView().getModel("suggetionModel"));
			//manageSuggetionModels(that);
			var oSearch = new sap.m.SearchField({
				placeholder: "Search",
				search: function (oEvent) {
					var srchQuery = oEvent.getParameter("query");
					// var oFilter1 = [new sap.ui.model.Filter(reqestedField, sap.ui.model.FilterOperator.Contains, srchQuery)];
					var oFilter1 = new sap.ui.model.Filter({
						and: false,
						// filters: oFilter1
						filters: [new sap.ui.model.Filter("PositionId", "Contains", srchQuery),
							new sap.ui.model.Filter("PositionName", "Contains", srchQuery),
							new sap.ui.model.Filter("OrgId", "Contains", srchQuery),
							new sap.ui.model.Filter("OrgDescription", "Contains", srchQuery)
						]
					});
					onValueHelpRequest(oFilter1, oValueHelpDialog);
				}
			});
			oFilterBar.setBasicSearch(oSearch);
			oValueHelpDialog.setFilterBar(oFilterBar);
		} catch (e) {
			sap.m.MessageToast.show("Error !!!");
		}
	}

	/**
	 * Function manageSuggetionModels
	 * This will verify whether the suggetion models are filled
	 * If not, it will get it from backend
	 * @return {oModle} This give the model for suggetions
	 * @public
	 */
	function manageSuggetionModels(that) {
		try {
			var oModel = that.getView().getModel("suggetionModel");
			if (oModel !== undefined) {
				if (oModel.getData().PArea.length < 1) {
					getModelData("/sap/opu/odata/sap/ZGECAGS006_SRV/PerAreaSet", that);
				}
				if (oModel.getData().PSArea.length < 1) {
					getModelData("/sap/opu/odata/sap/ZGECAGS006_SRV/PerSubAreaSet", that);
				}
				if (oModel.getData().EmpInfo.length < 1) {
					var pKeydate = dateForOnlyPosF4(new Date());
					getModelData("/sap/opu/odata/sap/ZGEOM_C_POSITION_VALUEHELP_CDS/ZGEOM_C_POSITION_VALUEHELP('" + pKeydate +
						"')/Set?$select=PositionId,PositionName,OrgId,OrgDescription&$filter=substringof('',PositionId) and substringof('',PositionName) and substringof('',OrgId) and substringof('',OrgDescription) ",
						that);
				}
			}
		} catch (e) {
			sap.m.MessageToast.show("Error !!!");
		}
	}

	/**
	 * Function onValueHelpRequest
	 * @return {} 
	 * @public
	 */
	function onValueHelpRequest(oFilter, that) {
		try {
			that.setBusy(true);
			var pKeydate = dateForOnlyPosF4(new Date());
			var modelPath = "/sap/opu/odata/sap/ZGEOM_C_POSITION_VALUEHELP_CDS/";
			var sPath = "ZGEOM_C_POSITION_VALUEHELP('" + pKeydate + "')/Set";
			var oModel = new sap.ui.model.odata.ODataModel(modelPath, false);
			oModel.read(sPath, {
				filters: [oFilter],
				success: jQuery.proxy(handleSuccessPernrData, that),
				error: jQuery.proxy(handleErrorPernrData, that)
			});
		} catch (e) {
			sap.m.MessageToast.show("Error !!!");
			this.setBusy(false);
		}
	}

	/**
	 * Function handleSuccessPernrData
	 * @return {} 
	 * @public
	 */
	function handleSuccessPernrData(oData, oResponce, that) {
		try {
			this.getTable().getModel().oData = oData.results;
			this.getTable().getModel().refresh();
			this.setBusy(false);
		} catch (e) {
			sap.m.MessageToast.show("Error !!!");
			this.setBusy(false);
		}
	}

	/**
	 * Function handleErrorPernrData
	 * @return {} 
	 * @public
	 */
	function handleErrorPernrData(oData, oResponce, that) {
		try {
			this.setBusy(false);
			sap.m.MessageToast.show("Error while retreaving data !!!");
		} catch (e) {
			sap.m.MessageToast.show("Error !!!");
			this.setBusy(false);
		}
	}

	function dateForOnlyPosF4(date) {
		var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
			pattern: "yyyyMMdd"
		});
		return oDateFormat.format(date);
	}

	/**
	 * Function isEmptyValue
	 * @return {} 
	 * @public
	 */
	function isEmptyValue(value) {
		return (value !== null && value !== undefined);
	}
	/**
	 * Function isBlankValue
	 * @return {} 
	 * @public
	 */
	function isBlankValue(value) {
		return (value !== null && value !== undefined && value !== "");
	}

	/**
	 * Function getModelData
	 * @return {} 
	 * @public
	 */
	function getModelData(path, that) {
		try {
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.attachEventOnce("requestCompleted", function (oEvent) {
				var result = oEvent.getParameter("url").split("/")[oEvent.getParameter("url").split("/").length - 1];
				if (oModel.getData().d !== undefined)
					if (result.indexOf("PerAreaSet") === 0) {
						this.getView().getModel("suggetionModel").getData().PArea = oModel.getData().d.results;
					} else if (result.indexOf("PerSubAreaSet") === 0) {
					this.getView().getModel("suggetionModel").getData().PSArea = oModel.getData().d.results;
				} else if (result.indexOf("ZGEOM_C_POSITION_VALUEHELP") === 0) {
					this.getView().getModel("suggetionModel").getData().EmpInfo = oModel.getData().d.results;
				}
				this.getView().getModel("suggetionModel").refresh();
			}, that).loadData(path);

		} catch (e) {
			return [];
		}
	}

	/**
	 * Function handleException
	 * @return {} 
	 * @public
	 */
	function handleException(e) {
		try {
			sap.m.MessageToast.show("Error !!!" + e.message);
			if (e.message.indexOf("adding element with duplicate id") !== -1) {
				if (sap.ui.getCore().byId(e.message.split("'")[1]) !== undefined) {
					sap.ui.getCore().byId(e.message.split("'")[1]).destroy();
				}
			}
		} catch (e) {}
	}

	/**
	 * Function getDialogProperties
	 * @return {} 
	 * @public
	 */
	function getDialogProperties() {
		var dialogProperties = {
			basicSearchText: "",
			title: "Position ID",
			multiSelect: false,
			maxIncludeRanges: '2',
			supportRanges: false,
			supportRangesOnly: false,
			key: "PositionId",
			descriptionKey: "nachn",
			stretch: sap.ui.Device.system.phone
		};

		return dialogProperties;
	}
	/**
	 * Function setDefaultF4HelpProperties
	 * @return {} 
	 * @public
	 */
	function setDefaultF4HelpProperties() {
		return {
			title: "Position ID",
			control: null,
			getToken: true,
			idOfUIElement: "",
			reqestedField: "PositionId",
			multiSelect: false,
			inputValue: "",
			isFragment: false,
			view: "",
			oModel: "",
			fragmentName: "",
			autoFill: true,
			scenario: ""
		};
	}
	/**
	 * Function getCoreModel
	 * @return {oModel} 
	 * @public
	 */
	function getCoreModel() {
		try {
			var dataObject = [];
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(dataObject);
			sap.ui.getCore().setModel(oModel);
			return oModel;
		} catch (e) {
			sap.m.MessageToast.show("Error !!!");
		}
	}

	/**
	 * Function getColumnModel
	 * @return {oColModel} 
	 * @public
	 */
	function getColumnModel() {
		try {
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [{
					label: "Position ID",
					template: "PositionId"
				}, {
					label: "Position Name",
					template: "PositionName"
				}, {
					label: "Organizational Unit",
					template: "OrgId"
				}, {
					label: "Organizational Unit Name",
					template: "OrgDescription"
				}]
			});
			return oColModel;
		} catch (e) {
			sap.m.MessageToast.show("Error !!!");
		}
	}
	/**
	 * Function getFilterItem
	 * @return {oModel} 
	 * @public
	 */
	function getFilterItem(groupTitle, groupName, name, label, controlName, placeholder, aggPath, key, text) {
		try {
			return new sap.ui.comp.filterbar.FilterGroupItem({
				groupTitle: groupTitle,
				groupName: groupName,
				name: name,
				label: label,
				control: new sap.m.Input(controlName, {
					placeholder: placeholder,
					type: sap.m.InputType.Text,
					showSuggestion: true,
					liveChange: function () {
						if (this.getValue().length > 0) {
							this.bindAggregation("suggestionItems", aggPath, new sap.ui.core.Item({
								key: key,
								text: text
							}));
						}
					}
				})
			});
		} catch (e) {}
	}
	/**
	 * Function getFilterbar
	 * @return {} 
	 * @public
	 */
	function getFilterbar(oValueHelpDialog) {
		try {
			var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
				advancedMode: true,
				filterBarExpanded: true,
				filterGroupItems: [
					getFilterItem("empGrp", "gn1", "n1", "Position ID", "searchInput1", "Search Position ID", "/EmpInfo", "{PositionId}",
						"{PositionId}"),
					getFilterItem("empGrp", "gn1", "n2", "Position Name", "searchInput2", "Search Position Name", "/EmpInfo", "{PositionName}",
						"{PositionName}"),
					getFilterItem("empGrp", "gn1", "n3", "Organizational Unit", "searchInput3", "Search Organizational Unit", "/EmpInfo", "{OrgId}",
						"{OrgId}"),
					getFilterItem("empGrp", "gn1", "n4", "Organizational Unit Name", "searchInput4", "Search Organizational Unit Name", "/EmpInfo",
						"{OrgDescription}", "{OrgDescription}")
				],
				search: function (oEvt) {
					var oParams = oEvt.getParameter("selectionSet");
					var oPositionId = oParams[0].getValue();
					var oPositionName = oParams[1].getValue();
					var oOrgId = oParams[2].getValue();
					var oOrgDescription = oParams[3].getValue();

					// var oFilter1 = [new sap.ui.model.Filter("PositionId", "Contains", oPositionId),
					// 	new sap.ui.model.Filter("PositionName", "Contains", oPositionName),
					// 	new sap.ui.model.Filter("OrgId", "Contains", oOrgId),
					// 	new sap.ui.model.Filter("OrgDescription", "Contains", oOrgDescription)
					// ];
					var oFilter = new sap.ui.model.Filter({
						and: true,
						// filters: oFilter1
						filters: [new sap.ui.model.Filter("PositionId", "Contains", oPositionId),
							new sap.ui.model.Filter("PositionName", "Contains", oPositionName),
							new sap.ui.model.Filter("OrgId", "Contains", oOrgId),
							new sap.ui.model.Filter("OrgDescription", "Contains", oOrgDescription)
						]
					});
					onValueHelpRequest(oFilter, oValueHelpDialog);
				}
			});
			return oFilterBar;
		} catch (e) {
			sap.m.MessageToast.show("Error in filter bar");
		}
	}
	//End of Generic functions

}, /* bExport= */ true);