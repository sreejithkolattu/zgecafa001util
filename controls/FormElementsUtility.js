sap.ui.define(["jquery.sap.global","sap/ui/model/Filter","sap/ui/comp/filterbar/FilterBar","sap/ui/model/FilterOperator","sap/ui/comp/valuehelpdialog/ValueHelpDialog"],function(e,t,a,o,r){"use strict";return{showValueHelpDialog:function(e,t){try{t=t===null||t===undefined?v():t;t.idOfUIElement=!h(t.idOfUIElement)?"":t.idOfUIElement;t.autoFill=!h(t.autoFill)||t.autoFill?true:false;t.control=!h(t.control)?!h(t.isFragment)?sap.ui.core.Fragment.byId(e.createId(t.fragmentName),t.idOfUIElement):e.getView().byId(t.idOfUIElement):t.control;t.title=!h(t.title)?"Personnel Number":t.title;t.multiSelect=h(t.multiSelect)?t.multiSelect:false;t.isFragment=t.isFragment!==""&&t.isFragment?true:false;t.getToken=t.getToken!==""&&t.getToken?true:false;if(e.vhDialog!==undefined){e.vhDialog.destroy()}e.vhDialog=n(e,t)}catch(e){S(e)}},openQuickView:function(t,a,o){try{if(h(o)){if(!y(a,o)){if(a._oQuickView){a._oQuickView.destroy()}a._oQuickView=sap.ui.xmlfragment(a.createId("QuickView"),"zgecafa001util.zgecafa001util.fragments.EmployeeQuickView",this);a.getView().addDependent(a._oQuickView);g(a,o)}var r=t.getSource();e.sap.delayedCall(0,a,function(){a._oQuickView.openBy(r)})}else{sap.m.MessageToast.show("Employee Number is missing !!!")}}catch(e){S(e)}},handleUploadPopover:function(e,t,a){try{if(e===undefined){sap.m.MessageToast.show("Missing Source..!!");return false}a=a!==null&&a!==undefined?a:V("U");if(t._oInfoUploadPopover){t._oInfoUploadPopover.destroy()}t._oInfoUploadPopover=sap.ui.xmlfragment(t.createId("InfoUploadPopover"),"zgecafa001util.zgecafa001util.fragments.GenericUpload",this);t.getView().addDependent(t._oInfoUploadPopover);t._oInfoUploadPopover.setModel(a);sap.ui.core.Fragment.byId(t.createId("InfoUploadPopover"),"btnOk").attachPress(function(e){try{t._oInfoUploadPopover.close();t._oInfoUploadPopover.destroy()}catch(e){}});var o=e.hasOwnProperty("oSource")?e.getSource():e;t._oInfoUploadPopover.openBy(o)}catch(e){S(e)}}};function n(t,a){try{if(!h(a.reqestedField)){a.reqestedField="pernr"}var o=new sap.ui.comp.valuehelpdialog.ValueHelpDialog(t.createId("F4H"),{basicSearchText:a.inputValue,title:a.title,supportMultiselect:a.multiSelect,supportRanges:false,supportRangesOnly:false,key:"pernr",descriptionKey:"nachn",ok:function(e){var r=o.getTable();var n=r.getSelectedIndices();var s=sap.ui.getCore().getModel().getProperty("/");s=[];for(var l=0;l<n.length;l++){s.push(r.getModel().getProperty("/"+String(n[l])))}if(!a.autoFill){try{t.onValueHelpSelection(s,a.scenario);o.close()}catch(e){sap.m.MessageToast.show(" Implement of onValueHelpSelection(oModel) is missing")}}else if(w(a.control)){try{if(a.getToken&&a.control.getEnableMultiLineMode()){a.control.setTokens(e.getParameter("tokens"));o.close()}else if(!a.getToken){a.control.setValue(s[0][a.reqestedField]);o.close()}}catch(e){sap.m.MessageToast.show("Token assingment failed.")}if(a.oModel!==undefined&&a.control.getModel(a.oModel)!==undefined){if(a.control.getModel(a.oModel).getData().length>0){s.forEach(function(e){a.control.getModel(a.oModel).getData().push(e)})}else{a.control.getModel(a.oModel).setData(s)}a.control.getModel(a.oModel).refresh()}else if(a.oModel!==""&&a.oModel!==undefined){var i=new sap.ui.model.json.JSONModel;i.setData(s);a.control.setModel(i,a.oModel)}}else{sap.m.MessageToast.show("Element is not available !!!")}o.close()},cancel:function(e){o.close()},afterClose:function(){o.destroy()}});sap.ui.getCore().setModel(E());o.getTable().setModel(I(),"columns");o.getTable().setModel(l());try{P(o);o.getTable().bindRows("/")}catch(t){e.sap.log.debug(t)}o.setRangeKeyFields([{label:"Personnel ID",key:"pernr"},{label:"Employee Name",key:"nachn"}]);try{var r=a.fragmentName!==undefined&&a.fragmentName.length>0?sap.ui.core.Fragment.byId(t.createId(a.fragmentName),a.idOfUIElement):t.getView().byId(a.idOfUIElement);if(w(a.idOfUIElement)&&r!==undefined&&a.getToken&&a.oModel.length===0){o.setTokens(r.getTokens())}}catch(e){sap.m.MessageToast.show("Token assingment failed.")}if(h(a.reqestedField)){i(t,o,a.reqestedField)}o.addStyleClass(t.theTokenInput!==undefined&&t.theTokenInput.$().closest(".sapUiSizeCompact").length>0?"sapUiSizeCompact":"sapUiSizeCozy");o.open();o.update();return o}catch(e){S(e)}}function s(e){if(e===undefined){sap.m.MessageToast.show("View is not available !!!");return false}else{return true}}function l(){try{var e=new sap.ui.model.json.JSONModel;e.setData([]);return e}catch(e){sap.m.MessageToast.show("Error !!!")}}function i(e,t,a){try{if(a===undefined){a="pernr"}var o;if(e.getView().getModel("suggetionModel")===undefined){o=new sap.ui.model.json.JSONModel({PArea:[],PSArea:[],EmpInfo:[]});e.getView().setModel(o,"suggetionModel")}var r=D(t);r.setModel(e.getView().getModel("suggetionModel"));u(e);var n=new sap.m.SearchField({placeholder:"Search",search:function(e){var o=e.getParameter("query");var r=[new sap.ui.model.Filter(a,sap.ui.model.FilterOperator.Contains,o)];p(r,t)}});r.setBasicSearch(n);t.setFilterBar(r)}catch(e){sap.m.MessageToast.show("Error !!!")}}function u(e){try{var t=e.getView().getModel("suggetionModel");if(t!==undefined){if(t.getData().PArea.length<1){M("/sap/opu/odata/sap/ZGECAGS006_SRV/PerAreaSet",e)}if(t.getData().PSArea.length<1){M("/sap/opu/odata/sap/ZGECAGS006_SRV/PerSubAreaSet",e)}if(t.getData().EmpInfo.length<1){M("/sap/opu/odata/sap/ZDD_SH_PERSON_CDS/ZDD_SH_PERSON?$select=pernr,ename,srch_email&$filter=substringof('',pernr) and substringof('',ename) and substringof('',orgeh) and substringof('',werks) and substringof('',btrtl)",e)}}}catch(e){sap.m.MessageToast.show("Error !!!")}}function p(t,a){try{a.setBusy(true);var o="/sap/opu/odata/sap/ZDD_SH_PERSON_CDS/";var r="ZDD_SH_PERSON";var n=new sap.ui.model.odata.ODataModel(o,false);n.read(r,{filters:t,success:e.proxy(d,a),error:e.proxy(c,a)})}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function d(e,t,a){try{this.getTable().getModel().oData=e.results;this.getTable().getModel().refresh();this.setBusy(false)}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function c(e,t,a){try{this.setBusy(false);sap.m.MessageToast.show("Error while retreaving data !!!")}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function g(t,a){try{if(h(a)){var o="/sap/opu/odata/sap/ZGECAGS006_SRV/";var r="EmpCardSet(Pernr='"+a+"')";var n=new sap.ui.model.odata.ODataModel(o,false);n.read(r,{success:e.proxy(m,t),error:e.proxy(f,t)})}}catch(e){sap.m.MessageToast.show("Error !!!")}}function m(e,t,a){try{var o="sap-icon://employee";if(e.Photo.length===0){e.Photo=o}var r={oEmpInfoData:[{pernr:e.Pernr,pageId:e.Pernr,header:"Employee Details",icon:e.Photo,title:e.Ename,description:e.PosName,groups:[{heading:"Contact Details",elements:[{label:"Mobile",value:e.Mobile,elementType:sap.m.QuickViewGroupElementType.mobile},{label:"Phone",value:e.Phone,elementType:sap.m.QuickViewGroupElementType.phone},{label:"Email",value:e.Email,emailSubject:"",elementType:sap.m.QuickViewGroupElementType.email}]}]}]};this._oQuickView.setModel(new sap.ui.model.json.JSONModel(r),"empQuickView")}catch(e){sap.m.MessageToast.show("Error !!!")}}function f(e,t,a){try{this.setBusy(false);sap.m.MessageToast.show("Error while retreaving data !!!")}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function h(e){return e!==null&&e!==undefined}function w(e){return e!==null&&e!==undefined&&e!==""}function y(e,t){try{return e._oQuickView!==undefined&&e._oQuickView.getModel("empQuickView").getData()!==undefined&&e._oQuickView.getModel("empQuickView").getData().oEmpInfoData!==undefined&&e._oQuickView.getModel("empQuickView").getData().oEmpInfoData[0].pageId===t}catch(e){return false}}function M(e,t){try{var a=new sap.ui.model.json.JSONModel;a.attachEventOnce("requestCompleted",function(e){var t=e.getParameter("url").split("/")[e.getParameter("url").split("/").length-1];if(a.getData().d!==undefined)if(t.indexOf("PerAreaSet")===0){this.getView().getModel("suggetionModel").getData().PArea=a.getData().d.results}else if(t.indexOf("PerSubAreaSet")===0){this.getView().getModel("suggetionModel").getData().PSArea=a.getData().d.results}else if(t.indexOf("ZDD_SH_PERSON")===0){this.getView().getModel("suggetionModel").getData().EmpInfo=a.getData().d.results}this.getView().getModel("suggetionModel").refresh()},t).loadData(e)}catch(e){return[]}}function S(e){try{if(e.message.indexOf("adding element with duplicate id")!==-1){if(sap.ui.getCore().byId(e.message.split("'")[1])!==undefined){sap.ui.getCore().byId(e.message.split("'")[1]).destroy()}sap.m.MessageToast.show("An error occurred, Please try again")}else{sap.m.MessageToast.show("Error !!!"+e.message)}}catch(e){}}function b(){var e={basicSearchText:"",title:"Personnel Number",multiSelect:false,maxIncludeRanges:"2",supportRanges:false,supportRangesOnly:false,key:"pernr",descriptionKey:"nachn",stretch:sap.ui.Device.system.phone};return e}function v(){return{title:"Personnel Number",control:null,getToken:true,idOfUIElement:"",reqestedField:"pernr",multiSelect:false,inputValue:"",isFragment:false,view:"",oModel:"",fragmentName:"",autoFill:true,scenario:""}}function P(e){try{var t=e.getTable().getColumns().length;for(var a=0;a<=t;a++){e.getTable().getColumns()[a].setVisible(a<2?true:sap.ui.Device.system.desktop)}}catch(e){sap.m.MessageToast.show("Error !!!")}}function E(){try{var e=[];var t=new sap.ui.model.json.JSONModel;t.setData(e);sap.ui.getCore().setModel(t);return t}catch(e){sap.m.MessageToast.show("Error !!!")}}function I(){try{var e=new sap.ui.model.json.JSONModel;e.setData({cols:[{label:"Personnal Number",template:"pernr"},{label:"Employee Name",template:"ename"},{label:"Email ID",template:"email"},{label:"Organizational Unit",template:"OrgUnitDescription"},{label:"Personnel Area",template:"PersonnelAreaDescription"},{label:"Personnel Subarea",template:"PersonnelSubareaDescription"}]});return e}catch(e){sap.m.MessageToast.show("Error !!!")}}function T(e,t,a,o,r,n,s,l,i){try{return new sap.ui.comp.filterbar.FilterGroupItem({groupTitle:e,groupName:t,name:a,label:o,control:new sap.m.Input(r,{placeholder:n,type:sap.m.InputType.Text,showSuggestion:true,liveChange:function(){if(this.getValue().length>0){this.bindAggregation("suggestionItems",s,new sap.ui.core.Item({key:l,text:i}))}}})})}catch(e){}}function D(e){try{var t=new sap.ui.comp.filterbar.FilterBar({advancedMode:true,filterBarExpanded:true,filterGroupItems:[T("empGrp","gn1","n1","Personnel Number","searchInput1","Search Personnel Number","/EmpInfo","{pernr}","{pernr}"),T("empGrp","gn1","n2","Employee Name","searchInput2","Search Employee Name","/EmpInfo","{ename}","{ename}"),T("empGrp","gn1","n5","Email ID","searchInput5","Search Email ID","/EmpInfo","{srch_email}","{srch_email}"),new sap.ui.comp.filterbar.FilterGroupItem("searchInput6",{groupTitle:"empGrp",groupName:"gn1",name:"n6",label:"Organizational Unit",control:new sap.m.Input({placeholder:"Enter Organizational Unit"})}),T("empGrp","gn1","n7","Personnel Area","searchInput7","Search Personnel Area","/PArea","{Persa}","{Persa} - {Name1}"),T("empGrp","gn1","n8","Personnel Subarea","searchInput8","Search Personnel Subarea","/PSArea","{Persa}","{Persa} - {Btext}")],search:function(t){var a=t.getParameter("selectionSet");var o=a[0].getValue();var r=a[1].getValue();var n=a[2].getValue();var s=a[3].getValue();var l=a[4].getValue();var i=a[5].getValue();var u=[new sap.ui.model.Filter("pernr","Contains",o),new sap.ui.model.Filter("ename","Contains",r),new sap.ui.model.Filter("orgeh","Contains",s),new sap.ui.model.Filter("werks","Contains",l),new sap.ui.model.Filter("btrtl","Contains",i)];if(n!==""&&n!==undefined){u.push(new sap.ui.model.Filter("srch_email","Contains",n))}p(u,e)}});return t}catch(e){sap.m.MessageToast.show("Error in filter bar")}}function V(e){if(e==="U"){return new sap.ui.model.json.JSONModel({Title:" Information",BodyText:"<p>1. Maximum file size to be upload is 2 MB.<br />2. Supported file types: PDF, JPG, PNG, JPEG.</p>",BtnOkText:"CLOSE"})}}},true);