sap.ui.define(["jquery.sap.global","sap/ui/core/Control"],function(e,a){"use strict";return{handleRoleBasedPersona:function(e){var a=e;var n="/sap/opu/odata/sap/ZGECAGS010_SRV/";var s=new sap.ui.model.odata.v2.ODataModel(n);s.read("/MultiplePersonaSet",{success:function(e,n){if(e!==undefined&&e.results!==undefined&&e.results.length>1){a._oDialog=sap.ui.xmlfragment("CLMPRJ_ID","zgecafa001util.zgecafa001util.fragments.PersonaSelectionView",a);a._oDialog.setModel(new sap.ui.model.json.JSONModel(e));a._oDialog.open();sap.ui.core.Fragment.byId("CLMPRJ_ID","btnOk").attachPress(o);sap.ui.core.Fragment.byId("CLMPRJ_ID","idPersonaListItem").attachSelectionChange(t)}else{a.onPersonaSelection()}},error:function(e){sap.m.MessageToast.show("Data not saved..!!")}})}};function t(e){var a=e.getSource().getParent();var t=e.getSource().getSelectedItem().getBindingContext().getObject();a.getParent().setModel(t,"PersonaModel")}function o(e){var a=this;var t=e.getSource().getParent();var o="/sap/opu/odata/sap/ZGECAGS010_SRV/";var n=new sap.ui.model.odata.v2.ODataModel(o);var s=t.getModel("PersonaModel");if(s!==undefined){n.create("/MultiplePersonaSet",s,{success:function(e,a){},error:function(e){sap.m.MessageToast.show("Data not saved..!!");return}});t.close();t.destroy();t=undefined}else{return}}},true);