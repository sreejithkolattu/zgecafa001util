sap.ui.define(["sap/ui/core/Control", "sap/ui/model/json/JSONModel", "zgecafa001util/zgecafa001util/controls/FormUtility"], function (
	Control, JSONModel, FormUtility) {
	"use strict";
	/**
	 * @author Swapnil Bandre
	 * @version ${1.0}
	 * Date: May 21, 2019
	 */
	return {
		/**
		 * Function _setKeepInTouchFormData : Binding of Labels, text, Personal data of Keep In Touch Form
		 * @param {function} that : To get the current Object
		 * @param {function} oPersonalDataFlag : Boolean value : If TRUE will show the personal data Fileds else not
		 * @param {function} oCheckBoxValidationFlag : Boolean value : If TRUE will validate the check Box else not
		 * @param {function} oPersonalData : Object holding the Personal data.
		 * @return {JSON Model} : It Contains the Label, text, check-box default values & Personal data
		 * @public
		 */
		_setKeepInTouchFormData: function (that, oPersonalDataFlag, oCheckBoxValidationFlag, oPersonalData) {
			var oModel = new JSONModel({
				"LblWeWantToKeepInTouchWithYou": "We want to keep in Touch with you!",
				"LblThankYouNote": "Thanks for your dedication and contribution to the Home Team.",
				"LblHopeNote": "As you embark on the next phase of your life, we hope to continue keeping in contact with you.",
				"LblLetUsKnowNote": "Let us know how can we keep in touch with you?",
				"TxtReceiveInformation": "Yes! I would like to receive regular email update on the latest news and happenings in the Home Team; and invitations to the Home Team events and get-togathers.",
				"LblPersonnelNumber": "Personnel Number:",
				"LblPersonnelEmailAddress": "Personnel Email Address:",
				"LblEmployeeName": "Employee Name:",
				"LblMobileNumber": "Mobile Number:",
				"placeHolderMobileNumber": "Sample : +65123456789",
				"TxtVolunteer": "Yes! I would like volunteer with the HT and continue contributing to the safety and security of Singapore. Please select:",
				"LblArea": "Area",
				"LblVolunteerScheme": "Volunteer Scheme",
				"LblCommentment": "Commentment",
				"LblChoice": "Choice(S)",
				"LblCommunityPolicingAndCrimePrevention": "Community Policing / Crime Prevention : Outreach to keep my neighbourhood safe and secure",
				"LblVolunteerSpecial": "Volunteer Special Constabulary (Community)* *Below 60 Year old",
				"Lbl8HoursAMonth": "8 hours a month",
				"LblCitizenOfPetrol": "Citizen of Petrol",
				"Lbl2HoursAMonth": "2 hours a month",
				"LblCrimePreventionAmbassador": "Crime Prevention Ambassador",
				"Lbl4-5HoursAMonth": "4-5 hours a month",
				"LblRehabilitationAndReintegration": "Rehabilitation & Reintegration: Make a difference in inmates' rehabilitation & reintegration through befriending programmes or Supporting the yellow Ribbon cause",
				"LblSpsBefrienders": "SPS Befrienders",
				"Lbl2-3HoursAMonth": "2-3 hours a month",
				"LblYellowRibbonVolunteers": "Yellow Ribbon Volunteers",
				"LblAd-hocDuringYr": "Ad-hoc, during YR mont in September",
				"LblDrugs": "Drugs: Garner and raise support for a drug free",
				"LblAnti-DrugAbuse": "Anti-Drug Abuse Advocacy Network (A3 Network)",
				"LblAd-hoc": "Ad-hoc",
				"LblVisit": "Visit",
				"LblVisitUrl": "www.mha.gov.sg/htvn",
				"LblToFindOut": "to find out more about the volunteer opportunities available. Embark on an",
				"LblExtraordinaryMission": "Extraordinary Mission",
				"TxtOpportunity": "Yes! If there is an opportunity, I would like to contribute these experience / Skill that I have to the HT:",
				"LblForntlineOperatior": "Forntline Operatior",
				"LblCommunicationandPublicEngagement": "Communication and Public Engagement",
				"LblTechnology": "Technology",
				"LblEnforcementIntellegenceInvestigations": "Enforcement, Intellegence & Investigations",
				"LblTrainingandDevelopment": "Training and Development",
				"LblOthers": "Others:",

				"PersonalDetailForm": false,
				"CheckBoxValidation": false,
				"PersonNo": "",
				"EmpName": "",
				"PersonalEmail": "",
				"MobileNumber": "",

				"RegularEmail": false,
				"Volunteer": false,
				"VolunteerCommunity8Hrs": false,
				"VolunteerCommunity2Hrs": false,
				"VolunteerCommunity4Hrs": false,
				"VolunteerRehab2Hrs": false,
				"VolunteerRehabADhoc": false,
				"VolunteerDrugsADhoc": false,
				"YesIContribute": false,
				"FrontOperation": false,
				"CommunicationPublicEngagement": false,
				"Technology": false,
				"EnforcementIntelligence": false,
				"TrainingDevelopment": false,
				"Others": false
			});
			oModel.setProperty("/PersonalDetailForm", oPersonalDataFlag);
			oModel.setProperty("/CheckBoxValidation", oCheckBoxValidationFlag);
			if (oPersonalData) {
				oModel.setProperty("/PersonNo", oPersonalData.PersonNo);
				oModel.setProperty("/EmpName", oPersonalData.EmpName);
				oModel.setProperty("/PersonalEmail", oPersonalData.PersonalEmail);
				oModel.setProperty("/MobileNumber", oPersonalData.MobileNumber);
			}
			// Fragment Instantiation
			_handleFragmentView(that, oModel, "zgecafa001util.zgecafa001util.fragments.KeepInTouchForm");
		},

		/**
		 * Function _getKeepInTouchFormData : Get Keep In Touch Form Data
		 *  @param {function} that : To get the current Object
		 * @return {object : oKeepInTouchFormPayload} 
		 * @public
		 */
		_getKeepInTouchFormData: function (that) {
			if (FormUtility.ValidateForm(that)) {
				return;
			}
			var oKeepInTouchFormData = that.getModel("keepInTouchFormModel"),
				oKeepInTouchFormPayload = {
					"RegularEmail": _cbValueConversion(oKeepInTouchFormData.getProperty("/RegularEmail")),
					"PersonNo": oKeepInTouchFormData.getProperty("/PersonNo"),
					"PersonalEmail": oKeepInTouchFormData.getProperty("/PersonalEmail"),
					"MobileNumber": oKeepInTouchFormData.getProperty("/MobileNumber"),
					"Volunteer": _cbValueConversion(oKeepInTouchFormData.getProperty("/Volunteer")),
					"VolunteerCommunity8Hrs": _cbValueConversion(oKeepInTouchFormData.getProperty("/VolunteerCommunity8Hrs")),
					"VolunteerCommunity4Hrs": _cbValueConversion(oKeepInTouchFormData.getProperty("/VolunteerCommunity4Hrs")),
					"VolunteerCommunity2Hrs": _cbValueConversion(oKeepInTouchFormData.getProperty("/VolunteerCommunity2Hrs")),
					"VolunteerRehab2Hrs": _cbValueConversion(oKeepInTouchFormData.getProperty("/VolunteerRehab2Hrs")),
					"VolunteerRehabADhoc": _cbValueConversion(oKeepInTouchFormData.getProperty("/VolunteerRehabADhoc")),
					"VolunteerDrugsADhoc": _cbValueConversion(oKeepInTouchFormData.getProperty("/VolunteerDrugsADhoc")),
					"YesIContribute": _cbValueConversion(oKeepInTouchFormData.getProperty("/YesIContribute")),
					"FrontOperation": _cbValueConversion(oKeepInTouchFormData.getProperty("/FrontOperation")),
					"CommunicationPublicEngagement": _cbValueConversion(oKeepInTouchFormData.getProperty("/CommunicationPublicEngagement")),
					"Technology": _cbValueConversion(oKeepInTouchFormData.getProperty("/Technology")),
					"EnforcementIntelligence": _cbValueConversion(oKeepInTouchFormData.getProperty("/EnforcementIntelligence")),
					"TrainingDevelopment": _cbValueConversion(oKeepInTouchFormData.getProperty("/TrainingDevelopment")),
					"Others": _cbValueConversion(oKeepInTouchFormData.getProperty("/Others"))
				};
			return oKeepInTouchFormPayload;
		},

		/**
		 * Function _resetKeepInTouchFormData
		 * @param {function} that : To get the current Object
		 * Reset all the values in Keep In Touch Form to default
		 * @public
		 */
		_resetKeepInTouchFormData: function (that) {
			var modelToString = JSON.stringify(that.getModel("keepInTouchFormModel").getData()).replace(/true/g, false),
				oUpdatedKeepInTouchModel = JSON.parse(modelToString);
			that.getModel("keepInTouchFormModel").setData(oUpdatedKeepInTouchModel);
			that.byId("emailInput").setValue("");
			that.byId("mobileNoInput").setValue("");
			return;
		},
	};

	/**
	 * Function : _handleFragmentView
	 * @param {function} that : To get the current Object
	 * @param {function} oModel : Holds lables, Text & Data to be bind to fragment
	 * @param {function} fragment : freagment instatnce
	 * @public
	 */
	function _handleFragmentView(that, oModel, fragment) {
		if (!that._oKeepInTouchFragment) {
			that._oKeepInTouchFragment = sap.ui.xmlfragment(that.createId("KeepInTouchForm_FRAG"), fragment,
				that);
			that.getView().addDependent(that._oKeepInTouchFragment);
			that.getView().setModel(oModel, "keepInTouchFormModel");
		}
		// attach the Event to Check box
		_cbEventHandler(that, oModel);
	}

	/**
	 * Function : _cbEventHandler
	 * @param {function} that : To get the current Object
	 * @param {function} oModel : Depending on Check-Box action, update the respectives property values in Model
	 * @public
	 * Included Event handler: All the Check Box in Keep In Touch Form
	 */
	function _cbEventHandler(that, oModel) {
		var formVisiblity = oModel.getProperty("/PersonalDetailForm");
		if (formVisiblity) {
			that.byId("emailInput").attachChange(function (oEvent) {
				var that = this;
				if (oEvent.getParameters().newValue) {
					that.setValueState("None");
					that.getModel("keepInTouchFormModel").setProperty("/PersonalEmail", oEvent.getParameters().newValue);
				}
			});
			that.byId("mobileNoInput").attachChange(function (oEvent) {
				var that = this;
				if (oEvent.getParameters().newValue) {
					that.setValueState("None");
					that.getModel("keepInTouchFormModel").setProperty("/MobileNumber", oEvent.getParameters().newValue);
				}
			});
		}
		that.byId("cbEmailId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/RegularEmail", true);
			}
		});
		that.byId("cbVolunteerId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/Volunteer", true);
			}
		});
		that.byId("cbVolunteerCommunity8HrsId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/VolunteerCommunity8Hrs", true);
			}
		});
		that.byId("cbVolunteerCommunity2HrsId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/VolunteerCommunity2Hrs", true);
			}
		});
		that.byId("cbVolunteerCommunity4HrsId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/VolunteerCommunity4Hrs", true);
			}
		});
		that.byId("cbVolunteerRehab2HrsId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/VolunteerRehab2Hrs", true);
			}
		});
		that.byId("cbVolunteerRehabADhocId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/VolunteerRehabADhoc", true);
			}
		});
		that.byId("cbVolunteerDrugsADhocId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/VolunteerDrugsADhoc", true);
			}
		});
		that.byId("cbYesIContributeId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/YesIContribute", true);
			}
		});
		that.byId("cbFrontOperationId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/FrontOperation", true);
			}
		});
		that.byId("cbCommunicationPublicEngagementId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/CommunicationPublicEngagement", true);
			}
		});
		that.byId("cbTechnologyId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/Technology", true);
			}
		});
		that.byId("cbEnforcementIntelligenceId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/EnforcementIntelligence", true);
			}
		});
		that.byId("cbTrainingDevelopmentId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/TrainingDevelopment", true);
			}
		});
		that.byId("cbOthersId").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/Others", true);
			}
		});
	}

	/**
	 * Function : _cbValueConversion (Convertion of "True" value to "X" & "False" value to "".)
	 * @param {function} sValue : Check-Box Value (True or False)
	 * @returns {string} sValue : Either "X" or "".
	 * @public
	 */
	function _cbValueConversion(sValue) {
		if (sValue == true) {
			return "X";
		} else if (sValue == false) {
			return "";
		}
	}
}, /* bExport= */ true);