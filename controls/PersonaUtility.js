sap.ui.define(["jquery.sap.global","sap/ui/core/Control"],function(e,t){"use strict";return{handleRoleBasedPersona:function(e){var t=e;var a="/sap/opu/odata/sap/ZGECAGS010_SRV/";var n=new sap.ui.model.odata.v2.ODataModel(a);n.read("/MultiplePersonaSet",{success:function(e,a){if(e!==undefined&&e.results!==undefined&&e.results.length>1){t._oDialog=sap.ui.xmlfragment("CLMPRJ_ID","zgecafa001util.zgecafa001util.fragments.PersonaSelectionView",t);t._oDialog.setModel(new sap.ui.model.json.JSONModel(e));t._oDialog.open();sap.ui.core.Fragment.byId("CLMPRJ_ID","btnOk").attachPress(o);var n=sap.ui.core.Fragment.byId("CLMPRJ_ID","idPersonaListItem").getItems()[0];sap.ui.core.Fragment.byId("CLMPRJ_ID","idPersonaListItem").setSelectedItem(n,true)}else{t.onPersonaSelection()}},error:function(e){sap.m.MessageToast.show("Data not saved..!!")}})}};function a(e){var t=e.getSource().getParent();var a=e.getSource().getSelectedItem().getBindingContext().getObject();t.getParent().setModel(a,"PersonaModel")}function o(e){var t=this;var a=e.getSource().getParent();var o="/sap/opu/odata/sap/ZGECAGS010_SRV/";var n=new sap.ui.model.odata.v2.ODataModel(o);var s=sap.ui.core.Fragment.byId("CLMPRJ_ID","idPersonaListItem").getSelectedItem().getBindingContext().getObject();n.create("/MultiplePersonaSet",s,{success:function(e,a){try{t.onPersonaSelection()}catch(e){sap.m.MessageBox.error("Please implement 'onPersonaSelection' method")}},error:function(e){sap.m.MessageToast.error("Data not saved..!!");return}});a.close();a.destroy();a=undefined}},true);