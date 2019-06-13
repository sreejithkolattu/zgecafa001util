sap.ui.define(["jquery.sap.global","sap/ui/model/Filter","sap/ui/comp/filterbar/FilterBar","sap/ui/model/FilterOperator","sap/ui/comp/valuehelpdialog/ValueHelpDialog"],function(e,t,a,r,s){"use strict";return{showValueHelpDialog:function(e,t){try{t=t===null||t===undefined?b():t;t.idOfUIElement=!h(t.idOfUIElement)?t.idOfUIElement:"";t.autoFill=!h(t.autoFill)||t.autoFill?true:false;t.control=!h(t.control)?!h(t.isFragment)?sap.ui.core.Fragment.byId(e.createId(t.fragmentName),t.idOfUIElement):e.getView().byId(t.idOfUIElement):t.control;t.title=!h(t.title)?"Personel Number":t.title;t.multiSelect=h(t.multiSelect)?t.multiSelect:false;t.isFragment=t.isFragment!==""&&t.isFragment?true:false;t.getToken=t.getToken!==""&&t.getToken?true:false;if(e.vhDialog!==undefined){e.vhDialog.destroy()}e.vhDialog=o(e,t)}catch(e){S(e)}},openQuickView:function(t,a,r){try{if(h(r)){if(!M(a,r)){if(a._oQuickView){a._oQuickView.destroy()}a._oQuickView=sap.ui.xmlfragment(a.createId("QuickView"),"zgecafa001util.zgecafa001util.fragments.EmployeeQuickView",this);a.getView().addDependent(a._oQuickView);g(a,r)}var s=t.getSource();e.sap.delayedCall(0,a,function(){a._oQuickView.openBy(s)})}else{sap.m.MessageToast.show("Employee Number is missing !!!")}}catch(e){S(e)}}};function o(e,t){try{if(!h(t.reqestedField)){t.reqestedField="pernr"}var a=new sap.ui.comp.valuehelpdialog.ValueHelpDialog(e.createId("F4H"),{basicSearchText:t.inputValue,title:t.title,supportMultiselect:t.multiSelect,supportRanges:false,supportRangesOnly:false,key:"pernr",descriptionKey:"nachn",ok:function(r){var s=a.getTable();var o=s.getSelectedIndices();var n=sap.ui.getCore().getModel().getProperty("/");n=[];for(var l=0;l<o.length;l++){n.push(s.getModel().getProperty("/"+String(o[l])))}if(!t.autoFill){try{e.onValueHelpSelection(n,t.scenario);a.close()}catch(e){sap.m.MessageToast.show(" Implement of onValueHelpSelection(oModel) is missing")}}else if(w(t.control)){try{if(t.getToken&&t.control.getEnableMultiLineMode()){t.control.setTokens(r.getParameter("tokens"));a.close()}else if(!t.getToken){t.control.setValue(n[0][t.reqestedField]);a.close()}}catch(e){sap.m.MessageToast.show("Token assingment failed.")}if(t.control.getModel(t.oModel)!==undefined){if(t.control.getModel(t.oModel).getData().length>0){n.forEach(function(e){t.control.getModel(t.oModel).getData().push(e)})}else{t.control.getModel(t.oModel).setData(n)}t.control.getModel(t.oModel).refresh()}else if(t.oModel!==""&&t.oModel!==undefined){var i=new sap.ui.model.json.JSONModel;i.setData(n);t.control.setModel(i,t.oModel)}}else{sap.m.MessageToast.show("Element is not available !!!")}a.close()},cancel:function(e){sap.m.MessageToast.show("Cancel pressed!");a.close()},afterClose:function(){a.destroy()}});sap.ui.getCore().setModel(D());a.getTable().setModel(v(),"columns");a.getTable().setModel(l());a.getTable().bindRows("/");a.setRangeKeyFields([{label:"Personnel ID",key:"pernr"},{label:"Employee Name",key:"nachn"}]);try{var r=t.fragmentName!==undefined&&t.fragmentName.length>0?sap.ui.core.Fragment.byId(e.createId(t.fragmentName),t.idOfUIElement):e.getView().byId(t.idOfUIElement);if(w(t.idOfUIElement)&&r!==undefined&&t.getToken&&t.oModel.length===0){a.setTokens(r.getTokens())}}catch(e){sap.m.MessageToast.show("Token assingment failed.")}if(h(t.reqestedField)){i(e,a,t.reqestedField)}a.addStyleClass(e.theTokenInput!==undefined&&e.theTokenInput.$().closest(".sapUiSizeCompact").length>0?"sapUiSizeCompact":"sapUiSizeCozy");a.open();a.update();return a}catch(e){S(e)}}function n(e){if(e===undefined){sap.m.MessageToast.show("View is not available !!!");return false}else{return true}}function l(){try{var e=new sap.ui.model.json.JSONModel;e.setData([]);return e}catch(e){sap.m.MessageToast.show("Error !!!")}}function i(e,t,a){try{if(a===undefined){a="pernr"}var r;if(e.getView().getModel("suggetionModel")===undefined){r=new sap.ui.model.json.JSONModel({PArea:[],PSArea:[],EmpInfo:[]});e.getView().setModel(r,"suggetionModel")}var s=I(t);s.setModel(e.getView().getModel("suggetionModel"));u(e);var o=new sap.m.SearchField({placeholder:"Search",search:function(e){var r=e.getParameter("query");var s=[new sap.ui.model.Filter(a,sap.ui.model.FilterOperator.Contains,r)];p(s,t)}});s.setBasicSearch(o);t.setFilterBar(s)}catch(e){sap.m.MessageToast.show("Error !!!")}}function u(e){try{var t=e.getView().getModel("suggetionModel");if(t!==undefined){if(t.getData().PArea.length<1){y("/sap/opu/odata/sap/ZGECAGS006_SRV/PerAreaSet",e)}if(t.getData().PSArea.length<1){y("/sap/opu/odata/sap/ZGECAGS006_SRV/PerSubAreaSet",e)}if(t.getData().EmpInfo.length<1){y("/sap/opu/odata/sap/ZDD_SH_PERSON_CDS/ZDD_SH_PERSON?$select=pernr,ename,srch_email&$filter=substringof('',pernr) and substringof('',ename) and substringof('',srch_email) and substringof('',orgeh) and substringof('',werks) and substringof('',btrtl)",e)}}}catch(e){sap.m.MessageToast.show("Error !!!")}}function p(t,a){try{a.setBusy(true);var r="/sap/opu/odata/sap/ZDD_SH_PERSON_CDS/";var s="ZDD_SH_PERSON";var o=new sap.ui.model.odata.ODataModel(r,false);o.read(s,{filters:t,success:e.proxy(c,a),error:e.proxy(d,a)})}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function c(e,t,a){try{this.getTable().getModel().oData=e.results;this.getTable().getModel().refresh();this.setBusy(false)}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function d(e,t,a){try{this.setBusy(false);sap.m.MessageToast.show("Error while retreaving data !!!")}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function g(t,a){try{if(h(a)){var r="/sap/opu/odata/sap/ZGECAGS006_SRV/";var s="EmpCardSet(Pernr='"+a+"')";var o=new sap.ui.model.odata.ODataModel(r,false);o.read(s,{success:e.proxy(m,t),error:e.proxy(f,t)})}}catch(e){sap.m.MessageToast.show("Error !!!")}}function m(e,t,a){try{var r="sap-icon://employee";if(e.Photo.length===0){e.Photo=r}var s={oEmpInfoData:[{pernr:e.Pernr,pageId:e.Pernr,header:"Employee Details",icon:e.Photo,title:e.Ename,description:e.PosName,groups:[{heading:"Contact Details",elements:[{label:"Mobile",value:e.Mobile,elementType:sap.m.QuickViewGroupElementType.mobile},{label:"Phone",value:e.Phone,elementType:sap.m.QuickViewGroupElementType.phone},{label:"Email",value:e.Email,emailSubject:"",elementType:sap.m.QuickViewGroupElementType.email}]}]}]};this._oQuickView.setModel(new sap.ui.model.json.JSONModel(s),"empQuickView")}catch(e){sap.m.MessageToast.show("Error !!!")}}function f(e,t,a){try{this.setBusy(false);sap.m.MessageToast.show("Error while retreaving data !!!")}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function h(e){return e!==null&&e!==undefined}function w(e){return e!==null&&e!==undefined&&e!==""}function M(e,t){try{return e._oQuickView!==undefined&&e._oQuickView.getModel("empQuickView").getData()!==undefined&&e._oQuickView.getModel("empQuickView").getData().oEmpInfoData!==undefined&&e._oQuickView.getModel("empQuickView").getData().oEmpInfoData[0].pageId===t}catch(e){return false}}function y(e,t){try{var a=new sap.ui.model.json.JSONModel;a.attachEventOnce("requestCompleted",function(e){var t=e.getParameter("url").split("/")[e.getParameter("url").split("/").length-1];if(a.getData().d!==undefined)if(t.indexOf("PerAreaSet")===0){this.getView().getModel("suggetionModel").getData().PArea=a.getData().d.results}else if(t.indexOf("PerSubAreaSet")===0){this.getView().getModel("suggetionModel").getData().PSArea=a.getData().d.results}else if(t.indexOf("ZDD_SH_PERSON")===0){this.getView().getModel("suggetionModel").getData().EmpInfo=a.getData().d.results}this.getView().getModel("suggetionModel").refresh()},t).loadData(e)}catch(e){return[]}}function S(e){try{sap.m.MessageToast.show("Error !!!"+e.message);if(e.message.indexOf("adding element with duplicate id")!==-1){if(sap.ui.getCore().byId(e.message.split("'")[1])!==undefined){sap.ui.getCore().byId(e.message.split("'")[1]).destroy()}}}catch(e){}}function E(){var e={basicSearchText:"",title:"Personel Number",multiSelect:false,maxIncludeRanges:"2",supportRanges:false,supportRangesOnly:false,key:"pernr",descriptionKey:"nachn",stretch:sap.ui.Device.system.phone};return e}function b(){return{title:"Personel Number",control:null,getToken:true,idOfUIElement:"",reqestedField:"pernr",multiSelect:false,inputValue:"",isFragment:false,view:"",oModel:"",fragmentName:"",autoFill:true,scenario:""}}function D(){try{var e=[];var t=new sap.ui.model.json.JSONModel;t.setData(e);sap.ui.getCore().setModel(t);return t}catch(e){sap.m.MessageToast.show("Error !!!")}}function v(){try{var e=new sap.ui.model.json.JSONModel;e.setData({cols:[{label:"Personnal Number",template:"pernr"},{label:"Employee Name",template:"ename"},{label:"Email ID",template:"email"},{label:"Organizational Unit",template:"OrgUnitDescription"},{label:"Personnel Area",template:"PersonnelAreaDescription"},{label:"Personnel Subarea",template:"PersonnelSubareaDescription"}]});return e}catch(e){sap.m.MessageToast.show("Error !!!")}}function T(e,t,a,r,s,o,n,l,i){try{return new sap.ui.comp.filterbar.FilterGroupItem({groupTitle:e,groupName:t,name:a,label:r,control:new sap.m.Input(s,{placeholder:o,type:sap.m.InputType.Text,showSuggestion:true,liveChange:function(){if(this.getValue().length>0){this.bindAggregation("suggestionItems",n,new sap.ui.core.Item({key:l,text:i}))}}})})}catch(e){}}function I(e){try{var t=new sap.ui.comp.filterbar.FilterBar({advancedMode:true,filterBarExpanded:true,filterGroupItems:[T("empGrp","gn1","n1","Personel Number","searchInput1","Search Personel Number","/EmpInfo","{pernr}","{pernr}"),T("empGrp","gn1","n2","Employee Name","searchInput2","Search Employee Name","/EmpInfo","{ename}","{ename}"),T("empGrp","gn1","n5","Email ID","searchInput5","Search Email ID","/EmpInfo","{srch_email}","{srch_email}"),new sap.ui.comp.filterbar.FilterGroupItem("searchInput6",{groupTitle:"empGrp",groupName:"gn1",name:"n6",label:"Organizational Unit",control:new sap.m.Input({placeholder:"Enter Organizational Unit"})}),T("empGrp","gn1","n7","Personnel Area","searchInput7","Search Personnel Area","/PArea","{Persa}","{Persa} - {Name1}"),T("empGrp","gn1","n8","Personnel Subarea","searchInput8","Search Personnel Subarea","/PSArea","{Persa}","{Persa} - {Btext}")],search:function(t){var a=t.getParameter("selectionSet");var r=a[0].getValue();var s=a[1].getValue();var o=a[2].getValue();var n=a[3].getValue();var l=a[4].getValue();var i=a[5].getValue();var u=[new sap.ui.model.Filter("pernr","Contains",r),new sap.ui.model.Filter("ename","Contains",s),new sap.ui.model.Filter("srch_email","Contains",o),new sap.ui.model.Filter("orgeh","Contains",n),new sap.ui.model.Filter("werks","Contains",l),new sap.ui.model.Filter("btrtl","Contains",i)];p(u,e)}});return t}catch(e){sap.m.MessageToast.show("Error in filter bar")}}},true);