sap.ui.require.preload({
	"zgecafa001util/zgecafa001util/controls/EmployeeInfoButton.js":function(){/*!
 * ${copyright}
 */
sap.ui.define(["jquery.sap.global","./../library","sap/m/Button"],function(e,t,o){"use strict";var r=o.extend("zgecafa001util.zgecafa001util.controls.EmployeeInfoButton",{metadata:{events:{employeeHover:{}}},onmouseover:function(e){this.fireEmployeeHover()},renderer:{}});return r},true);
},
	"zgecafa001util/zgecafa001util/controls/ErrorUtility.js":function(){sap.ui.define(["jquery.sap.global","sap/ui/core/Control"],function(e,t){"use strict";return{handleOdataError:function(t,s){var o=new sap.ui.model.resource.ResourceModel({bundleUrl:"/i18n/i18nTest.properties"});var r=new sap.ui.model.json.JSONModel({Title:s.message+":"+s.statusText,SubTitle:e.parseXML(s.responseText).querySelector("message").textContent,BtnOkText:"OK"});t._oDialog=sap.ui.xmlfragment("oDataError","ytestss.ytestss.view.GenericError",this);t._oDialog.setModel(r);t._oDialog.addStyleClass("sapUiSizeCompact");t._oDialog.open()}};function s(t){return e.parseXML(t.response.responseText).querySelector("message").textContent}},true);
},
	"zgecafa001util/zgecafa001util/controls/Example.js":function(){/*!
 * ${copyright}
 */
sap.ui.define(["jquery.sap.global","./../library","sap/ui/core/Control"],function(e,a,t){"use strict";var r=t.extend("zgecafa001util.zgecafa001util.controls.Example",{metadata:{library:"zgecafa001util.zgecafa001util",properties:{text:{type:"string",group:"Misc",defaultValue:null}},events:{press:{}}}});return r},true);
},
	"zgecafa001util/zgecafa001util/controls/ExampleRenderer.js":function(){/*!
 * ${copyright}
 */
sap.ui.define(["jquery.sap.global"],function(){"use strict";var e={};e.render=function(e,t){e.write("<div");e.writeControlData(t);e.addClass("sapRULTExample");e.writeClasses();e.write(">");e.writeEscaped(t.getText());e.write("</div>")};return e},true);
},
	"zgecafa001util/zgecafa001util/controls/FormElementsUtility.js":function(){sap.ui.define(["jquery.sap.global","sap/ui/model/Filter","sap/ui/comp/filterbar/FilterBar","sap/ui/model/FilterOperator","sap/ui/comp/valuehelpdialog/ValueHelpDialog"],function(e,t,a,r,s){"use strict";return{showValueHelpDialog:function(e,t){try{t=t===null||t===undefined?E():t;t.autoFill=!h(t.autoFill)||t.autoFill?true:false;t.control=!h(t.control)?!h(t.isFragment)?sap.ui.core.Fragment.byId(e.createId(t.fragmentName),t.idOfUIElement):e.getView().byId(t.idOfUIElement):t.control;t.title=!h(t.title)?"Personnel Number":t.title;t.multiSelect=h(t.multiSelect)?t.multiSelect:false;t.isFragment=t.isFragment!==""&&t.isFragment?true:false;t.getToken=t.getToken!==""&&t.getToken?true:false;if(e.vhDialog!==undefined){e.vhDialog.destroy()}e.vhDialog=o(e,t)}catch(e){S(e)}},openQuickView:function(t,a,r){try{if(h(r)){if(!M(a,r)){if(a._oQuickView){a._oQuickView.destroy()}a._oQuickView=sap.ui.xmlfragment(a.createId("QuickView"),"zgecafa001util.zgecafa001util.fragments.EmployeeQuickView",this);a.getView().addDependent(a._oQuickView);g(a,r)}var s=t.getSource();e.sap.delayedCall(0,a,function(){a._oQuickView.openBy(s)})}else{sap.m.MessageToast.show("Employee Number is missing !!!")}}catch(e){S(e)}}};function o(e,t){try{if(!h(t.reqestedField)){t.reqestedField="pernr"}var a=new sap.ui.comp.valuehelpdialog.ValueHelpDialog(e.createId("F4H"),{basicSearchText:t.inputValue,title:t.title,supportMultiselect:t.multiSelect,supportRanges:false,supportRangesOnly:false,key:"pernr",descriptionKey:"nachn",ok:function(r){var s=a.getTable();var o=s.getSelectedIndices();var n=sap.ui.getCore().getModel().getProperty("/");n=[];for(var l=0;l<o.length;l++){n.push(s.getModel().getProperty("/"+String(o[l])))}if(!t.autoFill){try{e.onValueHelpSelection(n,t.scenario);a.close()}catch(e){sap.m.MessageToast.show(" Implement of onValueHelpSelection(oModel) is missing")}}else if(w(t.control)){try{if(t.getToken&&t.control.getEnableMultiLineMode()){t.control.setTokens(r.getParameter("tokens"));a.close()}else if(!t.getToken){t.control.setValue(n[0][t.reqestedField]);a.close()}}catch(e){sap.m.MessageToast.show("Token assingment failed.")}if(t.control.getModel(t.oModel)!==undefined){if(t.control.getModel(t.oModel).getData().length>0){n.forEach(function(e){t.control.getModel(t.oModel).getData().push(e)})}else{t.control.getModel(t.oModel).setData(n)}t.control.getModel(t.oModel).refresh()}else if(t.oModel!==""&&t.oModel!==undefined){var i=new sap.ui.model.json.JSONModel;i.setData(n);t.control.setModel(i,t.oModel)}}else{sap.m.MessageToast.show("Element is not available !!!")}a.close()},cancel:function(e){sap.m.MessageToast.show("Cancel pressed!");a.close()},afterClose:function(){a.destroy()}});sap.ui.getCore().setModel(D());a.getTable().setModel(v(),"columns");a.getTable().setModel(l());a.getTable().bindRows("/");a.setRangeKeyFields([{label:"Personnel ID",key:"pernr"},{label:"Employee Name",key:"nachn"}]);try{var r=t.fragmentName!==undefined&&t.fragmentName.length>0?sap.ui.core.Fragment.byId(e.createId(t.fragmentName),t.idOfUIElement):e.getView().byId(t.idOfUIElement);if(w(t.idOfUIElement)&&r!==undefined&&t.getToken&&t.oModel.length===0){a.setTokens(r.getTokens())}}catch(e){sap.m.MessageToast.show("Token assingment failed.")}if(h(t.reqestedField)){i(e,a,t.reqestedField)}a.addStyleClass(e.theTokenInput!==undefined&&e.theTokenInput.$().closest(".sapUiSizeCompact").length>0?"sapUiSizeCompact":"sapUiSizeCozy");a.open();a.update();return a}catch(e){S(e)}}function n(e){if(e===undefined){sap.m.MessageToast.show("View is not available !!!");return false}else{return true}}function l(){try{var e=new sap.ui.model.json.JSONModel;e.setData([]);return e}catch(e){sap.m.MessageToast.show("Error !!!")}}function i(e,t,a){try{if(a===undefined){a="pernr"}var r;if(e.getView().getModel("suggetionModel")===undefined){r=new sap.ui.model.json.JSONModel({PArea:[],PSArea:[],EmpInfo:[]});e.getView().setModel(r,"suggetionModel")}var s=P(t);s.setModel(e.getView().getModel("suggetionModel"));u(e);var o=new sap.m.SearchField({placeholder:"Search",search:function(e){var r=e.getParameter("query");var s=[new sap.ui.model.Filter(a,sap.ui.model.FilterOperator.Contains,r)];p(s,t)}});s.setBasicSearch(o);t.setFilterBar(s)}catch(e){sap.m.MessageToast.show("Error !!!")}}function u(e){try{var t=e.getView().getModel("suggetionModel");if(t!==undefined){if(t.getData().PArea.length<1){y("/sap/opu/odata/sap/ZGECAGS006_SRV/PerAreaSet",e)}if(t.getData().PSArea.length<1){y("/sap/opu/odata/sap/ZGECAGS006_SRV/PerSubAreaSet",e)}if(t.getData().EmpInfo.length<1){y("/sap/opu/odata/sap/ZDD_SH_PERSON_CDS/ZDD_SH_PERSON?$select=pernr,ename,srch_email&$filter=substringof('',pernr) and substringof('',ename) and substringof('',srch_email) and substringof('',orgeh) and substringof('',werks) and substringof('',btrtl)",e)}}}catch(e){sap.m.MessageToast.show("Error !!!")}}function p(t,a){try{a.setBusy(true);var r="/sap/opu/odata/sap/ZDD_SH_PERSON_CDS/";var s="ZDD_SH_PERSON";var o=new sap.ui.model.odata.ODataModel(r,false);o.read(s,{filters:t,success:e.proxy(c,a),error:e.proxy(d,a)})}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function c(e,t,a){try{this.getTable().getModel().oData=e.results;this.getTable().getModel().refresh();this.setBusy(false)}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function d(e,t,a){try{this.setBusy(false);sap.m.MessageToast.show("Error while retreaving data !!!")}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function g(t,a){try{if(h(a)){var r="/sap/opu/odata/sap/ZGECAGS006_SRV/";var s="EmpCardSet(Pernr='"+a+"')";var o=new sap.ui.model.odata.ODataModel(r,false);o.read(s,{success:e.proxy(m,t),error:e.proxy(f,t)})}}catch(e){sap.m.MessageToast.show("Error !!!")}}function m(e,t,a){try{var r="sap-icon://employee";if(e.Photo.length===0){e.Photo=r}var s={oEmpInfoData:[{pernr:e.Pernr,pageId:e.Pernr,header:"Employee Details",icon:e.Photo,title:e.Ename,description:e.PosName,groups:[{heading:"Contact Details",elements:[{label:"Mobile",value:e.Mobile,elementType:sap.m.QuickViewGroupElementType.mobile},{label:"Phone",value:e.Phone,elementType:sap.m.QuickViewGroupElementType.phone},{label:"Email",value:e.Email,emailSubject:"",elementType:sap.m.QuickViewGroupElementType.email}]}]}]};this._oQuickView.setModel(new sap.ui.model.json.JSONModel(s),"empQuickView")}catch(e){sap.m.MessageToast.show("Error !!!")}}function f(e,t,a){try{this.setBusy(false);sap.m.MessageToast.show("Error while retreaving data !!!")}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function h(e){return e!==null&&e!==undefined}function w(e){return e!==null&&e!==undefined&&e!==""}function M(e,t){try{return e._oQuickView!==undefined&&e._oQuickView.getModel("empQuickView").getData()!==undefined&&e._oQuickView.getModel("empQuickView").getData().oEmpInfoData!==undefined&&e._oQuickView.getModel("empQuickView").getData().oEmpInfoData[0].pageId===t}catch(e){return false}}function y(e,t){try{var a=new sap.ui.model.json.JSONModel;a.attachEventOnce("requestCompleted",function(e){var t=e.getParameter("url").split("/")[e.getParameter("url").split("/").length-1];if(a.getData().d!==undefined)if(t.indexOf("PerAreaSet")===0){this.getView().getModel("suggetionModel").getData().PArea=a.getData().d.results}else if(t.indexOf("PerSubAreaSet")===0){this.getView().getModel("suggetionModel").getData().PSArea=a.getData().d.results}else if(t.indexOf("ZDD_SH_PERSON")===0){this.getView().getModel("suggetionModel").getData().EmpInfo=a.getData().d.results}this.getView().getModel("suggetionModel").refresh()},t).loadData(e)}catch(e){return[]}}function S(e){try{sap.m.MessageToast.show("Error !!!"+e.message);if(e.message.indexOf("adding element with duplicate id")!==-1){if(sap.ui.getCore().byId(e.message.split("'")[1])!==undefined){sap.ui.getCore().byId(e.message.split("'")[1]).destroy()}}}catch(e){}}function b(){var e={basicSearchText:"",title:"Personnel Number",multiSelect:false,maxIncludeRanges:"2",supportRanges:false,supportRangesOnly:false,key:"pernr",descriptionKey:"nachn",stretch:sap.ui.Device.system.phone};return e}function E(){return{title:"Personnel Number",control:null,getToken:true,idOfUIElement:"",reqestedField:"pernr",multiSelect:false,inputValue:"",isFragment:false,view:"",oModel:"",fragmentName:"",autoFill:true,scenario:""}}function D(){try{var e=[];var t=new sap.ui.model.json.JSONModel;t.setData(e);sap.ui.getCore().setModel(t);return t}catch(e){sap.m.MessageToast.show("Error !!!")}}function v(){try{var e=new sap.ui.model.json.JSONModel;e.setData({cols:[{label:"Personnal Number",template:"pernr"},{label:"Employee Name",template:"ename"},{label:"Email ID",template:"email"},{label:"Organizational Unit",template:"OrgUnitDescription"},{label:"Personnel Area",template:"PersonnelAreaDescription"},{label:"Personnel Subarea",template:"PersonnelSubareaDescription"}]});return e}catch(e){sap.m.MessageToast.show("Error !!!")}}function T(e,t,a,r,s,o,n,l,i){try{return new sap.ui.comp.filterbar.FilterGroupItem({groupTitle:e,groupName:t,name:a,label:r,control:new sap.m.Input(s,{placeholder:o,type:sap.m.InputType.Text,showSuggestion:true,liveChange:function(){if(this.getValue().length>0){this.bindAggregation("suggestionItems",n,new sap.ui.core.Item({key:l,text:i}))}}})})}catch(e){}}function P(e){try{var t=new sap.ui.comp.filterbar.FilterBar({advancedMode:true,filterBarExpanded:true,filterGroupItems:[T("empGrp","gn1","n1","Personnel Number","searchInput1","Search Personnel Number","/EmpInfo","{pernr}","{pernr}"),T("empGrp","gn1","n2","Employee Name","searchInput2","Search Employee Name","/EmpInfo","{ename}","{ename}"),T("empGrp","gn1","n5","Email ID","searchInput5","Search Email ID","/EmpInfo","{srch_email}","{srch_email}"),new sap.ui.comp.filterbar.FilterGroupItem("searchInput6",{groupTitle:"empGrp",groupName:"gn1",name:"n6",label:"Organizational Unit",control:new sap.m.Input({placeholder:"Enter Organizational Unit"})}),T("empGrp","gn1","n7","Personnel Area","searchInput7","Search Personnel Area","/PArea","{Persa}","{Persa} - {Name1}"),T("empGrp","gn1","n8","Personnel Subarea","searchInput8","Search Personnel Subarea","/PSArea","{Persa}","{Persa} - {Btext}")],search:function(t){var a=t.getParameter("selectionSet");var r=a[0].getValue();var s=a[1].getValue();var o=a[2].getValue();var n=a[3].getValue();var l=a[4].getValue();var i=a[5].getValue();var u=[new sap.ui.model.Filter("pernr","Contains",r),new sap.ui.model.Filter("ename","Contains",s),new sap.ui.model.Filter("srch_email","Contains",o),new sap.ui.model.Filter("orgeh","Contains",n),new sap.ui.model.Filter("werks","Contains",l),new sap.ui.model.Filter("btrtl","Contains",i)];p(u,e)}});return t}catch(e){sap.m.MessageToast.show("Error in filter bar")}}},true);
},
	"zgecafa001util/zgecafa001util/controls/FormUtility.js":function(){sap.ui.define(["jquery.sap.global","sap/ui/core/Control"],function(e,t){"use strict";return{DateFormat:function(e){return new Date((new Date).toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]},ValidateForm:function(e,t){var i=t!==undefined?true:false;var n=true;this.resetValidStates(e);var u=false;var a=e.getView().getControlsByFieldGroupId("fgInput");a.forEach(function(g){try{if(i&&g.getId().indexOf(t)===-1){return}if(r(g,"fgInput")){if(r(g,"fgInputEntry")){u=l(g,e);n=n?f(g):n}}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgSelect");a.forEach(function(g){try{if(i&&g.getId().indexOf(t)===-1){return}if(r(g,"fgSelect")){if(r(g,"fgSelectEntry")){u=l(g,e);n=n?f(g):n}}else if(g.getValueState()==="Error"){u=true}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgCheckBox");a.forEach(function(l){try{if(i&&l.getId().indexOf(t)===-1){return}if(r(l,"fgCheckBoxEntry")){u=g(l,e);n=n?f(l):n}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgRadioButton");a.forEach(function(l){try{if(i&&l.getId().indexOf(t)===-1){return}if(r(l,"fgRadioButtonEntry")){u=g(l,e);n=n?f(l):n}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgRadioButtonGroup");a.forEach(function(l){try{if(i&&l.getId().indexOf(t)===-1){return}if(r(l,"fgRadioButtonGroupEntry")){u=g(l,e);n=n?f(l):n}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgMultiSelect");a.forEach(function(g){try{if(i&&g.getId().indexOf(t)===-1){return}if(r(g,"fgSelect")){if(r(g,"fgMultiSelectEntry")){u=l(g,e);n=n?f(g):n}}else if(g.getValueState()==="Error"){u=true}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgDate");a.forEach(function(r){try{if(i&&r.getId().indexOf(t)===-1){return}if(r.getVisible()&&r.getEnabled()&&r.getValueState()!=="Error"){if(r.getDateValue()===""||r.getDateValue()===null||r.getDateValue()===undefined){u=l(r,e);n=n?f(r):n}}else if(r.getValueState()==="Error"){u=true}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgEmail");a.forEach(function(g){try{if(i&&g.getId().indexOf(t)===-1){return}if(r(g,"fgEmail")){if(g.getRequired()){if(r(g,"fgEmailEntryReq")){u=l(g,e);n=n?f(g):n}}else if(g.getValue().length>0){if(r(g,"fgEmailEntry")){u=l(g,e);n=n?f(g):n}}}else if(g.getValueState()==="Error"){u=true}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgMobile");a.forEach(function(g){try{if(i&&g.getId().indexOf(t)===-1){return}if(r(g,"fgMobile")){if(g.getRequired()){if(r(g,"fgMobileEntryReq")){u=l(g,e);n=n?f(g):n}}else if(g.getValue().length>0){if(r(g,"fgMobileEntry")){u=l(g,e);n=n?f(g):n}}}else if(g.getValueState()==="Error"){u=true}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgNumber");a.forEach(function(g){try{if(i&&g.getId().indexOf(t)===-1){return}if(r(g,"fgNumber")){if(g.getRequired()){if(r(g,"fgNumberEntryReq")){u=l(g,e);n=n?f(g):n}}else if(g.getValue().length>0){if(r(g,"fgNumberEntry")){u=l(g,e);n=n?f(g):n}}}else if(g.getValueState()==="Error"){u=true}}catch(e){}});return u},resetValidStates:function(e){var t=["fgInput","fgSelect","fgDate","fgEmail","fgNumber"];t.forEach(function(t){var r=e.getView().getControlsByFieldGroupId(t);r.forEach(function(e){a(e)})})}};function r(e,t){if(t==="fgInput"&&i(e)){return e.getRequired()&&e.getValueState()!=="Error"}else if((t==="fgSelect"||t==="fgMobile"||t==="fgEmail"||t==="fgNumber"||t==="fgDate")&&i(e)){return e.getValueState()!=="Error"}else if(t==="fgInputEntry"&&i(e)){return e.getValue()===undefined||e.getValue().trim()===""}else if(t==="fgSelectEntry"&&i(e)){return e.getSelectedItemId()===""||e.getSelectedKey()===""||e.getSelectedKey()===undefined}else if(t==="fgMultiSelectEntry"&&i(e)){return e.getSelectedKeys()===""||e.getSelectedKeys()===undefined}else if(t==="fgCheckBoxEntry"&&i(e)){return e.getSelected()===false}else if(t==="fgRadioButtonEntry"&&i(e)){return e.getSelected()===false}else if(t==="fgRadioButtonGroupEntry"&&i(e)){return e.getSelectedIndex()===-1}else if(t==="fgMobileEntryReq"&&i(e)){return n(e,"mobile")}else if(t==="fgMobileEntry"&&i(e)){return!o("mobile").test(e.getValue())}else if(t==="fgEmailEntryReq"&&i(e)){return n(e,"email")}else if(t==="fgEmailEntry"&&i(e)){return!o("email").test(e.getValue())}else if(t==="fgNumberEntryReq"&&i(e)){return n(e,"Numaric")}else if(t==="fgNumberEntry"&&i(e)){return!o("Numaric").test(e.getValue())}else if(t==="fgDateEntry"&&i(e)){return e.getValue()===undefined||e.getDateValue().trim()===""||e.getDateValue()===null||e.getDateValue()===undefined}}function i(e){try{return e.getEnabled()&&e.getVisible()}catch(e){return true}}function n(e,t){try{return e.getValue()===undefined||e.getValue().trim()===""||!o(t).test(e.getValue())}catch(e){return false}}function f(e){try{e.focus();return false}catch(e){return true}}function u(e,t){try{var r="ERROR_";if(e!==null&&e!==undefined){var i=e.split("--")[e.split("--").length-1];r+=i}r=t.getResourceBundle().getText(r);r=r.indexOf("ERROR_")===0?t.getResourceBundle().getText("ERROR_GENERIC"):r;r=r.indexOf("ERROR_")===0?"Invalid Entry":r;return r}catch(e){return"Invalid Entry"}}function l(e,t){try{e.setValueState("Error");e.setValueStateText(u(e.getId(),t));return true}catch(e){}}function g(e,t){try{e.setValueState("Error");return true}catch(e){}}function a(e){try{if(e.getValueState()==="Error"&&e.getVisible()&&e.getEnabled()){e.setValueState("None");e.setValueStateText("")}}catch(e){}}function o(e){if(e==="Numaric"){return/^\d+$/}else if(e==="email"){return/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}else if(e==="mobile"){return/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8,10}$/g}else if(e==="Empty"){return/\S+/}else if(e==="Decimal"){return/\S+/}}},true);
},
	"zgecafa001util/zgecafa001util/controls/FragmentUtility.js":function(){sap.ui.define(["jquery.sap.global","sap/ui/core/Control"],function(e,t){"use strict";return{handleCancelWarningDialog:function(e,t,a){t=t!==null&&t!==undefined?t:o("W");n(e,t,"zgecafa001util.zgecafa001util.fragments.GenericConfirm",a,"btnNo","btnYes")},handleSuccessDialog:function(e,t,a){t=t!==null&&t!==undefined?t:o("S");n(e,t,"zgecafa001util.zgecafa001util.fragments.GenericSuccess",a,"btnOk",null)},handleConfirmationDialog:function(e,t,a){t=t!==null&&t!==undefined?t:o("C");n(e,t,"zgecafa001util.zgecafa001util.fragments.GenericConfirm",a,"btnNo","btnYes")},handleErrorDialog:function(e,t,a){t=t!==null&&t!==undefined?t:o("E");n(e,t,"zgecafa001util.zgecafa001util.fragments.GenericError",a,"btnOk",null)},handleODataErrorDialog:function(e,t,n){t=t!==null&&t!==undefined?t:o("OE");this._dialog=sap.ui.xmlfragment("oDataError","zgecafa001util.zgecafa001util.fragments.GenericODataError",this);this._dialog.setModel(t);this._dialog.open()},handleHintDialog:function(e,t,a){t=t!==null&&t!==undefined?t:o("H");n(e,t,"zgecafa001util.zgecafa001util.fragments.GenericHint",a,"btnOk",null)},handleInfoDialog:function(e,t,a){t=t!==null&&t!==undefined?t:o("I");n(e,t,"zgecafa001util.zgecafa001util.fragments.GenericInfo",a,"btnOk",null)},handleDeleteWarningDialog:function(e,t,a){var i=e;t=t!==null&&t!==undefined?t:o("D");e.getOKControl="Y";n(e,t,"zgecafa001util.zgecafa001util.fragments.GenericConfirm",a,"btnYes","btnNo");sap.ui.core.Fragment.byId(i.createId(a),"btnYes").attachPress(function(e){i.onDeleteConfirmation(e)})}};function n(t,n,o,a,i,l){if(t._oDialog!==undefined){try{t._oDialog.destroy();t._oDialog=undefined}catch(e){}}a=a!==""&&a!==undefined?a:"UTIL_FRAG";t._oDialog=sap.ui.xmlfragment(t.createId(a),o,t);t.getView().addDependent(t._oDialog);e.sap.syncStyleClass("sapUiSizeCompact",t.getView(),t._oDialog);t._oDialog.setModel(n);t._oDialog.open();if(i!==null){sap.ui.core.Fragment.byId(t.createId(a),i).attachPress(function(e){t._oDialog.close();t._oDialog.destroy()})}if(l!==null){sap.ui.core.Fragment.byId(t.createId(a),l).attachPress(function(e){t._oDialog.close();t._oDialog.destroy()})}}function o(e){if(e==="D"){return new sap.ui.model.json.JSONModel({Title:"   Delete Record Warning !!!   ",SubTitle:"Do you want to delete the selected item?",BtnNoText:"NO",BtnYesText:"YES"})}else if(e==="OE"){return new sap.ui.model.json.JSONModel({Title:"HTTP Request failed",SubTitle:"Unexpected error caused!!!",BtnOkText:"OK"})}else if(e==="C"){return new sap.ui.model.json.JSONModel({Title:" You have modified records !!! ",SubTitle:"Do you want to submit the modified record ?",BtnNoText:"NO",BtnYesText:"YES"})}else if(e==="S"){return new sap.ui.model.json.JSONModel({Title:" Successfully updated the record ",SubTitle:"The selected record have submitted successfully",BtnOkText:"OK"})}else if(e==="W"){return new sap.ui.model.json.JSONModel({Title:"  Do you wanted to modify the selected record ?  ",SubTitle:"The selected item will replace the exsisting record",BtnNoText:"NO",BtnYesText:"YES"})}else if(e==="E"){return new sap.ui.model.json.JSONModel({Title:"  The selected record will be deleted  ",SubTitle:"The selected record will be deleted from the database",BtnOkText:"OK"})}else if(e==="H"){return new sap.ui.model.json.JSONModel({Title:" Information ",BodyText:"The message box (sap.m.MessageBox) is a special dialog that allows you to display messages to the user. Compared to the message popover (sap.m.MessagePopover), you can use the message box to display messages that are not related to a field on the UI, such as technical errors",BtnOkText:"OK"})}else if(e==="I"){return new sap.ui.model.json.JSONModel({Title:" You have modified below information ",Lable1:"Personal identification number",Lable2:"NRIC number",Lable3:"Country",Text1:"1232456788907",Text2:"K234235236N",Text3:"Singapoure",BtnOkText:"Ok"})}}},true);
},
	"zgecafa001util/zgecafa001util/controls/SignatureUtility.js":function(){sap.ui.define(["jquery.sap.global","sap/ui/core/Control"],function(e,t){"use strict";return{showSignatureFragment:function(e,t){var n=e;t=t!==""&&t!==undefined?t:"UTIL_FRAG";n._oDialog=sap.ui.xmlfragment(n.createId(t),"zgecafa001util.zgecafa001util.fragments.Signature",n);sap.ui.core.Fragment.byId(n.createId(t),"eSignHtml").setContent("<div class='writepad'> <canvas id='signature-pad' align='center' width='500' height='200' style='border:1px solid lavender; border-radius:5px';></canvas> </div>");n._oDialog.setBusy(true);n._oDialog.open();sap.ui.core.Fragment.byId(n.createId(t),"btnCancel").attachPress(function(e){n._oDialog.close();n._oDialog.destroy()});sap.ui.core.Fragment.byId(n.createId(t),"btnClear").attachPress(function(e){a(n)});sap.ui.core.Fragment.byId(n.createId(t),"btnApply").attachPress(function(e){try{var t=document.getElementById("signature-pad");var a=document.createElement("a");a.href=t.toDataURL("image/png");var r=a.href.split(",")[1];n.onSaveSignature(r);n._oDialog.close();n._oDialog.destroy()}catch(e){sap.m.MessageToast.show(" Have to implement 'onSaveSignature'")}});a(n)},clearSignature:function(e){a(e)}};function a(e){var t=new Image;t.src="/webapp/image/pdf.bmp";var a=document.getElementById("signature-pad");var n=a.getContext("2d");var r=function(e){n.beginPath();n.moveTo(170,80);n.bezierCurveTo(130,100,130,150,230,150);n.bezierCurveTo(250,180,320,180,340,150);n.bezierCurveTo(420,150,420,120,390,100);n.bezierCurveTo(430,40,370,30,340,50);n.bezierCurveTo(320,5,250,20,250,50);n.bezierCurveTo(200,5,150,20,170,80);n.fillStyle="#fff";n.strokeStyle="#444";n.lineWidth=1.5;n.lineCap="round";n.fillRect(0,0,a.width,a.height);var r=n.getImageData(0,0,a.width,a.height);var o=r.data;for(var i=0;i<o.length;i+=4){if(o[i+3]<255){o[i]=255;o[i+1]=255;o[i+2]=255;o[i+3]=255}}n.putImageData(r,0,0);n.drawHorizontalLine=function(e,t,a,n){this.fillStyle=n;this.fillRect(e,t,a,.7)};n.drawHorizontalLine(0,130,500,"blue");n.drawImage(t,2,0)};if(t.complete){r(t)}else{t.onload=r}var o=true;var i=[];var s=[];var u={};var l={};var d=false;function c(){a.removeEventListener("mousemove",g,false);a.removeEventListener("mouseup",m,false);a.removeEventListener("touchmove",g,false);a.removeEventListener("touchend",m,false);document.body.removeEventListener("mouseup",m,false);document.body.removeEventListener("touchend",m,false)}function v(e){var t,n;var r=a.getBoundingClientRect();var o=r.top||0;var i=r.left||0;if(e.changedTouches&&e.changedTouches[0]){t=e.changedTouches[0].pageX-i;n=e.changedTouches[0].pageY-o}else if(e.layerX||0==e.layerX){t=e.clientX-i;n=e.clientY-o}else if(e.offsetX||0==e.offsetX){t=e.offsetX;n=e.offsetY}return{x:t,y:n}}function f(e){e.preventDefault();e.stopPropagation();a.addEventListener("mouseup",m,false);a.addEventListener("mousemove",g,false);a.addEventListener("touchend",m,false);a.addEventListener("touchmove",g,false);document.body.addEventListener("mouseup",m,false);document.body.addEventListener("touchend",m,false);var t=v(e);n.beginPath();i.push("moveStart");n.moveTo(t.x,t.y);i.push(t.x,t.y);u=t}function g(e,t){e.preventDefault();e.stopPropagation();var a=v(e);var r={x:(u.x+a.x)/2,y:(u.y+a.y)/2};if(d){var o=(l.x+u.x+r.x)/3;var s=(l.y+u.y+r.y)/3;i.push(o,s)}else{d=true}n.quadraticCurveTo(u.x,u.y,r.x,r.y);i.push(r.x,r.y);n.stroke();n.beginPath();n.moveTo(r.x,r.y);l=r;u=a}function m(e){c();o=false;n.stroke();i.push("e");d=false}a.addEventListener("touchstart",f,false);a.addEventListener("mousedown",f,false);e._oDialog.setBusy(false)}},true);
},
	"zgecafa001util/zgecafa001util/fragments/BusyDialog.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><BusyDialog id="CreateBusyDialog"/></core:FragmentDefinition>',
	"zgecafa001util/zgecafa001util/fragments/EmployeeQuickView.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><QuickView id="quickView" pages="{ path : \'empQuickView>/oEmpInfoData\', templateShareable : \'true\'}" navigate=".onNavigate"><QuickViewPage\n\t\t\t\tpageId="{empQuickView>pageId}"\n\t\t\t\theader="{empQuickView>header}"\n\t\t\t\ticon="{empQuickView>icon}"\n\t\t\t\ttitle="{empQuickView>title}"\n\t\t\t\ttitleUrl="{empQuickView>titleUrl}"\n\t\t\t\tdescription="{empQuickView>description}"\n\t\t\t\tgroups="{ path : \'empQuickView>groups\', templateShareable : \'true\'}"><QuickViewGroup heading="{empQuickView>heading}" elements="{ path : \'empQuickView>elements\', templateShareable : \'true\'}"><QuickViewGroupElement\n\t\t\t\t\t\tlabel="{empQuickView>label}"\n\t\t\t\t\t\tvalue="{empQuickView>value}"\n\t\t\t\t\t\turl="{empQuickView>url}"\n\t\t\t\t\t\ttype="{empQuickView>elementType}"\n\t\t\t\t\t\tpageLinkId="{empQuickView>pageLinkId}"\n\t\t\t\t\t\temailSubject="{empQuickView>emailSubject}"\n\t\t\t\t\t\ttarget="{empQuickView>target}"\n\t\t\t\t\t\t></QuickViewGroupElement></QuickViewGroup></QuickViewPage></QuickView></core:FragmentDefinition>\n',
	"zgecafa001util/zgecafa001util/fragments/GenericConfirm.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:l="sap.ui.layout" xmlns:html="http://www.w3.org/1999/xhtml"><Dialog class="sapUiResponsiveMargin" showHeader="false"  verticalScrolling="false" horizontalScrolling="false"\n\t\t resizable="false"><VBox class="dialogPadding" alignItems="Center"><HBox class="dialogConfirmationText"><core:Icon src="sap-icon://message-warning" class="dialogConfirmationTitle dialogConfirmTitleFont sapUiLargeMarginBeginEnd sapUiTinyMarginTopBottom" color="#fabd64"/><HBox class="dialogHead" width="100%"><Title text="{/Title}" titleStyle="H1" level="H1" textAlign="Begin" class="dialogConfirmationTitle sapUiLargeMarginBeginEnd sapUiTinyMarginTopBottom"/></HBox></HBox><HBox class="dialogConfirmationText dialogHead"><Title text="{/SubTitle}" level="H2" textAlign="Center" class="dialogConfirmationTitle sapUiTinyMarginBottom"/></HBox><HBox class="dialogPadding5 dialogHead" width="100%"><html:hr width="100%"></html:hr></HBox><HBox class="sapUiTinyMarginTop sapUiSmallMarginBottom sapMFlexBoxJustifyEnd" width="100%"><Button id="btnNo" text="{/BtnNoText}" width="100%" class="dialogMultipleBtn sapUiSmallMarginBegin sapUiTinyMarginTop sapUiSmallMarginBottom"></Button><Button id="btnYes" text="{/BtnYesText}" width="100%" type="Emphasized"\n\t\t\t\t\tclass="dialogMultipleBtn sapUiSmallMarginEnd sapUiTinyMarginTop sapUiSmallMarginBottom"></Button></HBox></VBox></Dialog></core:FragmentDefinition>',
	"zgecafa001util/zgecafa001util/fragments/GenericError.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:l="sap.ui.layout"><Dialog showHeader="false"  verticalScrolling="false" horizontalScrolling="false" resizable="false"><VBox class="dialogPadding" alignItems="Center"><HBox class="dialogStretchText"><core:Icon src="sap-icon://message-error" class="iconSize2 sapUiMediumMarginTopBottom" color="red"/></HBox><HBox class="dialogHead" width="100%"><Title  text="{/Title}" titleStyle="H1" level="H1" width="100%" textAlign="Center" class="dialogTitle sapUiLargeMarginBeginEnd sapUiTinyMarginTopBottom"/></HBox><HBox class="dialogHead"><Title  text="{/SubTitle}" level="H2"  textAlign="Center" class="dialogTitle sapUiTinyMarginBottom"/></HBox><HBox class="sapUiSmallMarginTopBottom"><Button id="btnOk" text="{/BtnOkText}" type="Emphasized" class="dialogSingleBtn sapUiSmallMarginTopBottom"></Button></HBox></VBox></Dialog></core:FragmentDefinition>',
	"zgecafa001util/zgecafa001util/fragments/GenericHint.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:l="sap.ui.layout"><Dialog showHeader="false" verticalScrolling="false" horizontalScrolling="false" contentWidth="50%" resizable="false" class="dialogPadding"><VBox class="dialogPadding"><Toolbar class="textBold" ><Title wrapping="true" text="{/Title}" titleStyle="H1" textAlign="Begin" class="textBold sapUiSmallMarginBeginEnd sapUiTinyMarginTopBottom"/><ToolbarSpacer/><core:Icon src="sap-icon://decline" id="btnOk" color="#000000" class="iconSize1 sapUiSmallMarginEnd"/></Toolbar><VBox justifyContent="Start" alignItems="Start"><Title wrapping="true"\n\t\t\t\ttext="{/BodyText}"\n\t\t\t\tlevel="H2" textAlign="Begin" class="sapUiSmallMarginBeginEnd sapUiSmallMarginTopBottom"/></VBox></VBox></Dialog></core:FragmentDefinition>',
	"zgecafa001util/zgecafa001util/fragments/GenericInfo.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:l="sap.ui.layout"><Dialog showHeader="false" type="Message"  verticalScrolling="false" horizontalScrolling="false" \n\t\tresizable="false"><VBox class="dialogPadding dialogStretchText" alignItems="Center" ><HBox class="dialogStretchText"><core:Icon src="sap-icon://sys-enter-2" class="iconSize2 sapUiTinyMarginTop" color="#64E4CE"/></HBox><HBox class="dialogHead" width="100%"><Title text="{/Title}" titleStyle="H1" level="H1" textAlign="Center" class="dialogTitle sapUiLargeMarginBeginEnd sapUiTinyMarginTopBottom"/></HBox><l:HorizontalLayout class=" sapUiNoMarginBegin"><l:content><l:VerticalLayout class=" sapUiNoMarginBottom sapUiContentPadding sapUiNoMarginBegin"><l:content><Text class="sapUiTinyMarginBottom" text="{/Label1}"></Text><Text class="sapUiTinyMarginBottom" text="{/Label2}"></Text><Text class="sapUiTinyMarginBottom" text="{/Label3}"></Text></l:content></l:VerticalLayout><l:VerticalLayout class="sapUiNoMarginBottom sapUiContentPadding sapUiNoMarginBegin"><l:content><Text class="sapUiTinyMarginBottom" text="{/Text1}"></Text><Text class="sapUiTinyMarginBottom" text="{/Text2}"></Text><Text class="sapUiTinyMarginBottom" text="{/Text3}"></Text></l:content></l:VerticalLayout></l:content></l:HorizontalLayout><HBox class="sapUiNoMarginTop sapUiTinyMarginBottom"><Button id="btnOk" text="{/BtnOkText}"  width="100%" type="Emphasized"\n\t\t\t\t\tclass="dialogSingleBtn sapUiSmallMarginEnd sapUiNoMarginTop "></Button></HBox></VBox></Dialog></core:FragmentDefinition>',
	"zgecafa001util/zgecafa001util/fragments/GenericODataError.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:l="sap.ui.layout"><Dialog showHeader="false"  verticalScrolling="false" horizontalScrolling="false" resizable="false"><VBox class="dialogPadding" alignItems="Center"><HBox class="dialogStretchText"><core:Icon src="sap-icon://message-error" class="iconSize2 sapUiMediumMarginTopBottom" color="red"/></HBox><HBox class="dialogHead" width="100%"><Title  text="{/Title}" titleStyle="H1" level="H1" width="100%" textAlign="Center" class="dialogTitle sapUiLargeMarginBeginEnd sapUiTinyMarginTopBottom"/></HBox><HBox><Title  text="{/SubTitle}" level="H2"  textAlign="Center" class="dialogTitle sapUiTinyMarginBottom"/></HBox><HBox class="sapUiSmallMarginTopBottom"><Button id="btnOk" text="{/BtnOkText}" type="Emphasized" class="dialogSingleBtn sapUiSmallMarginTopBottom"></Button></HBox></VBox></Dialog></core:FragmentDefinition>',
	"zgecafa001util/zgecafa001util/fragments/GenericSuccess.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:l="sap.ui.layout"><Dialog showHeader="false"  verticalScrolling="false"  horizontalScrolling="false"  resizable="false"><VBox class="dialogPadding" alignItems="Center"><HBox class="dialogStretchText" ><core:Icon src="sap-icon://sys-enter" class="iconSize2 sapUiMediumMarginTopBottom" color="#64E4CE"/></HBox><HBox class="dialogHead" width="100%"><Title  text="{/Title}"  titleStyle="H1" level="H1" class="dialogTitle sapUiLargeMarginBeginEnd sapUiTinyMarginTopBottom" textAlign="Center" /></HBox><HBox class="dialogHead" width="100%"><Title  text="{/SubTitle}" level="H2" class="dialogTitle sapUiTinyMarginBottom sapUiLargeMarginBegin sapUiLargeMarginEnd" textAlign="Center"/></HBox><HBox class="sapUiSmallMarginTopBottom"><Button id="btnOk" text="{/BtnOkText}" press="onCancel" width="100%" type="Emphasized" class="dialogBtnMinWidth sapUiSmallMarginTopBottom" ></Button></HBox></VBox></Dialog></core:FragmentDefinition>',
	"zgecafa001util/zgecafa001util/fragments/GenericWarning.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:l="sap.ui.layout"><Dialog class="sapUiResponsiveMargin" showHeader="false"  verticalScrolling="false" horizontalScrolling="false"\n\t\t resizable="false"><VBox class="dialogStretchText" alignItems="Center"><HBox class="dialogStretchText"><core:Icon src="sap-icon://message-warning" class="iconSize2 sapUiMediumMarginTopBottom" color="#fabd64"/><core:InvisibleText id="frgInvTxt" text=""/></HBox><HBox class="dialogStretchText dialogHead" width="100%"><Title text="{/Title}" titleStyle="H1" level="H1" textAlign="Center" class="dialogTitle sapUiLargeMarginBeginEnd sapUiTinyMarginTopBottom"/></HBox><HBox class="dialogStretchText" width="100%"><Title text="{/SubTitle}" level="H2" textAlign="Center" class="dialogTitle sapUiTinyMarginBottom"/></HBox><HBox class="sapUiSmallMarginTopBottom"><Button id="btnNo" text="{/BtnNoText}" width="100%" class="dialogMultipleBtn sapUiSmallMarginBegin sapUiSmallMarginTopBottom "></Button><Button id="btnYes" text="{/BtnYesText}" width="100%" type="Emphasized"\n\t\t\t\t\tclass="dialogMultipleBtn sapUiSmallMarginEnd sapUiSmallMarginTopBottom "></Button></HBox></VBox></Dialog></core:FragmentDefinition>',
	"zgecafa001util/zgecafa001util/fragments/MOEEmployeeQuickView.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><QuickView id="quickView" pages="{ path : \'/oEmpInfoData\', templateShareable : \'true\'}" navigate=".onNavigate"><QuickViewPage\n\t\t\t\tpageId="{pageId}"\n\t\t\t\theader="{header}"\n\t\t\t\ticon="{icon}"\n\t\t\t\ttitle="{title}"\n\t\t\t\ttitleUrl="{titleUrl}"\n\t\t\t\tdescription="{description}"\n\t\t\t\tgroups="{ path : \'groups\', templateShareable : \'true\'}"><QuickViewGroup heading="{heading}" elements="{ path : \'elements\', templateShareable : \'true\'}"><QuickViewGroupElement\n\t\t\t\t\t\tlabel="{label}"\n\t\t\t\t\t\tvalue="{value}"\n\t\t\t\t\t\turl="{url}"\n\t\t\t\t\t\ttype="{elementType}"\n\t\t\t\t\t\tpageLinkId="{pageLinkId}"\n\t\t\t\t\t\temailSubject="{emailSubject}"\n\t\t\t\t\t\ttarget="{target}"\n\t\t\t\t\t\t></QuickViewGroupElement></QuickViewGroup></QuickViewPage></QuickView></core:FragmentDefinition>\n',
	"zgecafa001util/zgecafa001util/fragments/Signature.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:f="sap.ui.layout.form" xmlns:core="sap.ui.core"><Dialog title="eSignature" contentWidth="510px"><VBox ><core:HTML id="eSignHtml"></core:HTML></VBox><buttons><Button id="btnCancel" text="Cancel" visible="true" class="button1 myRedButton button" press="closeDialog"></Button><Button id="btnClear" text="Clear" visible="true" class="sapUiSmallMarginBegin myRedButton button" press="clearButton"></Button><Button id="btnApply" text="Apply" type="Emphasized" class="button sapUiSmallMarginBegin myRedButton " visible="true" press="clearButton"></Button></buttons></Dialog></core:FragmentDefinition>',
	"zgecafa001util/zgecafa001util/library.js":function(){/*!
 * ${copyright}
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/library"],function(){"use strict";sap.ui.getCore().initLibrary({name:"zgecafa001util.zgecafa001util",version:"1.0.0",dependencies:["sap.ui.core"],types:[],interfaces:[],controls:["zgecafa001util.zgecafa001util.controls.Example"],elements:[]});return zgecafa001util.zgecafa001util},false);
},
	"zgecafa001util/zgecafa001util/manifest.json":'{"_version":"1.7.0","sap.app":{"id":"zgecafa001util.zgecafa001util","type":"library","embeds":[],"i18n":"messagebundle.properties","applicationVersion":{"version":"1.0.0"},"title":"{{title}}","description":"{{description}}","ach":"HRP-LIB","resources":"resources.json","offline":false},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":false},"supportedThemes":["sap_hcb","sap_belize","sap_belize_plus"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.30.0","libs":{"sap.ui.core":{"minUI5Version":"1.30.0"}}},"contentDensities":{"compact":true,"cozy":false}},"sap.platform.hcp":{"uri":""},"sap.fiori":{"registrationIds":[],"archeType":"reusecomponent"}}'
});
