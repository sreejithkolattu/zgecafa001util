sap.ui.define(["jquery.sap.global", "sap/ui/core/Control"], function(jQuery, Control) {
   "use strict";
  	/**
	 * @author Sreejith Ravindran
	 * @version ${1.0}
	 * Date: Dec 3, 2018
	 */ 
   return {
		  
        /**
		 * Function 
		 * @param {function} that 
		 * @param {function} model
		 * @return {Date} 
		 * @public
		 */    
        handleCancelWarningDialog: function (fragInst,model,fragmentId) {
        	model = (model!==null && model!==undefined)? model:setDialogModel("W");
        	_handleDialog (fragInst,model,"zgecafa001util.zgecafa001util.fragments.GenericConfirm",fragmentId,"btnNo","btnYes");
        },
         /**
		 * Function 
		 * @param {function} that 
		 * @param {function} model
		 * @return {Date} 
		 * @public
		 */   
        handleSuccessDialog: function (fragInst,model,fragmentId) {
        	model = (model!==null && model!==undefined)? model:setDialogModel("S");
        	_handleDialog (fragInst,model,"zgecafa001util.zgecafa001util.fragments.GenericSuccess",fragmentId,"btnOk",null);
        },
          /**
		 * Function 
		 * @param {function} that 
		 * @param {function} model
		 * @return {Date} 
		 * @public
		 */   
        handleConfirmationDialog: function (fragInst,model,fragmentId) {
        	model = (model!==null && model!==undefined)? model:setDialogModel("C");
        	_handleDialog (fragInst,model,"zgecafa001util.zgecafa001util.fragments.GenericConfirm",fragmentId,"btnNo","btnYes");
        },
         /**
		 * Function 
		 * @param {function} that 
		 * @param {function} model
		 * @return {Date} 
		 * @public
		 */   
        handleErrorDialog: function (fragInst,model,fragmentId) {
        	model = (model!==null && model!==undefined)? model:setDialogModel("E");
        	_handleDialog (fragInst,model,"zgecafa001util.zgecafa001util.fragments.GenericError",fragmentId,"btnOk",null);
        },
         handleODataErrorDialog: function (fragInst,model,fragmentId) {
        	model = (model!==null && model!==undefined)? model:setDialogModel("OE");
        	this._dialog = sap.ui.xmlfragment("oDataError", "zgecafa001util.zgecafa001util.fragments.GenericODataError", this);
		    this._dialog.setModel(model);
			this._dialog.open();
			sap.ui.core.Fragment.byId("oDataError", 'btnOk').attachPress(
				function(oControlEvent) {
			        		this._oDialog.close();
			        		this._oDialog.destroy();
		        	});
        },
        /**
		 * Function 
		 * @param {function} that 
		 * @param {function} model
		 * @return {Date} 
		 * @public
		 */    
        handleHintDialog: function (fragInst,model,fragmentId) {
        	model = (model!==null && model!==undefined)? model:setDialogModel("H");
        	_handleDialog (fragInst,model,"zgecafa001util.zgecafa001util.fragments.GenericHint",fragmentId,"btnOk",null);
        },
         /**
		 * Function 
		 * @param {function} that 
		 * @param {function} model
		 * @return {Date} 
		 * @public
		 */    
        handleInfoDialog: function (fragInst,model,fragmentId) {
        	model = (model!==null && model!==undefined)?model:setDialogModel("I");
        	_handleDialog (fragInst,model,"zgecafa001util.zgecafa001util.fragments.GenericInfo",fragmentId,"btnOk",null);
        },
        /**
		 * Function handleDeleteWarningDialog(fragInst,model,fragmentId)
		 * @param {function} fragInst 
		 * @param {function} model 
		 * @param {function} fragmentId 
		 * @return {void} 
		 * @public
		 */
		handleDeleteWarningDialog: function (fragInst,model,fragmentId) {
			var that = fragInst;
			model = (model!==null && model!==undefined)?model:setDialogModel("D");
			fragInst.getOKControl="Y";
        	_handleDialog (fragInst,model,"zgecafa001util.zgecafa001util.fragments.GenericConfirm",fragmentId,"btnYes","btnNo");
        	sap.ui.core.Fragment.byId(that.createId(fragmentId), 'btnYes').attachPress(
				function(oControlEvent) {  that.onDeleteConfirmation(oControlEvent);	}
				);
        }
	};
		 
		 
	 	function _handleDialog (that,model,fragment,fragmentId,btnOk,btnCancel) {
	 		if(that._oDialog!== undefined){
	 			try{
		 			that._oDialog.destroy();
		 			that._oDialog = undefined;
	 			}catch(e){}
	 		}
	 		fragmentId = (fragmentId!==""&&fragmentId!==undefined)?fragmentId:"UTIL_FRAG";
			that._oDialog = sap.ui.xmlfragment(that.createId(fragmentId), fragment, that);
		    that.getView().addDependent(that._oDialog);
		    jQuery.sap.syncStyleClass("sapUiSizeCompact", that.getView(), that._oDialog);
		    that._oDialog.setModel(model);
			that._oDialog.open();
			
			
			if(btnOk!==null){
				sap.ui.core.Fragment.byId(that.createId(fragmentId), btnOk).attachPress(
					function(oControlEvent) {
			        		that._oDialog.close();
			        		that._oDialog.destroy();
		        	});
			}
	        if(btnCancel!==null){
				sap.ui.core.Fragment.byId(that.createId(fragmentId), btnCancel).attachPress(
					function(oControlEvent) {
			        		that._oDialog.close();
			        		that._oDialog.destroy();
		        	});
			}
	 	} 
		/**
		 * Function 
		 * @param {function} type 
		 * @return {Date} 
		 * @public
		 */	 
		function setDialogModel (type) {
			if(type==="D"){
			return new sap.ui.model.json.JSONModel({
			 	"Title":"   Delete Record Warning !!!   ",
				"SubTitle":"Do you want to delete the selected item?",
				"BtnNoText":"NO",
				"BtnYesText":"YES"
			 });
			} else 	if(type==="OE"){
				return new sap.ui.model.json.JSONModel({
			 	"Title":"HTTP Request failed",
				"SubTitle":"Unexpected error caused!!!",
				"BtnOkText":"OK"
			 }); 
			} else 	if(type==="C"){
				return new sap.ui.model.json.JSONModel({
			 	"Title":" You have modified records !!! ",
				"SubTitle":"Do you want to submit the modified record ?",
				"BtnNoText":"NO",
				"BtnYesText":"YES"
			 });	
			}else if(type==="S"){
				return new sap.ui.model.json.JSONModel({
			 	"Title":" Successfully updated the record ",
				"SubTitle":"The selected record have submitted successfully",
				"BtnOkText":"OK"
			 });
			}else if(type==="W"){
				return new sap.ui.model.json.JSONModel({
			 	"Title":"  Do you wanted to modify the selected record ?  ",
				"SubTitle":"The selected item will replace the exsisting record",
				"BtnNoText":"NO",
				"BtnYesText":"YES"
			 });
			}else if(type==="E"){
				return new sap.ui.model.json.JSONModel({
			 	"Title":"  The selected record will be deleted  ",
				"SubTitle":"The selected record will be deleted from the database",
				"BtnOkText":"OK"
			 });
			}else if(type==="H"){
				return new sap.ui.model.json.JSONModel({
			 	"Title":" Information ",
				"BodyText":"The message box (sap.m.MessageBox) is a special dialog that allows you to display messages to the user. Compared to the message popover (sap.m.MessagePopover), you can use the message box to display messages that are not related to a field on the UI, such as technical errors",
				"BtnOkText":"OK"
			 }); 
			}else if(type==="I"){
				return new sap.ui.model.json.JSONModel({
			 	"Title":" You have modified below information ",
				"Lable1":"Personal identification number",
				"Lable2":"NRIC number",
				"Lable3":"Country",
				"Text1":"1232456788907",
				"Text2":"K234235236N",
				"Text3":"Singapoure",
				"BtnOkText":"Ok"
			 });	
			}
			 
		}
	

	}, /* bExport= */ true);




			