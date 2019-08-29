sap.ui.define(["jquery.sap.global","sap/ui/core/Control"],function(e,n){"use strict";return{handleCancelWarningDialog:function(e,n,a){n=n!==null&&n!==undefined?n:o("W");t(e,n,"zgecafa001util.zgecafa001util.fragments.GenericConfirm",a,"btnNo","btnYes")},handleSuccessDialog:function(e,n,a){n=n!==null&&n!==undefined?n:o("S");t(e,n,"zgecafa001util.zgecafa001util.fragments.GenericSuccess",a,"btnOk",null)},handleRemarksDialog:function(e,n,a){n=n!==null&&n!==undefined?n:o("RE");t(e,n,"zgecafa001util.zgecafa001util.fragments.GenericRemarks",a,"btnNo","btnYes")},handleConfirmationDialog:function(e,n,a){n=n!==null&&n!==undefined?n:o("C");t(e,n,"zgecafa001util.zgecafa001util.fragments.GenericConfirm",a,"btnNo","btnYes")},handleAgreeDialog:function(e,n,a){n=n!==null&&n!==undefined?n:o("C");t(e,n,"zgecafa001util.zgecafa001util.fragments.GenericAgree",a,"btnNo","btnYes")},handleConfirmationOKDialog:function(e,n,a){n=n!==null&&n!==undefined?n:o("C");t(e,n,"zgecafa001util.zgecafa001util.fragments.GenericConfirmOK",a,"btnYes")},handleConfirmationInformation:function(e,n,a){n=n!==null&&n!==undefined?n:o("GI");t(e,n,"zgecafa001util.zgecafa001util.fragments.GenericInformation",a,"btnOk")},handleErrorDialog:function(e,n,a){n=n!==null&&n!==undefined?n:o("E");t(e,n,"zgecafa001util.zgecafa001util.fragments.GenericError",a,"btnOk",null)},handleHintDialog:function(e,n,a){n=n!==null&&n!==undefined?n:o("H");t(e,n,"zgecafa001util.zgecafa001util.fragments.GenericHint",a,"btnOk",null)},handleInfoDialog:function(e,n,a){n=n!==null&&n!==undefined?n:o("I");t(e,n,"zgecafa001util.zgecafa001util.fragments.GenericInfo",a,"btnOk",null)},handleUploadDialog:function(e,n,a){n=n!==null&&n!==undefined?n:o("U");t(e,n,"zgecafa001util.zgecafa001util.fragments.GenericUpload",a,"btnOk",null)},handleODataErrorDialog:function(e,n,t){var l=this;n=n!==null&&n!==undefined?n:o("OE");if(l._dialog!==undefined){i(l._dialog)}l._dialog=sap.ui.xmlfragment("oDataError","zgecafa001util.zgecafa001util.fragments.GenericODataError",this);l._dialog.setModel(n);l._dialog.open();sap.ui.core.Fragment.byId("oDataError","btnOk").attachPress(function(e){a(l._dialog)})},handleDeleteWarningDialog:function(e,n,a){var i=e;n=n!==null&&n!==undefined?n:o("D");e.getOKControl="Y";t(e,n,"zgecafa001util.zgecafa001util.fragments.GenericConfirm",a,"btnYes","btnNo");sap.ui.core.Fragment.byId(i.createId(a),"btnYes").attachPress(function(e){i.onDeleteConfirmation(e)})}};function t(n,t,o,l,r,u){if(n._oDialog!==undefined){i(n._oDialog)}l=l!==""&&l!==undefined?l:"UTIL_FRAG";n._oDialog=sap.ui.xmlfragment(n.createId(l),o,n);n.getView().addDependent(n._oDialog);e.sap.syncStyleClass("sapUiSizeCompact",n.getView(),n._oDialog);n._oDialog.setModel(t);n._oDialog.open();if(r!==null){sap.ui.core.Fragment.byId(n.createId(l),r).attachPress(function(e){a(n._oDialog)})}if(u!==null){sap.ui.core.Fragment.byId(n.createId(l),u).attachPress(function(e){a(n._oDialog)})}}function a(e){try{e.close();e.destroy()}catch(e){}}function i(e){try{e.destroy();e=undefined}catch(e){}}function o(e){if(e==="D"){return new sap.ui.model.json.JSONModel({Title:"   Delete Record Warning !!!   ",SubTitle:"Do you want to delete the selected item?",BtnNoText:"NO",BtnYesText:"YES"})}else if(e==="OE"){return new sap.ui.model.json.JSONModel({Title:"HTTP Request failed",SubTitle:"Unexpected error caused!!!",BtnOkText:"OK"})}else if(e==="C"){return new sap.ui.model.json.JSONModel({Title:" You have modified records !!! ",SubTitle:"Do you want to submit the modified record ?",BtnNoText:"NO",BtnYesText:"YES"})}else if(e==="S"){return new sap.ui.model.json.JSONModel({Title:" Successfully updated the record ",SubTitle:"The selected record have submitted successfully",BtnOkText:"GO BACK TO MY DASHBOARD"})}else if(e==="GI"){return new sap.ui.model.json.JSONModel({Title:" You have rejected this letter of appoinment. ",SubTitle:"HR will receive a notification to inform the candidate of the outcome.",BtnOkText:"GO BACK TO MY DASHBOARD"})}else if(e==="W"){return new sap.ui.model.json.JSONModel({Title:"  Do you wanted to modify the selected record ?  ",SubTitle:"The selected item will replace the exsisting record",BtnNoText:"NO",BtnYesText:"YES"})}else if(e==="E"){return new sap.ui.model.json.JSONModel({Title:"  The selected record will be deleted  ",SubTitle:"The selected record will be deleted from the database",BtnOkText:"OK"})}else if(e==="RE"){return new sap.ui.model.json.JSONModel({Title:"You are about to give remark",SubTitle:"Please state your reason",BtnNoText:"CANCEL",BtnYesText:"SUBMIT"})}else if(e==="H"){return new sap.ui.model.json.JSONModel({Title:" Information ",BodyText:"The message box (sap.m.MessageBox) is a special dialog that allows you to display messages to the user. Compared to the message popover (sap.m.MessagePopover), you can use the message box to display messages that are not related to a field on the UI, such as technical errors",BtnOkText:"OK"})}else if(e==="I"){return new sap.ui.model.json.JSONModel({Title:" You have modified below information ",Lable1:"The record information as given below",Lable2:"Record number",Lable3:"Type of record",Text1:"Info level 1",Text2:"Info level 2",Text3:"Info level 3",BtnOkText:"OK"})}}},true);