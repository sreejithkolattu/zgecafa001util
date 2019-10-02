sap.ui.define(["jquery.sap.global", "sap/ui/model/Filter", "sap/ui/comp/filterbar/FilterBar", "sap/ui/model/FilterOperator",
	"sap/ui/comp/valuehelpdialog/ValueHelpDialog", "sap/f/Avatar"
], function (jQuery, Filter, FilterBar, FilterOperator, ValueHelpDialog, Avatar) {
	"use strict";
	/**
	 * @author Sreejith Ravindran/Pankaj
	 * @version ${1.0}
	 * Date: Dec 3, 2018
	 * This file is below mentioned functionalities:
	 *  1) for F4 Help
	 *  2) Employee card
	 */
	return {

		/** For Perner ( Personnel number ) F4 help 
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
				f4h.idOfUIElement = !isEmptyValue(f4h.idOfUIElement) ? "" : f4h.idOfUIElement;
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
		},

		/** For Employee Card 
		 * Function openQuickView
		 * If no employee number, show message 
		 * if particular employee information is available, display without backend call
		 * @param {function} oEvent To get the current event
		 * @param {function} that To get the current Object
		 * @param {function} empNo Employee number to search
		 * @return {void} 
		 * @public
		 */
		openQuickView: function (oEvent, that, empNo) {
			try {
				if (isEmptyValue(empNo)) {
					if (!validateQuickView(that, empNo)) {
						if (that._oQuickView) {
							that._oQuickView.destroy();
						}
						that._oQuickView = sap.ui.xmlfragment(that.createId("QuickView"), "zgecafa001util.zgecafa001util.fragments.EmployeeQuickView",
							this);
						that.getView().addDependent(that._oQuickView);
						setEmployeeModelData(that, empNo); // Set the employee information
					}
					// delay because addDependent will do a async rerendering and the action Sheet will immediately close without it.
					var oButton = oEvent.getSource();
					jQuery.sap.delayedCall(0, that, function () {
						that._oQuickView.openBy(oButton);
					});
				} else {
					sap.m.MessageToast.show("Employee Number is missing !!!");
				}
			} catch (e) {
				handleException(e);
			}
		},

		handleUploadPopover: function (oInstEvent, that, model) {
			try {
				if (oInstEvent === undefined) {
					sap.m.MessageToast.show("Missing Source..!!");
					return false;
				}
				model = (model !== null && model !== undefined) ? model : setDialogModel("U");
				if (that._oInfoUploadPopover) {
					that._oInfoUploadPopover.destroy();
				}
				that._oInfoUploadPopover = sap.ui.xmlfragment(that.createId("InfoUploadPopover"),
					"zgecafa001util.zgecafa001util.fragments.GenericUpload",
					this);
				that.getView().addDependent(that._oInfoUploadPopover);
				that._oInfoUploadPopover.setModel(model);

				// attaching the event on close
				sap.ui.core.Fragment.byId(that.createId("InfoUploadPopover"), "btnOk").attachPress(
					function (oControlEvent) {
						try {
							that._oInfoUploadPopover.close();
							that._oInfoUploadPopover.destroy();
						} catch (e) {}
					});
				//var a = oInstEvent.oSource;
				var oSource = oInstEvent.hasOwnProperty("oSource") ? oInstEvent.getSource() : oInstEvent;
				that._oInfoUploadPopover.openBy(oSource);
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
				f4h.reqestedField = "pernr";
			}
			var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog(that.createId("F4H"), {
				basicSearchText: f4h.inputValue,
				title: f4h.title,
				draggable: true,
				supportMultiselect: f4h.multiSelect,
				supportRanges: false,
				supportRangesOnly: false,
				key: "pernr",
				descriptionKey: "nachn",
				ok: function (oControlEvent) {

					var oTable = oValueHelpDialog.getTable(),
						oModel = [],
						oIndices;

					// to handle the selection of the table in mobile and desktop
					if (oTable.getMetadata().getElementName() === "sap.ui.table.Table") {
						oIndices = oTable.getSelectedIndices();
						//var oModel = sap.ui.getCore().getModel().getProperty("/");
						// oModel = [];
						for (var i = 0; i < oIndices.length; i++) {
							oModel.push(oTable.getModel().getProperty("/" + String(oIndices[i])));
						}
					} else {
						oIndices = oTable.getSelectedItems();
						//var oModel = sap.ui.getCore().getModel().getProperty("/");
						// oModel = [];
						for (var i = 0; i < oIndices.length; i++) {
							oModel.push(oTable.getModel().getProperty(oIndices[i].getBindingContextPath()));
						}
					}

					//end of selection code

					if (!f4h.autoFill) {
						try {
							that.onValueHelpSelection(oModel, f4h.scenario);
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
					//sap.m.MessageToast.show("Cancel pressed!");
					oValueHelpDialog.close();
				},
				afterClose: function () {
					oValueHelpDialog.destroy();
				}
			});

			// Set the model in ValueHelp Dialog
			sap.ui.getCore().setModel(getCoreModel());
			oValueHelpDialog.getTableAsync().then(function (oTable) {
				oTable.setModel(getRowModel());
				if (oTable.bindRows) {
					//image column
					oTable.addColumn(new sap.ui.table.Column({
						label: new sap.m.Label({
							text: "",
							tooltip: ""
						}),
						template: new Avatar({
							src: '{ImageUrl}',
							displaySize: 'XS',
							tooltip: '{ename}'
						}),
						width: "8%"
					}));
					//name and pernr number
					oTable.addColumn(new sap.ui.table.Column({
						label: new sap.m.Label({
							text: "Officer",
							tooltip: "Officer"
						}),
						template: new sap.m.ObjectIdentifier({
							text: '{pernr}',
							title: '{ename}',
							tooltip: '{ename} / {pernr}'
						}),
						width: "28%"
					}));
					//email id
					oTable.addColumn(new sap.ui.table.Column({
						label: new sap.m.Label({
							text: "Email id",
							tooltip: "Email id"
						}),
						template: new sap.m.Text({
							text: '{email}',
							tooltip: '{email}'
						})
					}));
					//organization unit
					oTable.addColumn(new sap.ui.table.Column({
						label: new sap.m.Label({
							text: "Organizational unit",
							tooltip: "Organizational unit"
						}),
						template: new sap.m.Text({
							text: '{OrgUnitDescription}',
							tooltip: '{OrgUnitDescription}'
						})
					}));
					//personnel area
					oTable.addColumn(new sap.ui.table.Column({
						label: new sap.m.Label({
							text: "Personnel area",
							tooltip: "Personnel area"
						}),
						template: new sap.m.Text({
							text: '{PersonnelAreaDescription}',
							tooltip: '{PersonnelAreaDescription}'
						})
					}));
					//personnel sub area
					oTable.addColumn(new sap.ui.table.Column({
						label: new sap.m.Label({
							text: "Personnel subarea",
							tooltip: "Personnel subarea"
						}),
						template: new sap.m.Text({
							text: '{PersonnelSubareaDescription}',
							tooltip: '{PersonnelSubareaDescription}'
						})
					}));
					oTable.bindRows("/");
				}
				if (oTable.bindItems) {

					oTable.addColumn(new sap.m.Column({
						header: new sap.m.Label({
							text: "",
							tooltip: ""
						}),
						width: "15%"
					}));
					oTable.addColumn(new sap.m.Column({
						header: new sap.m.Label({
							text: "Officer",
							tooltip: "Officer"
						})
					}));
					/*	oTable.addColumn(new sap.m.Column({
							header: new sap.m.Label({
								text: "Email id",
								tooltip: "Email id"
							}),
							demandPopin: true,
							minScreenWidth: "Desktop"
						}));*/

					var oTemplate = new sap.m.ColumnListItem({
						cells: [new Avatar({
								src: '{ImageUrl}',
								displaySize: 'XS',
								tooltip: '{ename}'
							}), new sap.m.ObjectIdentifier({
								text: '{pernr}',
								title: '{ename}',
								tooltip: '{ename} / {pernr}'
							})
							// , new sap.m.Text({
							// 	text: '{email}',
							// 	tooltip: '{email}'
							// })
						]
					});
					oTable.setGrowing(true);
					oTable.setGrowingThreshold(20);
					oTable.setGrowingScrollToLoad(true);
					oTable.bindItems({
						path: "/",
						template: oTemplate
					});

				}

			}.bind(that));
			oValueHelpDialog.setRangeKeyFields([{
				label: "Personnel ID",
				key: "pernr"
			}, {
				label: "Employee Name",
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
			that._oBasicSearchField = new sap.m.SearchField({
				placeholder: "Search for NRIC, personnel number, employee name and email id",
				showSearchButton: true,
				search: function () {
					oValueHelpDialog.getFilterBar().search();
				}
			});
			oValueHelpDialog.getFilterBar().setBasicSearch(that._oBasicSearchField);
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
				reqestedField = 'pernr';
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
			manageSuggetionModels(that);
			// var oSearch = new sap.m.SearchField({
			// 	placeholder: "Search for NRIC, personnel number, employee name and email id",
			// 	search: function (oEvent) {
			// 		var srchQuery = oEvent.getParameter("query"),
			// 			aFilters = [];
			// 		aFilters.push(new Filter({
			// 			filters: [
			// 				new Filter({
			// 					path: "ename",
			// 					operator: FilterOperator.Contains,
			// 					value1: srchQuery
			// 				}), new Filter({
			// 					path: "pernr",
			// 					operator: FilterOperator.Contains,
			// 					value1: srchQuery
			// 				}), new Filter({
			// 					path: "srch_email",
			// 					operator: FilterOperator.Contains,
			// 					value1: srchQuery
			// 				}), new Filter({
			// 					path: "NricNumber",
			// 					operator: FilterOperator.EQ,
			// 					value1: srchQuery
			// 				})

			// 			],
			// 			and: false
			// 		}));
			// 		onValueHelpRequest(aFilters, oValueHelpDialog);
			// 	}
			// });
			// oFilterBar.setBasicSearch(oSearch);
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
					getModelData(
						"/sap/opu/odata/sap/ZDD_SH_PERSON_CDS/ZDD_SH_PERSON?$select=pernr,ename,srch_email,NricNumber&$filter=substringof('',pernr) and substringof('',ename) and substringof('',orgeh) and substringof('',werks) and substringof('',btrtl) and substringof('',NricNumber)",
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
			var modelPath = "/sap/opu/odata/sap/ZDD_SH_PERSON_CDS/";
			var sPath = "ZDD_SH_PERSON";
			var oModel = new sap.ui.model.odata.ODataModel(modelPath, false);
			oModel.read(sPath, {
				filters: oFilter,
				success: jQuery.proxy(handleSuccessPernrData, that),
				error: jQuery.proxy(handleErrorPernrData, that)
			});
		} catch (e) {
			// sap.m.MessageToast.show("Error !!!");
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
			if (this.getTable().getMetadata().getElementName() === "sap.ui.table.Table") {
				this.getTable().getTitle().setText('Officers (' + oData.results.length + ')');
			} else {
				this.getTable().setHeaderText('Officers (' + oData.results.length + ')');
			}

			this.getTable().getModel().refresh();

			this.getTable().invalidate();
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

	/**
	 * Function setEmployeeModelData
	 * @return {} 
	 * @public
	 */
	function setEmployeeModelData(that, empNo) {
		try {
			if (isEmptyValue(empNo)) {
				var modelPath = "/sap/opu/odata/sap/ZGECAGS006_SRV/";
				var sPath = "EmpCardSet(Pernr='" + empNo + "')";
				var oModel = new sap.ui.model.odata.ODataModel(modelPath, false);
				oModel.read(sPath, {
					success: jQuery.proxy(handleSuccessEmpInfo, that),
					error: jQuery.proxy(handleErrorEmpInfo, that)
				});
			}
		} catch (e) {
			sap.m.MessageToast.show("Error !!!");
		}
	}

	/**
	 * Function handleSuccessEmpInfo
	 * @return {} 
	 * @public
	 */
	function handleSuccessEmpInfo(oData, oResponce, that) {
		try {
			var sapIcon = "sap-icon://employee";
			if (oData.Photo.length === 0) {
				oData.Photo = sapIcon;
			}
			var mEmployeeInfoData = {
				oEmpInfoData: [{
					pernr: oData.Pernr,
					pageId: oData.Pernr,
					header: "Employee Details",
					icon: oData.Photo,
					title: oData.Ename,
					description: oData.PosName,
					groups: [{
						heading: "Contact Details",
						elements: [{
							label: "Mobile",
							value: oData.Mobile,
							elementType: sap.m.QuickViewGroupElementType.mobile
						}, {
							label: "Phone",
							value: oData.Phone,
							elementType: sap.m.QuickViewGroupElementType.phone
						}, {
							label: "Email",
							value: oData.Email,
							emailSubject: '',
							elementType: sap.m.QuickViewGroupElementType.email
						}]
					}]
				}]
			};
			this._oQuickView.setModel(new sap.ui.model.json.JSONModel(mEmployeeInfoData), "empQuickView");
		} catch (e) {
			sap.m.MessageToast.show("Error !!!");
		}
	}

	/**
	 * Function handleErrorEmpInfo
	 * @return {} 
	 * @public
	 */
	function handleErrorEmpInfo(oData, oResponce, that) {
		try {
			this.setBusy(false);
			sap.m.MessageToast.show("Error while retreaving data !!!");
		} catch (e) {
			sap.m.MessageToast.show("Error !!!");
			this.setBusy(false);
		}
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
	 * Function validateQuickView
	 * @return {} 
	 * @public
	 */
	function validateQuickView(that, empNo) {
		try {
			return (that._oQuickView !== undefined && that._oQuickView.getModel("empQuickView").getData() !== undefined && that._oQuickView.getModel(
					"empQuickView").getData().oEmpInfoData !== undefined && that._oQuickView.getModel("empQuickView").getData().oEmpInfoData[0].pageId ===
				empNo);
		} catch (e) {
			return false;
		}
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
				} else if (result.indexOf("ZDD_SH_PERSON") === 0) {
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
			if (e.message.indexOf("adding element with duplicate id") !== -1) {
				if (sap.ui.getCore().byId(e.message.split("'")[1]) !== undefined) {
					sap.ui.getCore().byId(e.message.split("'")[1]).destroy();
				}
				sap.m.MessageToast.show("An error occurred, Please try again");
			} else {
				sap.m.MessageToast.show("Error !!!" + e.message);
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
			maxIncludeRanges: '2',
			supportRanges: false,
			supportRangesOnly: false,
			key: "pernr",
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
			reqestedField: "pernr",
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
	 * Function : manageColumns
	 * @public
	 */
	function manageColumns(oValueHelpDialog) {
		try {
			var nosCol = oValueHelpDialog.getTable().getColumns().length;
			for (var i = 0; i <= nosCol; i++) {
				oValueHelpDialog.getTable().getColumns()[i].setVisible((i < 2) ? true : sap.ui.Device.system.desktop);
			}
		} catch (e) {
			sap.m.MessageToast.show("Error !!!");
		}
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
				cols: [
					/*	{
						label: "Personnel number",
						template: "pernr",
					}, {
						label: "Employee name",
						template: "ename"
					}, */
					{
						/*					label: "First Name",
											template: "vorna"
										}, {
											label: "Last Name",
											template: "nachn"
										}, {*/
						label: "Email id",
						template: "email"
					}, {
						label: "Organizational unit",
						template: "OrgUnitDescription"
					}, {
						label: "Personnel area",
						template: "PersonnelAreaDescription"
					}, {
						label: "Personnel subarea",
						template: "PersonnelSubareaDescription"
					}
				]
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
					suggest: function (oEvent) {
						var sTerm = oEvent.getParameter("suggestValue");
						var filterId = oEvent.getSource().getId(),
							PropertyName;
						var aFilters = [];
						if (sTerm) {

							switch (filterId) {
							case 'searchInput1':
								aFilters.push(new Filter("pernr", sap.ui.model.FilterOperator.Contains, sTerm));
								break;
							case 'searchInput2':
								aFilters.push(new Filter("ename", sap.ui.model.FilterOperator.Contains, sTerm));
								break;
							case 'searchInput5':
								aFilters.push(new Filter("srch_email", sap.ui.model.FilterOperator.Contains, sTerm));
								break;
							case 'searchInput7':
								aFilters.push(new Filter("Persa", sap.ui.model.FilterOperator.Contains, sTerm));
								// aFilters.push(new Filter("Name1", sap.ui.model.FilterOperator.Contains, sTerm));
								break;
							case 'searchInput8':
								aFilters.push(new Filter("Persa", sap.ui.model.FilterOperator.Contains, sTerm));
								// aFilters.push(new Filter("Btext", sap.ui.model.FilterOperator.Contains, sTerm));
								break;
							}

							// aFilters.push(new Filter("pernr", sap.ui.model.FilterOperator.Contains, sTerm));
						}
						oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
						oEvent.getSource().setFilterSuggests(false);
					},
					suggestionItems: {
						path: aggPath,
						template: new sap.ui.core.Item({
							text: text,
							key: key
						})
					},
					/*liveChange: function () {
						if (this.getValue().length > 0) {
							this.bindAggregation("suggestionItems", aggPath, new sap.ui.core.Item({
								key: key,
								text: text
							}));
						}
					}*/
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
					new sap.ui.comp.filterbar.FilterGroupItem("searchInput9", {
						groupTitle: "empGrp",
						groupName: "gn1",
						name: "n9",
						label: "NRIC",
						control: new sap.m.Input({
							placeholder: "Enter NRIC"
						})
					}),
					getFilterItem("empGrp", "gn1", "n1", "Personnel number", "searchInput1", "Enter personnel number", "/EmpInfo", "{pernr}",
						"{pernr}"),
					getFilterItem("empGrp", "gn1", "n2", "Employee name", "searchInput2", "Enter employee name", "/EmpInfo", "{ename}", "{ename}"),
					getFilterItem("empGrp", "gn1", "n5", "Email id", "searchInput5", "Enter email id", "/EmpInfo", "{srch_email}", "{srch_email}"),
					new sap.ui.comp.filterbar.FilterGroupItem("searchInput6", {
						groupTitle: "empGrp",
						groupName: "gn1",
						name: "n6",
						label: "Organizational unit",
						control: new sap.m.Input({
							placeholder: "Enter organizational unit"
						})
					}),
					getFilterItem("empGrp", "gn1", "n7", "Personnel area", "searchInput7", "Enter personnel area", "/PArea", "{Persa}",
						"{Persa} - {Name1}"),
					getFilterItem("empGrp", "gn1", "n8", "Personnel subarea", "searchInput8", "Enter personnel subarea", "/PSArea", "{Persa}",
						"{Persa} - {Btext}")

					/*,
					getFilterItem("empGrp", "gn1", "n9", "NRIC", "searchInput9", "Search NRIC", "/EmpInfo", "{NricNumber}",
						"{NricNumber}")*/
				],
				search: function (oEvt) {
					var srchQuery = this._oBasicSearchField.getValue();
					var aFilters = [];
					if (srchQuery) {
						aFilters.push(new Filter({
							filters: [
								new Filter({
									path: "ename",
									operator: FilterOperator.Contains,
									value1: srchQuery
								}), new Filter({
									path: "pernr",
									operator: FilterOperator.Contains,
									value1: srchQuery
								}), new Filter({
									path: "srch_email",
									operator: FilterOperator.Contains,
									value1: srchQuery
								}),
								new Filter({
									path: "NricNumber",
									operator: FilterOperator.EQ,
									value1: srchQuery
								})
							],
							and: false
						}));
					} else {
						var oParams = oEvt.getParameter("selectionSet");
						var oNRIC = oParams[0].getValue();
						var oPernr = oParams[1].getValue();
						var oEname = oParams[2].getValue();
						var oEmail = oParams[3].getValue();
						var oOrgeh = oParams[4].getValue();
						var oWerks = oParams[5].getValue();
						var oBtrtl = oParams[6].getValue();

						aFilters = [
							new Filter({
								path: "NricNumber",
								operator: FilterOperator.Contains,
								value1: oNRIC
							}),
							new Filter({
								path: "pernr",
								operator: FilterOperator.Contains,
								value1: oPernr
							}),
							new Filter({
								path: "ename",
								operator: FilterOperator.Contains,
								value1: oEname
							}),
							new Filter({
								path: "orgeh",
								operator: FilterOperator.Contains,
								value1: oOrgeh
							}),
							new Filter({
								path: "werks",
								operator: FilterOperator.Contains,
								value1: oWerks
							}),
							new Filter({
								path: "PersonnelSubarea",
								operator: FilterOperator.Contains,
								value1: oBtrtl
							})
						];

						/*	aFilters = [new sap.ui.model.Filter("pernr", "Contains", oPernr), new sap.ui.model.Filter("ename", "Contains", oEname),
								new sap.ui.model.Filter("orgeh", "Contains", oOrgeh), new sap.ui.model.Filter("werks", "Contains", oWerks),
								new sap.ui.model.Filter("PersonnelSubarea", "Contains", oBtrtl), new sap.ui.model.Filter("NricNumber", "EQ", oNRIC)
							];*/
						if (oEmail !== "" && oEmail !== undefined) {
							aFilters.push(new Filter({
								path: "srch_email",
								operator: FilterOperator.Contains,
								value1: oEmail
							}));
							// aFilters.push(new sap.ui.model.Filter("srch_email", "Contains", oEmail));
						}
					}
					onValueHelpRequest(aFilters, oValueHelpDialog);
				}
			});
			return oFilterBar;
		} catch (e) {
			sap.m.MessageToast.show("Error in filter bar");
		}
	}
	/**
	 * Function setDialogModel
	 * @return {} 
	 * @public
	 */
	function setDialogModel(type) {
		if (type === "U") {
			return new sap.ui.model.json.JSONModel({
				"Title": " Information",
				"BodyText": "<p>1. Maximum file size to be upload is 2 MB.<br />2. Supported file types: PDF, JPG, PNG, JPEG.</p>",
				"BtnOkText": "CLOSE"
			});
		}
	}
	//End of Generic functions

}, /* bExport= */ true);