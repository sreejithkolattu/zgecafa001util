sap.ui.define(["jquery.sap.global","sap/ui/core/Control"],function(e,t){"use strict";return{handleRoleBasedPersona:function(t,r,n){var s=t.getMetadata().getManifestEntry("sap.app").id;var i=[new sap.ui.model.Filter("FaId",sap.ui.model.FilterOperator.EQ,s)];var d="/sap/opu/odata/sap/ZGECAGS010_SRV/";var u=new sap.ui.model.odata.v2.ODataModel(d);u.read("/MultiplePersonaSet",{filters:i,success:function(e,i){if(e!==undefined&&e.results!==undefined&&e.results.length>1){t._oDialog=sap.ui.xmlfragment("CLMPRJ_ID","zgecafa001util.zgecafa001util.fragments.PersonaSelectionView",t);t._oDialog.setEscapeHandler(function(){return});t._oDialog.setModel(new sap.ui.model.json.JSONModel(e));t._oDialog.open();sap.ui.core.Fragment.byId("CLMPRJ_ID","btnOk").attachPress(a.bind(this,s,t,r,n));sap.ui.core.Fragment.byId("CLMPRJ_ID","btnCancel").attachPress(o);var d=sap.ui.core.Fragment.byId("CLMPRJ_ID","idPersonaListItem").getItems()[0];sap.ui.core.Fragment.byId("CLMPRJ_ID","idPersonaListItem").setSelectedItem(d,t)}else{if(r!==undefined)r(e.results,i)}},error:function(t){try{var r=e.parseJSON(t.responseText).error.innererror.errordetails[0].message}catch(e){r="An unexpected error has occurred. Contact your administrator."}if(n)n(r,t)}})}};function r(e){var t=e.getSource().getParent();var r=e.getSource().getSelectedItem().getBindingContext().getObject();t.getParent().setModel(r,"PersonaModel")}function a(t,r,a,o){var n=r._oDialog;var s="/sap/opu/odata/sap/ZGECAGS010_SRV/";var i=new sap.ui.model.odata.v2.ODataModel(s);var d=sap.ui.core.Fragment.byId("CLMPRJ_ID","idPersonaListItem").getSelectedItem().getBindingContext().getObject();d.FaId=t;i.create("/MultiplePersonaSet",d,{success:function(e,t){if(a)a(d,e)},error:function(t){try{var r=e.parseJSON(t.responseText).error.innererror.errordetails[0].message}catch(e){r="An unexpected error has occurred. Contact your administrator."}if(o)o(r,t)}});n.close();n.destroy();n=undefined}function o(e){var t=e.getSource().getParent();t.close();t.destroy();t=undefined;window.history.go(-1)}},true);