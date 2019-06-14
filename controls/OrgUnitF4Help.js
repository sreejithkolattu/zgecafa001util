sap.ui.define(["jquery.sap.global","sap/ui/model/Filter","sap/ui/comp/filterbar/FilterBar","sap/ui/model/FilterOperator","sap/ui/comp/valuehelpdialog/ValueHelpDialog"],function(e,t,a,s,o){"use strict";return{showValueHelpDialog:function(e,t){try{t=t===null||t===undefined?h():t;t.control=!p(t.control)?!p(t.isFragment)?sap.ui.core.Fragment.byId(e.createId(t.fragmentName),t.idOfUIElement):e.getView().byId(t.idOfUIElement):t.control;t.title=!p(t.title)?"Org ID":t.title;t.supportMultiselect=!p(t.supportMultiselect)?true:false;t.isFragment=t.isFragment!==""&&t.isFragment?true:false;t.getToken=t.getToken!==""&&t.getToken?true:false;if(e.myDialog!==undefined){e.myDialog.destroy()}e.myDialog=r(e,t)}catch(e){m(e)}}};function r(e,t){try{if(!p(t.reqestedField)){t.reqestedField="OrgId"}var a=new sap.ui.comp.valuehelpdialog.ValueHelpDialog(e.createId("F4H"),{basicSearchText:t.inputValue,title:t.title,supportMultiselect:t.multiSelect,supportRanges:false,supportRangesOnly:false,key:"OrgId",descriptionKey:"OrgDesc",ok:function(e){var s=a.getTable();var o=s.getSelectedIndices();var r=sap.ui.getCore().getModel().getProperty("/");r=[];for(var n=0;n<o.length;n++){r.push(s.getModel().getProperty("/"+String(o[n])))}if(f(t.control)){try{if(t.getToken&&t.control.getEnableMultiLineMode()){t.control.setTokens(e.getParameter("tokens"))}else if(!t.getToken){t.control.setValue(r[0][t.reqestedField])}}catch(e){sap.m.MessageToast.show("Token assingment failed.")}if(t.control.getModel(t.oModel)!==undefined){if(t.control.getModel(t.oModel).getData().length>0){r.forEach(function(e){t.control.getModel(t.oModel).getData().push(e)})}else{t.control.getModel(t.oModel).setData(r)}t.control.getModel(t.oModel).refresh()}else if(t.oModel!==""&&t.oModel!==undefined){var l=new sap.ui.model.json.JSONModel;l.setData(r);t.control.setModel(l,t.oModel)}}else{sap.m.MessageToast.show("Element is not available !!!")}a.close()},cancel:function(e){sap.m.MessageToast.show("Cancel pressed!");a.close()},afterClose:function(){a.destroy()}});sap.ui.getCore().setModel(M());a.getTable().setModel(y(t),"columns");a.getTable().setModel(n());a.getTable().bindRows("/");a.setRangeKeyFields([{label:"Personal ID",key:"OrgId"},{label:"Org Description",key:"OrgDesc"}]);try{var s=t.fragmentName!==undefined&&t.fragmentName.length>0?sap.ui.core.Fragment.byId(e.createId(t.fragmentName),t.idOfUIElement):e.getView().byId(t.idOfUIElement);if(f(t.idOfUIElement)&&s!==undefined&&t.getToken&&t.oModel.length===0){a.setTokens(s.getTokens())}}catch(e){sap.m.MessageToast.show("Token assingment failed.")}if(p(t.reqestedField)){l(e,a,t)}a.addStyleClass(e.theTokenInput!==undefined&&e.theTokenInput.$().closest(".sapUiSizeCompact").length>0?"sapUiSizeCompact":"sapUiSizeCozy");a.open();a.update();return a}catch(e){m(e)}}function n(){try{var e=new sap.ui.model.json.JSONModel;e.setData([]);return e}catch(e){sap.m.MessageToast.show("Error !!!")}}function l(e,t,a){try{if(a.reqestedField===undefined){a.reqestedField="OrgId"}var s=I(t);s.setModel(e.getView().getModel("suggetionModel"));t.setFilterBar(s)}catch(e){sap.m.MessageToast.show("Error !!!")}}function i(e,t){try{var a=new sap.ui.model.json.JSONModel;a.attachEventOnce("requestCompleted",function(e){var t=e.getParameter("url").split("/")[e.getParameter("url").split("/").length-1];this.getView().getModel("suggetionModel").getData().EmpInfo=a.getData().d.results;this.getView().getModel("suggetionModel").refresh()},t).loadData(e)}catch(e){return[]}}function g(e){try{var t=e.getView().getModel("suggetionModel");if(t!==undefined){if(t.getData().EmpInfo.length<1){i("/sap/opu/odata/sap/ZGEOM_C_ORG_VALUEHELP_CDS/ZGEOM_C_ORG_VALUEHELP('20190503')/Set",e)}}}catch(e){sap.m.MessageToast.show("Error !!!")}}function d(t,a){try{a.setBusy(true);var s="/sap/opu/odata/sap/ZGEOM_C_ORG_VALUEHELP_CDS/ZGEOM_C_ORG_VALUEHELP('20190503')";var o="Set?sap-client=110";var r=new sap.ui.model.odata.ODataModel(s,false);r.read(o,{success:e.proxy(u,a),error:e.proxy(c,a)})}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function u(e,t,a){try{this.getTable().getModel().oData=e.results;this.getTable().getModel().refresh();this.setBusy(false)}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function c(e,t,a){try{this.setBusy(false);sap.m.MessageToast.show("Error while retreaving data !!!")}catch(e){sap.m.MessageToast.show("Error !!!");this.setBusy(false)}}function p(e){return e!==null&&e!==undefined}function f(e){return e!==null&&e!==undefined&&e!==""}function m(e){try{sap.m.MessageToast.show("Error !!!"+e.message);if(e.message.indexOf("adding element with duplicate id")!==-1){if(sap.ui.getCore().byId(e.message.split("'")[1])!==undefined){sap.ui.getCore().byId(e.message.split("'")[1]).destroy()}}}catch(e){}}function h(){return{title:"Org ID",control:null,getToken:true,idOfUIElement:"",reqestedField:"OrgId",multiSelect:false,inputValue:"",isFragment:false,view:"",oModel:"",fragmentName:""}}function M(){try{var e=[];var t=new sap.ui.model.json.JSONModel;t.setData(e);sap.ui.getCore().setModel(t);return t}catch(e){sap.m.MessageToast.show("Error !!!")}}function y(){try{var e=new sap.ui.model.json.JSONModel;e.setData({cols:[{label:"Organizational Unit",template:"OrgUnit"},{label:"Organization Description",template:"OrgUnitDesc"}]});return e}catch(e){sap.m.MessageToast.show("Error !!!")}}function O(e,t,a,s,o,r,n,l,i,g){try{return new sap.ui.comp.filterbar.FilterGroupItem({groupTitle:e,groupName:t,name:a,label:s,visible:g,control:new sap.m.Input(o,{placeholder:r,type:sap.m.InputType.Text,showSuggestion:true,liveChange:function(){if(this.getValue().length>0){this.bindAggregation("suggestionItems",n,new sap.ui.core.Item({key:l,text:i}))}}})})}catch(e){}}function I(e,t){try{var a=new sap.ui.comp.filterbar.FilterBar({advancedMode:true,filterBarExpanded:true,filterGroupItems:[O("empGrp","gn1","n1","Org ID","searchInput1","Search Org ID","/","{OrgId}","{OrgId}"),O("empGrp","gn1","n2","Org Description","searchInput2","Search Org Description","/","{OrgDesc}","{OrgDesc}")],search:function(t){var a=t.getParameter("selectionSet");var s=a[0].getValue();var o=a[1].getValue();var r=[new sap.ui.model.Filter("OrgId","Contains",s),new sap.ui.model.Filter("OrgDesc","Contains",o)];d(r,e)}});return a}catch(e){sap.m.MessageToast.show("Error in filter bar")}}},true);