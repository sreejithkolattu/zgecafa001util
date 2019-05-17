sap.ui.define(["jquery.sap.global",
	"sap/ui/core/Control",
	"zgecafa001util/zgecafa001util/controls/FormUtility"
], function (jQuery, Control, FormUtility) {
	"use strict";
	/**
	 * @author Swapnil Bandre
	 * @version ${1.0}
	 * Date: May 17, 2019
	 */
	return {
		/**
		 * Function _setKeepInTouchFormData : Binding of Labels, text of Keep In Touch Form
		 * @param {function} freagInst : To get the current Object
		 * model : model assigned to dialog; if not assigned then create the model
		 * @public
		 */
		_setKeepInTouchFormData: function (fragInst, model, fragmentId) {
			var that = fragInst;
			// Model Instatiation
			model = (model !== null && model !== undefined) ? model : _setKeepInTouchFormModel();
			// Fragment Creation
			_handleDialog(fragInst, model, "zgecafa001util.zgecafa001util.fragments.KeepInTouchForm", fragmentId);
			_cbEventHandler(that);
		},

		/**
		 * Function _getKeepInTouchFormData : Get Keep In Touch Form Data
		 * @param {function} freagInst : To get the current Object
		 * @return {object : oKeepInTouchFormPayload} 
		 * @public
		 */
		_getKeepInTouchFormData: function (fragInst) {
			var that = fragInst;
			if (FormUtility.ValidateForm(fragInst)) {
				return;
			}
			var oKeepInTouchFormData = that.getModel("keepInTouchFormModel"),
				oKeepInTouchFormPayload = {
					"RegularEmail": _checkedBoXValue(oKeepInTouchFormData.getProperty("/RegularEmail")),
					"Volunteer": _checkedBoXValue(oKeepInTouchFormData.getProperty("/Volunteer")),
					"VolunteerCommunity8Hrs": _checkedBoXValue(oKeepInTouchFormData.getProperty("/VolunteerCommunity8Hrs")),
					"VolunteerCommunity4Hrs": _checkedBoXValue(oKeepInTouchFormData.getProperty("/VolunteerCommunity4Hrs")),
					"VolunteerCommunity2Hrs": _checkedBoXValue(oKeepInTouchFormData.getProperty("/VolunteerCommunity2Hrs")),
					"VolunteerRehab2Hrs": _checkedBoXValue(oKeepInTouchFormData.getProperty("/VolunteerRehab2Hrs")),
					"VolunteerRehabADhoc": _checkedBoXValue(oKeepInTouchFormData.getProperty("/VolunteerRehabADhoc")),
					"VolunteerDrugsADhoc": _checkedBoXValue(oKeepInTouchFormData.getProperty("/VolunteerDrugsADhoc")),
					"YesIContribute": _checkedBoXValue(oKeepInTouchFormData.getProperty("/YesIContribute")),
					"FrontOperation": _checkedBoXValue(oKeepInTouchFormData.getProperty("/FrontOperation")),
					"CommunicationPublicEngagement": _checkedBoXValue(oKeepInTouchFormData.getProperty("/CommunicationPublicEngagement")),
					"Technology": _checkedBoXValue(oKeepInTouchFormData.getProperty("/Technology")),
					"EnforcementIntelligence": _checkedBoXValue(oKeepInTouchFormData.getProperty("/EnforcementIntelligence")),
					"TrainingDevelopment": _checkedBoXValue(oKeepInTouchFormData.getProperty("/TrainingDevelopment")),
					"Others": _checkedBoXValue(oKeepInTouchFormData.getProperty("/Others"))
				};
			return oKeepInTouchFormPayload;
		},

		/**
		 * Function _resetKeepInTouchFormData
		 * @param {function} freagInst : To get the current Object
		 * Reset all the values in Keep In Touch Form to default
		 * @public
		 */
		_resetKeepInTouchFormData: function (fragInst) {
			var that = fragInst,
				modelToString = JSON.stringify(that.getModel("keepInTouchFormModel").getData()).replace(/true/g, false),
				oUpdatedKeepInTouchModel = JSON.parse(modelToString);
			that.getModel("keepInTouchFormModel").setData(oUpdatedKeepInTouchModel);
		},
	};

	/**
	 * Function : _setKeepInTouchFormModel
	 * @param {function} 
	 * @return {JSON Model} : It Contains the Label, text & check-box default values
	 * @public
	 */
	function _setKeepInTouchFormModel() {
		return new sap.ui.model.json.JSONModel({
			"LblWeWantToKeepInTouchWithYou": "We want to keep in Touch with you!",
			"LblThankYouNote": "Thanks for your dedication and contribution to the Home Team.",
			"LblHopeNote": "As you embark on the next phase of your life, we hope to continue keeping in contact with you.",
			"LblLetUsKnowNote": "Let us know how can we keep in touch with you?",
			"TxtReceiveInformation": "Yes! I would like to receive regular email update on the latest news and happenings in the Home Team; and invitations to the Home Team events and get-togathers.",
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
	}

	/**
	 * Function : _handleDialog
	 * @param {function} that : To get the current Object
	 * fragment : freagment instatnce
	 * @public
	 */
	function _handleDialog(that, model, fragment, fragmentId) {
		if (that._oDialog !== undefined) {
			try {
				that._oDialog.destroy();
				that._oDialog = undefined;
			} catch (e) {}
		}
		fragmentId = (fragmentId !== "" && fragmentId !== undefined) ? fragmentId : "KeepInTouchForm_FRAG";
		that._oDialog = sap.ui.xmlfragment(that.createId(fragmentId), fragment, that);
		that.getView().addDependent(that._oDialog);
		jQuery.sap.syncStyleClass("sapUiSizeCompact", that.getView(), that._oDialog);
		that.getOwnerComponent().setModel(model, "keepInTouchFormModel");
		that.getOwnerComponent().setModel("keepInTouchFormModel").updateBindings(true);
	}

	/**
	 * Function : _cbEventHandler (that)
	 * @param {function} that : To get the current Object
	 * 
	 * @return {Boolean} : If Check box is checked, it will return true
	 * @public
	 * 
	 * Included Event handler: All the Check Box in Keep In Touch Form
	 */
	function _cbEventHandler(that) {
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
	 * Convert the "True" value to "X" & "False" value to "".
	 * @public
	 * @param {string} sValue the boolean to converted
	 * @returns {string} sValue with either "X" or "".
	 */
	function _checkedBoXValue(sValue) {
		if (sValue == true) {
			return "X";
		} else if (sValue == false) {
			return "";
		}
	}
}, /* bExport= */ true);