sap.ui.define(["jquery.sap.global","sap/ui/model/Filter","sap/ui/comp/filterbar/FilterBar","sap/ui/model/FilterOperator","sap/ui/comp/valuehelpdialog/ValueHelpDialog"],function(e,t,a,r,o){"use strict";return{showValueHelpDialog:function(e,t){try{t=t===null||t===undefined?I():t;t.idOfUIElement=!h(t.idOfUIElement)?"":t.idOfUIElement;t.autoFill=!h(t.autoFill)||t.autoFill?true:false;t.control=!h(t.control)?!h(t.isFragment)?sap.ui.core.Fragment.byId(e.createId(t.fragmentName),t.idOfUIElement):e.getView().byId(t.idOfUIElement):t.control;t.title=!h(t.title)?"Personnel Number":t.title;t.multiSelect=h(t.multiSelect)?t.multiSelect:false;t.isFragment=t.isFragment!==""&&t.isFragment?true:false;t.getToken=t.getToken!==""&&t.getToken?true:false;if(e.vhDialog!==undefined){e.vhDialog.destroy()}e.vhDialog=s(e,t)}catch(e){b(e)}},openQuickView:function(t,a,r){try{if(h(r)){if(!y(a,r)){if(a._oQuickView){a._oQuickView.destroy()}a._oQuickView=sap.ui.xmlfragment(a.createId("QuickView"),"zgecafa001util.zgecafa001util.fragments.EmployeeQuickView",this);a.getView().addDependent(a._oQuickView);g(a,r)}var o=t.getSource();e.sap.delayedCall(0,a,function(){a._oQuickView.openBy(o)})}else{sap.m.MessageToast.show("Employee Number is missing !!!")}}catch(e){b(e)}},handleUploadPopover:function(e,t,a){try{if(e===undefined){sap.m.MessageToast.show("Missing Source..!!");return false}a=a!==null&&a!==undefined?a:V("U");if(t._oInfoUploadPopover){t._oInfoUploadPopover.destroy()}t._oInfoUploadPopover=sap.ui.xmlfragment(t.createId("InfoUploadPopover"),"zgecafa001util.zgecafa001util.fragments.GenericUpload",this);t.getView().addDependent(t._oInfoUploadPopover);t._oInfoUploadPopover.setModel(a);sap.ui.core.Fragment.byId(t.createId("InfoUploadPopover"),"btnOk").attachPress(function(e){try{t._oInfoUploadPopover.close();t._oInfoUploadPopover.destroy()}catch(e){}});var r=e.hasOwnProperty("oSource")?e.getSource():e;t._oInfoUploadPopover.openBy(r)}catch(e){b(e)}}};function s(t,a){try{if(!h(a.reqestedField)){a.reqestedField="pernr"}var r=new sap.ui.comp.valuehelpdialog.ValueHelpDialog(t.createId("F4H"),{basicSearchText:a.inputValue,title:a.title,supportMultiselect:a.multiSelect,supportRanges:false,supportRangesOnly:false,key:"pernr",descriptionKey:"nachn",ok:function(e){var o=r.getTable();var s=o.getSelectedIndices();var n=sap.ui.getCore().getModel().getProperty("/");n=[];for(var l=0;l<s.length;l++){n.push(o.getModel().getProperty("/"+String(s[l])))}if(!a.autoFill){try{t.onValueHelpSelection(n,a.scenario);r.close()}catch(e){sap.m.MessageToast.show(" Implement of onValueHelpSelection(oModel) is missing")}}else if(w(a.control)){try{if(a.getToken&&a.control.getEnableMultiLineMode()){a.control.setTokens(e.getParameter("tokens"));r.close()}else if(!a.getToken){a.control.setValue(n[0][a.reqestedField]);r.close()}}catch(e){sap.m.MessageToast.show("Token assingment failed.")}if(a.oModel!==undefined&&a.control.getModel(a.oModel)!==undefined){if(a.control.getModel(a.oModel).getData().length>0){n.forEach(function(e){a.control.getModel(a.oModel).getData().push(e)})}else{a.control.getModel(a.oModel).setData(n)}a.control.getModel(a.oModel).refresh()}else if(a.oModel!==""&&a.oModel!==undefined){var i=new sap.ui.model.json.JSONModel;i.setData(n);a.control.setModel(i,a.oModel)}}else{sap.m.MessageToast.show("Element is not available !!!")}r.close()},cancel:function(e){r.close()},afterClose:function(){r.destroy()}});sap.ui.getCore().setModel(P());r.getTable().setModel(E(),"columns");r.getTable().setModel(l());try{v(r);r.getTable().bindRows("/")}catch(t){e.sap.log.debug(t)}r.setRangeKeyFields([{label:"Personnel ID",key:"pernr"},{label:"Employee Name",key:"nachn"}]);try{var o=a.fragmentName!==undefined&&a.fragmentName.length>0?sap.ui.core.Fragment.byId(t.createId(a.fragmentName),a.idOfUIElement):t.getView().byId(a.idOfUIElement);if(w(a.idOfUIElement)&&o!==undefined&&a.getToken&&a.oModel.length===0){r.setTokens(o.getTokens())}}catch(e){sap.m.MessageToast.show("Token assingment failed.")}if(h(a.reqestedField)){i(t,r,a.reqestedField)}r.addStyleClass(t.theTokenInput!==undefined&&t.theTokenInput.$().closest(".sapUiSizeCompact").length>0?"sapUiSizeCompact":"sapUiSizeCozy");r.open();r.update();return r}catch(e){b(e)}}function n(e){if(e===undefined){sap.m.MessageToast.show("View is not available !!!");return false}else{return true}}function l(){try{var e=new sap.ui.model.json.JSONModel;e.setData([]);return e}catch(e){sap.m.MessageToast.show("Error !!!")}}function i(e,t,a){try{if(a===undefined){a="pernr"}var r;if(e.getView().getModel("suggetionModel")===undefined){r=new sap.ui.model.json.JSONModel({PArea:[],PSArea:[],EmpInfo:[]});e.getView().setModel(r,"suggetionModel")}var o=D(t);o.setModel(e.getView().getModel("suggetionModel"));u(e);var s=new sap.m.SearchField({placeholder:"Search",search:function(e){var r=e.getParameter("query");var o=[new sap.ui.model.Filter(a,sap.ui.model.FilterOperator.Contains,r)];p(o,t)}});o.setBasicSearch(s);t.setFilterBar(o)}catch(e){sap.m.MessageToast.show("Error !!!")}}function u(e){try{var t=e.getView().getModel("suggetionModel");if(t!==undefined){if(t.getData().PArea.length<1){M("/sap/opu/odata/sap/ZGECAGS006_SRV/PerAreaSet",e)}if(t.getData().PSArea.length<1){M("/sap/opu/odata/sap/ZGECAGS006_SRV/PerSubAreaSet",e)}if(t.getData().EmpInfo.length<1){M("/sap/opu/odata/sap/ZDD_SH_PERSON_CDS/ZDD_SH_PERSON?$select=pernr,ename,srch_email,NricNumber&$filter=substringof('',pernr) and substringof('',ename) and substringof('',orgeh) and substringof('',werks) and substringof('',btrtl) and substringof('',NricNumber)",e)}}}catch(e){sap.m.MessageToast.show("Error !!!")}}function p(t,a){try{a.setBusy(true);var r="/sap/opu/odata/sap/ZDD_SH_PERSON_CDS/";var o="ZDD_SH_PERSON";var s=new sap.ui.model.odata.ODataModel(r,false);s.read(o,{filters:t,success:e.proxy(c,a),error:e.proxy(d,a)})}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function c(e,t,a){try{this.getTable().getModel().oData=e.results;this.getTable().getModel().refresh();this.setBusy(false)}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function d(e,t,a){try{this.setBusy(false);sap.m.MessageToast.show("Error while retreaving data !!!")}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function g(t,a){try{if(h(a)){var r="/sap/opu/odata/sap/ZGECAGS006_SRV/";var o="EmpCardSet(Pernr='"+a+"')";var s=new sap.ui.model.odata.ODataModel(r,false);s.read(o,{success:e.proxy(m,t),error:e.proxy(f,t)})}}catch(e){sap.m.MessageToast.show("Error !!!")}}function m(e,t,a){try{var r="sap-icon://employee";if(e.Photo.length===0){e.Photo=r}var o={oEmpInfoData:[{pernr:e.Pernr,pageId:e.Pernr,header:"Employee Details",icon:e.Photo,title:e.Ename,description:e.PosName,groups:[{heading:"Contact Details",elements:[{label:"Mobile",value:e.Mobile,elementType:sap.m.QuickViewGroupElementType.mobile},{label:"Phone",value:e.Phone,elementType:sap.m.QuickViewGroupElementType.phone},{label:"Email",value:e.Email,emailSubject:"",elementType:sap.m.QuickViewGroupElementType.email}]}]}]};this._oQuickView.setModel(new sap.ui.model.json.JSONModel(o),"empQuickView")}catch(e){sap.m.MessageToast.show("Error !!!")}}function f(e,t,a){try{this.setBusy(false);sap.m.MessageToast.show("Error while retreaving data !!!")}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function h(e){return e!==null&&e!==undefined}function w(e){return e!==null&&e!==undefined&&e!==""}function y(e,t){try{return e._oQuickView!==undefined&&e._oQuickView.getModel("empQuickView").getData()!==undefined&&e._oQuickView.getModel("empQuickView").getData().oEmpInfoData!==undefined&&e._oQuickView.getModel("empQuickView").getData().oEmpInfoData[0].pageId===t}catch(e){return false}}function M(e,t){try{var a=new sap.ui.model.json.JSONModel;a.attachEventOnce("requestCompleted",function(e){var t=e.getParameter("url").split("/")[e.getParameter("url").split("/").length-1];if(a.getData().d!==undefined)if(t.indexOf("PerAreaSet")===0){this.getView().getModel("suggetionModel").getData().PArea=a.getData().d.results}else if(t.indexOf("PerSubAreaSet")===0){this.getView().getModel("suggetionModel").getData().PSArea=a.getData().d.results}else if(t.indexOf("ZDD_SH_PERSON")===0){this.getView().getModel("suggetionModel").getData().EmpInfo=a.getData().d.results}this.getView().getModel("suggetionModel").refresh()},t).loadData(e)}catch(e){return[]}}function b(e){try{if(e.message.indexOf("adding element with duplicate id")!==-1){if(sap.ui.getCore().byId(e.message.split("'")[1])!==undefined){sap.ui.getCore().byId(e.message.split("'")[1]).destroy()}sap.m.MessageToast.show("An error occurred, Please try again")}else{sap.m.MessageToast.show("Error !!!"+e.message)}}catch(e){}}function S(){var e={basicSearchText:"",title:"Personnel Number",multiSelect:false,maxIncludeRanges:"2",supportRanges:false,supportRangesOnly:false,key:"pernr",descriptionKey:"nachn",stretch:sap.ui.Device.system.phone};return e}function I(){return{title:"Personnel Number",control:null,getToken:true,idOfUIElement:"",reqestedField:"pernr",multiSelect:false,inputValue:"",isFragment:false,view:"",oModel:"",fragmentName:"",autoFill:true,scenario:""}}function v(e){try{var t=e.getTable().getColumns().length;for(var a=0;a<=t;a++){e.getTable().getColumns()[a].setVisible(a<2?true:sap.ui.Device.system.desktop)}}catch(e){sap.m.MessageToast.show("Error !!!")}}function P(){try{var e=[];var t=new sap.ui.model.json.JSONModel;t.setData(e);sap.ui.getCore().setModel(t);return t}catch(e){sap.m.MessageToast.show("Error !!!")}}function E(){try{var e=new sap.ui.model.json.JSONModel;e.setData({cols:[{label:"Profile",template:{Type:"sap.m.Text",text:"Ha"}},{label:"Personnel number",template:"pernr"},{label:"Employee name",template:"ename"},{label:"Email id",template:"email"},{label:"Organizational unit",template:"OrgUnitDescription"},{label:"Personnel area",template:"PersonnelAreaDescription"},{label:"Personnel subarea",template:"PersonnelSubareaDescription"}]});return e}catch(e){sap.m.MessageToast.show("Error !!!")}}function T(e,a,r,o,s,n,l,i,u){try{return new sap.ui.comp.filterbar.FilterGroupItem({groupTitle:e,groupName:a,name:r,label:o,control:new sap.m.Input(s,{placeholder:n,type:sap.m.InputType.Text,showSuggestion:true,suggest:function(e){var a=e.getParameter("suggestValue");var r=e.getSource().getId(),o;var s=[];if(a){switch(r){case"searchInput1":s.push(new t("pernr",sap.ui.model.FilterOperator.Contains,a));break;case"searchInput2":s.push(new t("ename",sap.ui.model.FilterOperator.Contains,a));break;case"searchInput5":s.push(new t("srch_email",sap.ui.model.FilterOperator.Contains,a));break;case"searchInput7":case"searchInput8":s.push(new t("Persa",sap.ui.model.FilterOperator.Contains,a));break;case"searchInput9":s.push(new t("NricNumber",sap.ui.model.FilterOperator.Contains,a));break}}e.getSource().getBinding("suggestionItems").filter(s);e.getSource().setFilterSuggests(false)},suggestionItems:{path:l,template:new sap.ui.core.Item({text:u,key:i})}})})}catch(e){}}function D(e){try{var t=new sap.ui.comp.filterbar.FilterBar({advancedMode:true,filterBarExpanded:true,filterGroupItems:[T("empGrp","gn1","n1","Personnel number","searchInput1","Search personnel number","/EmpInfo","{pernr}","{pernr}"),T("empGrp","gn1","n2","Employee name","searchInput2","Search employee name","/EmpInfo","{ename}","{ename}"),T("empGrp","gn1","n5","Email id","searchInput5","Search email id","/EmpInfo","{srch_email}","{srch_email}"),new sap.ui.comp.filterbar.FilterGroupItem("searchInput6",{groupTitle:"empGrp",groupName:"gn1",name:"n6",label:"Organizational Unit",control:new sap.m.Input({placeholder:"Enter Organizational Unit"})}),T("empGrp","gn1","n7","Personnel area","searchInput7","Search personnel area","/PArea","{Persa}","{Persa} - {Name1}"),T("empGrp","gn1","n8","Personnel subarea","searchInput8","Search personnel subarea","/PSArea","{Persa}","{Persa} - {Btext}"),T("empGrp","gn1","n9","NRIC","searchInput9","Search NRIC","/EmpInfo","{NricNumber}","{NricNumber}")],search:function(t){var a=t.getParameter("selectionSet");var r=a[0].getValue();var o=a[1].getValue();var s=a[2].getValue();var n=a[3].getValue();var l=a[4].getValue();var i=a[5].getValue();var u=a[6].getValue();var c=[new sap.ui.model.Filter("pernr","Contains",r),new sap.ui.model.Filter("ename","Contains",o),new sap.ui.model.Filter("orgeh","Contains",n),new sap.ui.model.Filter("werks","Contains",l),new sap.ui.model.Filter("PersonnelSubarea","Contains",i),new sap.ui.model.Filter("NricNumber","Contains",u)];if(s!==""&&s!==undefined){c.push(new sap.ui.model.Filter("srch_email","Contains",s))}p(c,e)}});return t}catch(e){sap.m.MessageToast.show("Error in filter bar")}}function V(e){if(e==="U"){return new sap.ui.model.json.JSONModel({Title:" Information",BodyText:"<p>1. Maximum file size to be upload is 2 MB.<br />2. Supported file types: PDF, JPG, PNG, JPEG.</p>",BtnOkText:"CLOSE"})}}},true);