sap.ui.define([
	"jquery.sap.global",
	"sap/ui/model/Filter",
	"sap/ui/comp/filterbar/FilterBar",
	"sap/ui/model/FilterOperator",
	"sap/ui/comp/valuehelpdialog/ValueHelpDialog",
	"sap/ui/model/json/JSONModel"
], function (jQuery, Filter, FilterBar, FilterOperator, ValueHelpDialog, JSONModel) {
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
		/** For F4 help 
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
				f4h.title = !isEmptyValue(f4h.title) ? "Personnel Number" : f4h.title;
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
				f4h.reqestedField = "Pernr";
			}
			var oValueHelpDialog = new ValueHelpDialog(that.createId("F4H"), {
				basicSearchText: f4h.inputValue,
				title: f4h.title,
				supportMultiselect: f4h.multiSelect,
				supportRanges: false,
				supportRangesOnly: false,
				key: "Pernr",
				descriptionKey: "nachn",
				ok: function (oControlEvent) {
					var aSelected = [],
						oTable = oValueHelpDialog.getTable(),
						oIndices = oTable.getSelectedIndices();
					for (var i = 0; i < oIndices.length; i++) {
						aSelected.push(oTable.getModel().getProperty("/items/" + String(oIndices[i])));
					}
					if (!f4h.autoFill) {
						try {
							that.onValueHelpSelection(aSelected, f4h.scenario);
							oValueHelpDialog.close();
						} catch (e) {
							sap.m.MessageToast.show(" Implement of onValueHelpSelection(oModel) is missing");
						}
					} else if (isBlankValue(f4h.control)) {
						try { // To set Token to UI element - multi line mode should enable
							if (f4h.getToken && f4h.control.getEnableMultiLineMode()) {
								f4h.control.setTokens(oControlEvent.getParameter("tokens"));
								oValueHelpDialog.close();
							} else if (!f4h.getToken) { // set single value
								f4h.control.setValue(aSelected[0][f4h.reqestedField]);
								oValueHelpDialog.close();
							}
						} catch (e) {
							sap.m.MessageToast.show("Token assingment failed.");
						}
						// Assign the values to model
						if (f4h.control.getModel(f4h.oModel) !== undefined) {
							if (f4h.control.getModel(f4h.oModel).getData().length > 0) {
								aSelected.forEach(function (s) {
									f4h.control.getModel(f4h.oModel).getData().push(s);
								});
							} else {
								f4h.control.getModel(f4h.oModel).setData(aSelected);
							}
							f4h.control.getModel(f4h.oModel).refresh();
						} else if (f4h.oModel !== "" && f4h.oModel !== undefined) {
							var myModel = new sap.ui.model.json.JSONModel();
							myModel.setData(aSelected);
							f4h.control.setModel(myModel, f4h.oModel);
						}
					} else {
						sap.m.MessageToast.show("Element is not available !!!");
					}
					oValueHelpDialog.close();
				},
				cancel: function (oControlEvent) {
					oValueHelpDialog.close();
				},
				afterClose: function () {
					oValueHelpDialog.destroy();
				}
			});
			onValueHelpRequest(null, oValueHelpDialog);
			oValueHelpDialog.setRangeKeyFields([{
				label: "Personnel ID",
				key: "Pernr"
			}, {
				label: "Name",
				key: "Name1"
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
			var oRowsModel = new JSONModel();
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
				reqestedField = "Pernr";
			}
			// set the models for suggetion help
			var oModel;
			if (that.getView().getModel("suggetionModel") === undefined) {
				oModel = new JSONModel({
					PArea: [],
					PSArea: [],
					EmpInfo: []
				});
				that.getView().setModel(oModel, "suggetionModel");
			}
			var oFilterBar = getFilterbar(oValueHelpDialog);
			oFilterBar.setModel(that.getView().getModel("suggetionModel"));
			getFilterbar(oValueHelpDialog);
			oValueHelpDialog.setFilterBar(oFilterBar);
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
			var modelPath = "/sap/opu/odata/sap/ZGEPMGS002_SRV";
			var sPath = "SubordinatesSet";
			var oModel = new sap.ui.model.odata.ODataModel(modelPath, false);
			oModel.read(sPath, {
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
			var oVhJsonModel = new JSONModel({
				items: oData.results
			});
			this.getTable().setModel(getColumnModel(), "columns");
			this.getTable().setModel(getRowModel());
			this.getTable().setModel(oVhJsonModel);
			this.getTable().bindRows({
				path: "/items"
			});
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

	function onFilterRequest(oFilter, oValueHelpDialog) {
		oValueHelpDialog.getTable().bindRows({
			path: "/items",
			filters: oFilter
		});
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
			title: "Personnel Number",
			multiSelect: false,
			maxIncludeRanges: "2",
			supportRanges: false,
			supportRangesOnly: false,
			key: "Pernr",
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
			title: "Personnel Number",
			control: null,
			getToken: true,
			idOfUIElement: "",
			reqestedField: "Pernr",
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
	 * Function getColumnModel
	 * @return {oColModel} 
	 * @public
	 */
	function getColumnModel() {
		try {
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [{
					label: "Personnal Number",
					template: "Pernr"
				}, {
					label: "Name",
					template: "Cname"
				}, {
					label: "Designation",
					template: "Plstx"
				}, {
					label: "Personnel Area",
					template: "Btext" //"Werks"
				}, {
					label: "Personnel Subarea",
					template: "Name1" //"Btrtl"
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
				control: new sap.m.Input({
					placeholder: placeholder,
					type: sap.m.InputType.Text,
					showSuggestion: true
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
					getFilterItem("empGrp", "gn1", "n1", "Personnel Number", "searchInput1", "Search Personnel Number", "/items", "{Pernr}",
						"{Pernr}"),
					getFilterItem("empGrp", "gn1", "n2", "Name", "searchInput2", "Search Name", "/items", "{Cname}", "{Cname}"),
					getFilterItem("empGrp", "gn1", "n3", "Designation", "searchInput3", "Search Designation", "/items", "{Plstx}", "{Plstx}"),
					getFilterItem("empGrp", "gn1", "n4", "Personnel Area", "searchInput4", "Search Personnel Area", "/items", "{Werks}", "{Btext}"),
					getFilterItem("empGrp", "gn1", "n5", "Personnel Subarea", "searchInput5", "Search Personnel Subarea", "/items", "{Btrtl}",
						"{Name1}")
				],
				search: function (oEvt) {
					var oParams = oEvt.getParameter("selectionSet"),
						oPernr = oParams[0].getValue(),
						oName1 = oParams[1].getValue(),
						oDesignation = oParams[2].getValue(),
						oWerks = oParams[3].getValue(),
						oBtrtl = oParams[4].getValue(),

						oFilter1 = [new sap.ui.model.Filter("Pernr", "Contains", oPernr),
							new sap.ui.model.Filter("Name1", "Contains", oName1),
							new sap.ui.model.Filter("Plstx", "Contains", oDesignation),
							new sap.ui.model.Filter("Btext", "Contains", oWerks),
							new sap.ui.model.Filter("Name1", "Contains", oBtrtl)
						];
					onFilterRequest(oFilter1, oValueHelpDialog);
				}
			});
			return oFilterBar;
		} catch (e) {
			sap.m.MessageToast.show("Error in filter bar");
		}
	}
	//End of Generic functions
}, /* bExport= */ true);