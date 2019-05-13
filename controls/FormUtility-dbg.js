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
		 * Included validations:
		 * fgInput,fgSelect,fgDate,fgEmail,fgNumber
		 * The condition for each element is handled in function validateControl
		 * NOTE: id is mnadatory for those input field which are invilved in this validataion
		 * Please maintain the ERROR_<element id> in properties file to display custom text for error
		 */
		ValidateForm: function (that, formId) {
			var partValidation = formId !== undefined ? true : false;
			var isToSetFocusFlag = true;
			this.resetValidStates(that);
			var isInvalid = false;
			//Validation for all inputs box
			var oControls = that.getView().getControlsByFieldGroupId("fgInput");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgInput")) {
						if (validateControl(oControl, "fgInputEntry")) {
							isInvalid = setErrorState(oControl, that);
							isToSetFocusFlag = isToSetFocusFlag?setFocus(oControl):isToSetFocusFlag;
						}
					}
				} catch (e) {}
			});
			//Validation for all select/combo
			oControls = that.getView().getControlsByFieldGroupId("fgSelect");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgSelect")) {
						if (validateControl(oControl, "fgSelectEntry")) {
							isInvalid = setErrorState(oControl, that);
							isToSetFocusFlag = isToSetFocusFlag?setFocus(oControl):isToSetFocusFlag;
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
			//Validation for Checkbox
			oControls = that.getView().getControlsByFieldGroupId("fgCheckBox");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgCheckBoxEntry")) {
						isInvalid = setErrorStateOnly(oControl, that);
						isToSetFocusFlag = isToSetFocusFlag?setFocus(oControl):isToSetFocusFlag;
					}
				} catch (e) {}
			});
			//Validation for Radio button
			oControls = that.getView().getControlsByFieldGroupId("fgRadioButton");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgRadioButtonEntry")) {
						isInvalid = setErrorStateOnly(oControl, that);
						isToSetFocusFlag = isToSetFocusFlag?setFocus(oControl):isToSetFocusFlag;
					}
				} catch (e) {}
			});
			//Validation for radio button group
			oControls = that.getView().getControlsByFieldGroupId("fgRadioButtonGroup");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgRadioButtonGroupEntry")) {
						isInvalid = setErrorStateOnly(oControl, that);
						isToSetFocusFlag = isToSetFocusFlag?setFocus(oControl):isToSetFocusFlag;
					}

				} catch (e) {}
			});
			//Validation for multi select
			oControls = that.getView().getControlsByFieldGroupId("fgMultiSelect");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (validateControl(oControl, "fgSelect")) {
						if (validateControl(oControl, "fgMultiSelectEntry")) {
							isInvalid = setErrorState(oControl, that);
							isToSetFocusFlag = isToSetFocusFlag?setFocus(oControl):isToSetFocusFlag;
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
			//Validation for date
			oControls = that.getView().getControlsByFieldGroupId("fgDate");
			oControls.forEach(function (oControl) {
				try {
					if (partValidation && oControl.getId().indexOf(formId) === -1) {
						return;
					}
					if (oControl.getVisible() && oControl.getEnabled() && oControl.getValueState() !== "Error") {
						if (oControl.getDateValue() === "" || oControl.getDateValue() === null || oControl.getDateValue() === undefined) {
							isInvalid = setErrorState(oControl, that);
							isToSetFocusFlag = isToSetFocusFlag?setFocus(oControl):isToSetFocusFlag;
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
			//Validation for email
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
								isToSetFocusFlag = isToSetFocusFlag?setFocus(oControl):isToSetFocusFlag;
							}
						} else if (oControl.getValue().length > 0) {
							if (validateControl(oControl, "fgEmailEntry")) {
								isInvalid = setErrorState(oControl, that);
								isToSetFocusFlag = isToSetFocusFlag?setFocus(oControl):isToSetFocusFlag;
							}
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
			//Validation for DateRange
			var oControls = that.getView().getControlsByFieldGroupId("fgDateRange");
			for (var vStart in oControls) {
				if (isValidDate(oControls[vStart],"Start")) {
					var vFlag = oControls[vStart].getId().split("dpStart");
					var isInvalidRange;
					for (var vEnd in oControls) {
						if (isValidDate(oControls[vStart],"Start") && oControls[vEnd].getId() === vFlag[0]+"dpEnd"+vFlag[1]) {
							isInvalidRange = oControls[vStart]._getSelectedDate() > oControls[vEnd]._getSelectedDate();
							break;
						}
					};
					if(isInvalidRange){
						oControls[vStart].setValueState("Error");
						oControls[vStart].setValueStateText("Start date is greater than End date");
						oControls[vEnd].setValueState("Error");
						oControls[vEnd].setValueStateText("End date is lower than Start date");
					}

				}
			}
			//Validation for Mobile number fgMobile
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
								isToSetFocusFlag = isToSetFocusFlag?setFocus(oControl):isToSetFocusFlag;
							}
						} else if (oControl.getValue().length > 0) {
							if (validateControl(oControl, "fgMobileEntry")) {
								isInvalid = setErrorState(oControl, that);
								isToSetFocusFlag = isToSetFocusFlag?setFocus(oControl):isToSetFocusFlag;
							}
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
			//Validation for number
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
								isToSetFocusFlag = isToSetFocusFlag?setFocus(oControl):isToSetFocusFlag;
							}
						} else if (oControl.getValue().length > 0) {
							if (validateControl(oControl, "fgNumberEntry")) {
								isInvalid = setErrorState(oControl, that);
								isToSetFocusFlag = isToSetFocusFlag?setFocus(oControl):isToSetFocusFlag;
							}
						}
					} else if (oControl.getValueState() === "Error") {
						isInvalid = true;
					}
				} catch (e) {}
			});
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
			var fields = ["fgInput", "fgSelect", "fgDate", "fgEmail", "fgNumber", "fgMobile","fgCheckBox","fgMultiSelect","fgRadioButtonGroup","fgRadioButton"];
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
		} else if ((cType === "fgSelect" || cType === "fgMobile"|| cType === "fgEmail" || cType === "fgNumber" || cType === "fgDate") && isValidControl(oControl)) { // Checks : Field is empty
			return (oControl.getValueState() !== "Error");
		} else if (cType === "fgInputEntry" && isValidControl(oControl)) { // Apply for controls :  Visible / Enabled
			return (oControl.getValue() === undefined || oControl.getValue().trim() === "");
		} else if (cType === "fgSelectEntry" && isValidControl(oControl)) { // Checks : Selected index is 00 or undefined
			return (oControl.getSelectedItemId()=== "" || oControl.getSelectedKey() === "" || oControl.getSelectedKey() === undefined);
		} else if (cType === "fgMultiSelectEntry" && isValidControl(oControl)) { // Checks : Selected index is 00 or undefined
			return (oControl.getSelectedKeys() === "" || oControl.getSelectedKeys() === undefined);	
		} else if (cType === "fgCheckBoxEntry" && isValidControl(oControl)) { // Checks : Selected 
			return (oControl.getSelected() === false );
		} else if (cType === "fgRadioButtonEntry" && isValidControl(oControl)) { // Checks : 
			return (oControl.getSelected() === false );	
		} else if (cType === "fgRadioButtonGroupEntry" && isValidControl(oControl)) { // Checks : 
			return (oControl.getSelectedIndex() === -1 );
		} else if (cType === "fgMobileEntryReq" && isValidControl(oControl)) { // Checks : email format and empty
			return isValidControlEntry(oControl, "mobile");
		} else if (cType === "fgMobileEntry" && isValidControl(oControl)) { // Checks : email format if not empty
			return (!getPattern("mobile").test(oControl.getValue()));	
		} else if (cType === "fgEmailEntryReq" && isValidControl(oControl)) { // Checks : email format and empty
			return isValidControlEntry(oControl, "email");
		} else if (cType === "fgEmailEntry" && isValidControl(oControl)) { // Checks : email format if not empty
			return (!getPattern("email").test(oControl.getValue()));
		} else if (cType === "fgNumberEntryReq" && isValidControl(oControl)) { // Checks : number format and empty
			return isValidControlEntry(oControl, "Numaric");
		} else if (cType === "fgNumberEntry" && isValidControl(oControl)) { // Checks : number format if not empty
			return (!getPattern("Numaric").test(oControl.getValue()));
		} else if (cType === "fgDateEntry" && isValidControl(oControl)) { // Checks : date
			return (oControl.getValue() === undefined || oControl.getDateValue().trim() === "" || oControl.getDateValue() === null || oControl.getDateValue() === undefined);
		}
	}
	/**
	 * Function isValidControl (oControl)
	 * @param {function} oControl 
	 * @return {Boolean} 
	 * @public
	 * This validate the control properties Visible and Enabled
	 */
	function isValidControl(oControl) {
		try {
			return oControl.getEnabled() && oControl.getVisible();
		} catch (e) {
			return true; //In exception, allow entry validation
		}
	}
	function isValidDate(oControl,dType) {
		try {
			if(dType==="Start"){
				return isValidControl(oControl) && oControl.getId().indexOf("dpStart") !== -1 && oControl.getMetadata().getElementName() === "sap.m.DatePicker";
			}else if(dType==="End"){
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
			oControl.setValueStateText(getErrorMessage(oControl.getId(), that));
			return true;
		} catch (e) {}
	}
	function setErrorStateOnly(oControl, that) {
		try {
			oControl.setValueState("Error");
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
		} else if (patternName === "mobile"){
			return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8,10}$/g;
		} else if (patternName === "Empty") {
			return /\S+/;
		} else if (patternName === "Decimal") {
			return /\S+/;
		}
	}

}, /* bExport= */ true);