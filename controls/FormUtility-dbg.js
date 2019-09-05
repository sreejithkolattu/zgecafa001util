sap.ui.define(["jquery.sap.global", "sap/ui/core/Control"], function (jQuery, Control) {
	"use strict";
	/**
	 * @author Sreejith Ravindran
	 * @version ${1.0}
	 * Date: Nov 3, 2018
	 */
	return {
		/**
		 * Function 
		 * Format yyyy-mm-ddThh:mm:ss
		 * @param {function} format 
		 * @return {Date} 
		 * @public
		 */
		DateFormat: function (format) {
			return new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
		},
		/**
		 * Function : ValidateForm (that, formId)
		 * @param {function} that : To get the current Object
		 * @param {function} formId : Used to validate part of view/fragment.
		 *                            If formid is null, it will validate whole view
		 * @return {Boolean} : If validation is passed, it will return true
		 * @public
		 * The condition for each element is handled in function validateControl
		 * NOTE: id is mnadatory for those input field which are involved in this validataion
		 * Please maintain the ERROR_<element id> in properties file to display custom text for error
		 * or Try to use valuestate text in element level
		 * If implementing validation in form level, with fieldgroup id, check classname of metadata
		 * If we have to implement partial validation in view/fragment, use a specific nameing convention and 
		 * send the text which is common in id as formid.
		 */
		ValidateForm: function (that, formId) {
			var partValidation = formId !== undefined ? true : false;
			var isToSetFocusFlag = true;
			this.resetValidStates(that);
			var isInvalid = false;
			//#1: Validation for all inputs 
			var oControls = that.getView().getControlsByFieldGroupId("fgInput");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgInput")) {
						if (validateControl(oControl, "fgInputEntry")) {
							isInvalid = setErrorState(oControl, that);
							//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
						}
					}
				} catch (e) {}
			});
			//#2:Validation for RichText box
			//Rich text box is not havong property value state/Enable
			var oControls = that.getView().getControlsByFieldGroupId("fgRichText");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl._textAreaId !== undefined && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (oControl._textAreaId !== undefined && validateControl(oControl, "fgRichText")) {
						isInvalid = true;
						//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
					}
				} catch (e) {}
			});
			//#3:Validation for File uploader
			var oControls = that.getView().getControlsByFieldGroupId("fgFileUploader");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgFileUploaderEntry")) {
						isInvalid = setErrorState(oControl, that);
						//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
					}
				} catch (e) {}
			});
			//#4: Validation for all select/combo
			oControls = that.getView().getControlsByFieldGroupId("fgSelect");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgSelect")) {
						if (validateControl(oControl, "fgSelectEntry")) {
							isInvalid = setErrorState(oControl, that);
							//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
			//#5: Validation for all select/combo - Validate only Value not key
			oControls = that.getView().getControlsByFieldGroupId("fgSelectValue");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgSelectValue")) {
						if (validateControl(oControl, "fgSelectValueEntry")) {
							isInvalid = setErrorState(oControl, that);
							//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
			//#6: Validation for Checkbox
			oControls = that.getView().getControlsByFieldGroupId("fgCheckBox");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgCheckBoxEntry")) {
						isInvalid = setErrorStateOnly(oControl, that);
						//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
					}
				} catch (e) {}
			});
			//#7: Validation for Radio button
			oControls = that.getView().getControlsByFieldGroupId("fgRadioButton");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgRadioButtonEntry")) {
						isInvalid = setErrorStateOnly(oControl, that);
						//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
					}
				} catch (e) {}
			});
			//#8: Validation for radio button group
			oControls = that.getView().getControlsByFieldGroupId("fgRadioButtonGroup");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgRadioButtonGroupEntry")) {
						isInvalid = setErrorStateOnly(oControl, that);
						//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
					}

				} catch (e) {}
			});
			//#9: Validation for multi select
			// The validation is similar to select box
			oControls = that.getView().getControlsByFieldGroupId("fgMultiSelect");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgSelect")) {
						if (validateControl(oControl, "fgMultiSelectEntry")) {
							isInvalid = setErrorState(oControl, that);
							//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
			//#10: Validation for date
			oControls = that.getView().getControlsByFieldGroupId("fgDate");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (oControl.getVisible() && oControl.getEnabled() && oControl.getValueState() !== "Error" && oControl.getRequired()) {
						if (oControl.getDateValue() === "" || oControl.getDateValue() === null || oControl.getDateValue() === undefined) {
							isInvalid = setErrorState(oControl, that);
							//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
			//#11: Validation for email
			oControls = that.getView().getControlsByFieldGroupId("fgEmail");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgEmail")) {
						if (oControl.getRequired()) {
							if (validateControl(oControl, "fgEmailEntryReq")) {
								isInvalid = setErrorState(oControl, that);
								//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
							}
						} else if (oControl.getValue().length > 0) {
							if (validateControl(oControl, "fgEmailEntry")) {
								isInvalid = setErrorState(oControl, that);
								//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
							}
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
			//#12: Validation for DateRange
			var oControls = that.getView().getControlsByFieldGroupId("fgDateRange");
			for (var vStart in oControls) {
				try {
					if (partValidation && oControls[vStart].getId().indexOf(formId) === -1) {
						break;
					}
					if (isValidControl(oControls[vStart]) && isValidDate(oControls[vStart], "Start") && oControls[vStart].getRequired()) {
						if (oControls[vStart].getDateValue() === null) {
							setDateErrorState(oControls[vStart], "EMPTY");
							isInvalid = true;
							break;
						}
						var vFlag = oControls[vStart].getId().split("dpStart");
						var isInvalidRange;
						for (var vEnd in oControls) {
							if (isValidControl(oControls[vEnd]) && isValidDate(oControls[vStart], "Start") && oControls[vEnd].getId() === vFlag[0] + "dpEnd" +
								vFlag[1] && oControls[vEnd].getRequired()) {
								if (oControls[vEnd].getDateValue() === null) {
									setDateErrorState(oControls[vEnd], "EMPTY");
									isInvalid = true;
									break;
								}
								isInvalidRange = oControls[vStart].getDateValue() > oControls[vEnd].getDateValue();
								break;
							}
						};
						if (isInvalidRange) {
							setDateErrorState(oControls[vStart], "SG");
							setDateErrorState(oControls[vEnd], "EL");
							isInvalid = true;
						}

					}
				} catch (e) {}
			}

			//#13: Validation for Mobile number fgMobile
			oControls = that.getView().getControlsByFieldGroupId("fgMobile");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgMobile")) {
						if (oControl.getRequired()) {
							if (validateControl(oControl, "fgMobileEntryReq")) {
								isInvalid = setErrorState(oControl, that);
								//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
							}
						} else if (oControl.getValue().length > 0) {
							if (validateControl(oControl, "fgMobileEntry")) {
								isInvalid = setErrorState(oControl, that);
								//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
							}
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
			//#14: Validation for Currency
			oControls = that.getView().getControlsByFieldGroupId("fgCurrency");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgCurrency")) {
						if (oControl.getValue().length > 0) {
							if (validateControl(oControl, "fgCurrencyEntry")) {
								isInvalid = setErrorState(oControl, that);
								//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
							}
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
			//#15: Validation for number
			oControls = that.getView().getControlsByFieldGroupId("fgNumber");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgNumber")) {
						if (oControl.getRequired()) {
							if (validateControl(oControl, "fgNumberEntryReq")) {
								isInvalid = setErrorState(oControl, that);
								//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
							}
						} else if (oControl.getValue().length > 0) {
							if (validateControl(oControl, "fgNumberEntry")) {
								isInvalid = setErrorState(oControl, that);
								//isToSetFocusFlag = isToSetFocusFlag ? setFocus(oControl) : isToSetFocusFlag;
							}
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
			var test = true;
			if (isInvalid) {
				oControls = that.getView().getControlsByFieldGroupId();
				for (var i = 0; i < oControls.length; i++) {
					if (oControls[i].getValueState() === "Error") {
						setFocus(oControls[i]);
						break;
					}
				}
			}

			return isInvalid;
		},

		/**
		 * Function : resetValidStates (that)
		 * @param {function} that 
		 * @return {Date} 
		 * @public
		 * This will reset all the error state in the control
		 */
		resetValidStates: function (that) {
			var fields = ["fgInput", "fgSelect", "fgDate", "fgEmail", "fgSelectValue", "fgNumber", "fgMobile", "fgCheckBox", "fgMultiSelect",
				"fgRadioButtonGroup",
				"fgRadioButton", "fgCurrency", "fgDateRange", "fgFileUploader"
			];
			fields.forEach(function (field) {
				var oControls = that.getView().getControlsByFieldGroupId(field);
				oControls.forEach(function (oControl) {
					resetErrorState(oControl);
				});
			});
		}
	};

	//============================================================================================================
	//------------------------------------------------------------------------------------------------------------
	//                Generic Functions for Element utility 
	//------------------------------------------------------------------------------------------------------------

	/**
	 * Function validateControl (oControl, cType)
	 * @param {function} oControl 
	 * @param {function} cType 
	 * @return {Boolean} 
	 * @public
	 *  
	 */
	function validateControl(oControl, cType) {
		if (cType === "fgInput" && isValidControl(oControl)) { // Apply for controls : Required / Visible / Enabled
			return (oControl.getRequired() && oControl.getValueState() !== "Error");
		} else if (cType === "fgRichText" && oControl.getVisible() && oControl.getEditable() && oControl.getRequired()) { // Apply for controls : Required / Visible / Editable
			return (oControl.getValue() === undefined || oControl.getValue().trim() === "");
		} else if ((cType === "fgSelect" || cType === "fgSelectValue" || cType === "fgMobile" || cType === "fgEmail" || cType === "fgNumber" ||
				cType === "fgCurrency" || cType === "fgDate") &&
			isValidControl(oControl)) { // Checks : Field is empty
			return (oControl.getValueState() !== "Error");
		} else if (cType === "fgFileUploaderEntry" && isValidControl(oControl)) { // Apply for controls :  Visible / Enabled
			return (oControl.getValue() === undefined || oControl.getValue().trim() === "");
		} else if (cType === "fgInputEntry" && isValidControl(oControl)) { // Apply for controls :  Visible / Enabled
			return (oControl.getValue() === undefined || oControl.getValue().trim() === "");
		} else if (cType === "fgSelectEntry" && isValidControl(oControl)) { // Checks : Selected index is 00 or undefined
			return (oControl.getSelectedItemId() === "" || oControl.getSelectedKey() === "" || oControl.getSelectedKey() === undefined);
		} else if (cType === "fgSelectValueEntry" && isValidControl(oControl)) {
			return (oControl.getValue() === "" || oControl.getValue() === undefined);
		} else if (cType === "fgMultiSelectEntry" && isValidControl(oControl)) { // Checks : Selected index is 00 or undefined
			return (oControl.getSelectedKeys() === "" || oControl.getSelectedKeys() === undefined);
		} else if (cType === "fgCheckBoxEntry" && isValidControl(oControl)) { // Checks : Selected 
			return (oControl.getSelected() === false);
		} else if (cType === "fgRadioButtonEntry" && isValidControl(oControl)) { // Checks : 
			return (oControl.getSelected() === false);
		} else if (cType === "fgRadioButtonGroupEntry" && isValidControl(oControl)) { // Checks : 
			return (oControl.getSelectedIndex() === -1);
		} else if (cType === "fgMobileEntryReq" && isValidControl(oControl)) { // Checks : mobile format and empty
			return isValidControlEntry(oControl, "mobile");
		} else if (cType === "fgMobileEntry" && isValidControl(oControl)) { // Checks : mobile format if not empty
			return (!getPattern("mobile").test(oControl.getValue()));
		} else if (cType === "fgEmailEntryReq" && isValidControl(oControl)) { // Checks : email format and empty
			return isValidControlEntry(oControl, "email");
		} else if (cType === "fgEmailEntry" && isValidControl(oControl)) { // Checks : email format if not empty
			return (!getPattern("email").test(oControl.getValue()));
		} else if (cType === "fgNumberEntryReq" && isValidControl(oControl)) { // Checks : number format and empty
			return isValidControlEntry(oControl, "Numaric");
			/*} else if (cType === "fgCurrencyEntry" && isValidControl(oControl)) { // Checks : number format if not empty
				return ( isValidControl(oControl)) logic for min and max validation );*/
		} else if (cType === "fgNumberEntry" && isValidControl(oControl)) { // Checks : number format if not empty
			return (!getPattern("Numaric").test(oControl.getValue()));
		} else if (cType === "fgDateEntry" && isValidControl(oControl)) { // Checks : date
			return (oControl.getValue() === undefined || oControl.getDateValue().trim() === "" || oControl.getDateValue() === null || oControl.getDateValue() ===
				undefined);
		}
	}
	/**
	 * Function isValidControl (oControl)
	 * @param {function} oControl 
	 * @return {Boolean} 
	 * @public
	 * This validate the control properties Visible and Enabled
	 * Modified to validate enabld to check
	 */
	function isValidControl(oControl) {
		try {
			return (oControl.getVisible()) ? (oControl.getEnabled() && oControl.getEditable()) : false;
		} catch (e) {
			return true; //In exception, allow entry validation
		}

	}

	function isValidDate(oControl, dType) {
		try {
			if (dType === "Start") {
				return isValidControl(oControl) && oControl.getId().indexOf("dpStart") !== -1 && oControl.getMetadata().getElementName() ===
					"sap.m.DatePicker";
			} else if (dType === "End") {
				return isValidControl(oControl) && oControl.getMetadata().getElementName() === "sap.m.DatePicker";
			}
		} catch (e) {
			return true; //In exception, allow entry validation
		}
	}
	/**
	 * Function isValidControlEntry (oControl,pattern)
	 * @param {function} oControl 
	 * @param {function} pattern 
	 * @return {Boolean} 
	 * @public
	 * This validate the value of the element
	 */
	function isValidControlEntry(oControl, pattern) {
		try {
			return (oControl.getValue() === undefined || oControl.getValue().trim() === "" || !getPattern(pattern).test(oControl.getValue()));
		} catch (e) {
			return false; //In exception, Follow strict entry validation
		}
	}
	/**
	 * Function setFocus (oControl)
	 * @param {function} oControl 
	 * @return {Boolean} 
	 * @public
	 * This set the focus to the element.
	 * This function calls during error validation
	 */
	function setFocus(oControl) {
		try {
			oControl.focus();
			return false;
		} catch (e) {
			return true;
		}
	}
	/**
	 * Function getErrorMessage (id, that)
	 * @param {function} id 
	 * @param {function} that 
	 * @return {string} 
	 * @public
	 * This return the error message which displays in UI element error state
	 */
	function getErrorMessage(id, that) {
		try {
			var errorMessage = "ERROR_";
			if (id !== null && id !== undefined) {
				var tempid = id.split("--")[id.split("--").length - 1];
				errorMessage += tempid;
			}
			errorMessage = that.getResourceBundle().getText(errorMessage);
			errorMessage = errorMessage.indexOf("ERROR_") === 0 ? that.getResourceBundle().getText("ERROR_GENERIC") : errorMessage;
			errorMessage = errorMessage.indexOf("ERROR_") === 0 ? "Invalid Entry" : errorMessage;
			return errorMessage;
		} catch (e) {
			return "Invalid Entry";
		}
	}

	/**
	 * Function (oControl, that)
	 * @param {function} oControl 
	 * @param {function} that 
	 * @return {Boolean} 
	 * @public
	 */
	function setErrorState(oControl, that) {
		try {
			oControl.setValueState("Error");
			if (oControl.getValueStateText() !== undefined && oControl.getValueStateText() !== "" && oControl.getValueStateText().length > 1) {
				oControl.setValueStateText(oControl.getValueStateText());
			} else {
				oControl.setValueStateText(getErrorMessage(oControl.getId(), that));
			}

			return true;
		} catch (e) {}
	}

	function setErrorStateOnly(oControl, that) {
		try {
			oControl.setValueState("Error");
			return true;
		} catch (e) {}
	}

	function setDateErrorState(oControl, type) {
		try {
			var msg = "";
			if (type === "SG") {
				msg = "Start date is greater than End date";
			} else if (type === "EL") {
				msg = "End date is lower than Start date";
			} else {
				msg = "Invalid date";
			}
			oControl.setValueState("Error");
			oControl.setValueStateText(msg);
			return true;
		} catch (e) {}
	}
	/**
	 * Function (oControl)
	 * @param {function} oControl 
	 * @return {void} 
	 * @public
	 */
	function resetErrorState(oControl) {
		try {
			if (oControl.getValueState() === "Error" && oControl.getVisible() && oControl.getEnabled()) {
				oControl.setValueState("None");
				oControl.setValueStateText("");
			}
		} catch (e) {}
	}

	/**
	 * Function 
	 * @param {function} patternName 
	 * @return {void} 
	 * @public
	 */
	function getPattern(patternName) {
		if (patternName === "Numaric") {
			return /^\d+$/;
		} else if (patternName === "email") {
			return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		} else if (patternName === "mobile") {
			return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8,10}$/g;
		} else if (patternName === "Empty") {
			return /\S+/;
		} else if (patternName === "Decimal") {
			return /\S+/;
		}
	}

}, /* bExport= */ true);