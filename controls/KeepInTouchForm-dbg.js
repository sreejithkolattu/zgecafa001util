sap.ui.define(["sap/ui/core/Control", "sap/ui/model/json/JSONModel", "zgecafa001util/zgecafa001util/controls/FormUtility"], function (
	Control, JSONModel, FormUtility) {
	"use strict";
	/**
	 * @author Swapnil Bandre (ODC)
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
				"lblWeWantToKeepInTouchWithYou": "We want to keep in Touch with you!",
				"lblThankYouNote": "Thanks for your dedication and contribution to the Home Team.",
				"lblHopeNote": "As you embark on the next phase of your life, we hope to continue keeping in contact with you.",
				"lblLetUsKnowNote": "Let us know how can we keep in touch with you?",
				"lblReceiveInformation": "Yes! I would like to receive regular email update on the latest news and happenings in the Home Team; and invitations to the Home Team events and get-togathers.",
				"lblPersonnelNumber": "Personnel Number:",
				"lblPersonnelEmailAddress": "Personnel Email Address:",
				"lblEmployeeName": "Employee Name:",
				"lblMobileNumber": "Mobile Number:",
				"phMobileNumber": "Sample : +65123456789",
				"lblVolunteer": "Yes! I would like volunteer with the HT and continue contributing to the safety and security of Singapore. Please select:",
				"lblArea": "Area",
				"lblVolunteerScheme": "Volunteer Scheme",
				"lblCommentment": "Commentment",
				"lblChoice": "Choice(S)",
				"lblCommunityPolicingAndCrimePrevention": "Community Policing / Crime Prevention : Outreach to keep my neighbourhood safe and secure",
				"lblVolunteerSpecial": "Volunteer Special Constabulary (Community)* *Below 60 Year old",
				"lbl8HoursAMonth": "8 hours a month",
				"lblCitizenOfPetrol": "Citizen of Petrol",
				"lbl2HoursAMonth": "2 hours a month",
				"lblCrimePreventionAmbassador": "Crime Prevention Ambassador",
				"lbl4-5HoursAMonth": "4-5 hours a month",
				"lblRehabilitationAndReintegration": "Rehabilitation & Reintegration: Make a difference in inmates' rehabilitation & reintegration through befriending programmes or Supporting the yellow Ribbon cause",
				"lblSpsBefrienders": "SPS Befrienders",
				"lbl2-3HoursAMonth": "2-3 hours a month",
				"lblYellowRibbonVolunteers": "Yellow Ribbon Volunteers",
				"lblAd-hocDuringYr": "Ad-hoc, during YR mont in September",
				"lblDrugs": "Drugs: Garner and raise support for a drug free",
				"lblAnti-DrugAbuse": "Anti-Drug Abuse Advocacy Network (A3 Network)",
				"lblAd-hoc": "Ad-hoc",
				"lblVisit": "Visit",
				"lblVisitUrl": "www.mha.gov.sg/htvn",
				"lblToFindOut": "to find out more about the volunteer opportunities available. Embark on an",
				"lblExtraordinaryMission": "Extraordinary Mission",
				"lblOpportunity": "Yes! If there is an opportunity, I would like to contribute these experience / Skill that I have to the HT:",
				"lblForntlineOperatior": "Forntline Operatior",
				"lblCommunicationandPublicEngagement": "Communication and Public Engagement",
				"lblTechnology": "Technology",
				"lblEnforcementIntellegenceInvestigations": "Enforcement, Intellegence & Investigations",
				"lblTrainingandDevelopment": "Training and Development",
				"lblOthers": "Others:",

				"oFlagPersonalDetailForm": false,
				"oFlagCheckBoxValidation": false,
				"oValuePersonNo": "",
				"oValueEmpName": "",
				"oValuePersonalEmail": "",
				"oValueMobileNumber": "",

				"bRegularEmail": false,
				"bVolunteer": false,
				"bVolunteerCommunity8Hrs": false,
				"bVolunteerCommunity2Hrs": false,
				"bVolunteerCommunity4Hrs": false,
				"bVolunteerRehab2Hrs": false,
				"bVolunteerRehabADhoc": false,
				"bVolunteerDrugsADhoc": false,
				"bYesIContribute": false,
				"bFrontOperation": false,
				"bCommunicationPublicEngagement": false,
				"bTechnology": false,
				"bEnforcementIntelligence": false,
				"bTrainingDevelopment": false,
				"bOthers": false
			});
			oModel.setProperty("/oFlagPersonalDetailForm", oPersonalDataFlag);
			oModel.setProperty("/oFlagCheckBoxValidation", oCheckBoxValidationFlag);
			if (oPersonalData) {
				oModel.setProperty("/oValuePersonNo", oPersonalData.PersonNo);
				oModel.setProperty("/oValueEmpName", oPersonalData.EmpName);
				oModel.setProperty("/oValuePersonalEmail", oPersonalData.PersonalEmail);
				oModel.setProperty("/oValueMobileNumber", oPersonalData.MobileNumber);
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
					"RegularEmail": _cbValueConversion(oKeepInTouchFormData.getProperty("/bRegularEmail")),
					"PersonNo": oKeepInTouchFormData.getProperty("/oValuePersonNo"),
					"PersonalEmail": oKeepInTouchFormData.getProperty("/oValuePersonalEmail"),
					"MobileNumber": oKeepInTouchFormData.getProperty("/oValueMobileNumber"),
					"Volunteer": _cbValueConversion(oKeepInTouchFormData.getProperty("/bVolunteer")),
					"VolunteerCommunity8Hrs": _cbValueConversion(oKeepInTouchFormData.getProperty("/bVolunteerCommunity8Hrs")),
					"VolunteerCommunity4Hrs": _cbValueConversion(oKeepInTouchFormData.getProperty("/bVolunteerCommunity4Hrs")),
					"VolunteerCommunity2Hrs": _cbValueConversion(oKeepInTouchFormData.getProperty("/bVolunteerCommunity2Hrs")),
					"VolunteerRehab2Hrs": _cbValueConversion(oKeepInTouchFormData.getProperty("/bVolunteerRehab2Hrs")),
					"VolunteerRehabADhoc": _cbValueConversion(oKeepInTouchFormData.getProperty("/bVolunteerRehabADhoc")),
					"VolunteerDrugsADhoc": _cbValueConversion(oKeepInTouchFormData.getProperty("/bVolunteerDrugsADhoc")),
					"YesIContribute": _cbValueConversion(oKeepInTouchFormData.getProperty("/bYesIContribute")),
					"FrontOperation": _cbValueConversion(oKeepInTouchFormData.getProperty("/bFrontOperation")),
					"CommunicationPublicEngagement": _cbValueConversion(oKeepInTouchFormData.getProperty("/bCommunicationPublicEngagement")),
					"Technology": _cbValueConversion(oKeepInTouchFormData.getProperty("/bTechnology")),
					"EnforcementIntelligence": _cbValueConversion(oKeepInTouchFormData.getProperty("/bEnforcementIntelligence")),
					"TrainingDevelopment": _cbValueConversion(oKeepInTouchFormData.getProperty("/bTrainingDevelopment")),
					"Others": _cbValueConversion(oKeepInTouchFormData.getProperty("/bOthers"))
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
			that.byId("ipEmail").setValue("");
			that.byId("ipMobileNo").setValue("");
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
		var formVisiblity = oModel.getProperty("/oFlagPersonalDetailForm");
		if (formVisiblity) {
			that.byId("ipEmail").attachChange(function (oEvent) {
				var that = this;
				if (oEvent.getParameters().newValue) {
					that.setValueState("None");
					that.getModel("keepInTouchFormModel").setProperty("/oValuePersonalEmail", oEvent.getParameters().newValue);
				}
			});
			that.byId("ipMobileNo").attachChange(function (oEvent) {
				var that = this;
				if (oEvent.getParameters().newValue) {
					that.setValueState("None");
					that.getModel("keepInTouchFormModel").setProperty("/oValueMobileNumber", oEvent.getParameters().newValue);
				}
			});
		}
		that.byId("cbEmail").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/bRegularEmail", true);
			}
		});
		that.byId("cbVolunteer").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/bVolunteer", true);
			}
		});
		that.byId("cbVolunteerCommunity8Hrs").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/bVolunteerCommunity8Hrs", true);
			}
		});
		that.byId("cbVolunteerCommunity2Hrs").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/bVolunteerCommunity2Hrs", true);
			}
		});
		that.byId("cbVolunteerCommunity4Hrs").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/bVolunteerCommunity4Hrs", true);
			}
		});
		that.byId("cbVolunteerRehab2Hrs").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/bVolunteerRehab2Hrs", true);
			}
		});
		that.byId("cbVolunteerRehabADhoc").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/bVolunteerRehabADhoc", true);
			}
		});
		that.byId("cbVolunteerDrugsADhoc").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/bVolunteerDrugsADhoc", true);
			}
		});
		that.byId("cbYesIContribute").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/bYesIContribute", true);
			}
		});
		that.byId("cbFrontOperation").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/FrontOperation", true);
			}
		});
		that.byId("cbCommunicationPublicEngagement").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/bCommunicationPublicEngagement", true);
			}
		});
		that.byId("cbTechnology").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.getModel("keepInTouchFormModel").setProperty("/bTechnology", true);
			}
		});
		that.byId("cbEnforcementIntelligence").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/bEnforcementIntelligence", true);
			}
		});
		that.byId("cbTrainingDevelopment").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/bTrainingDevelopment", true);
			}
		});
		that.byId("cbOthers").attachSelect(function (oEvent) {
			var that = this;
			if (oEvent.getParameter("selected") == true) {
				that.setValueState("None");
				that.getModel("keepInTouchFormModel").setProperty("/bOthers", true);
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