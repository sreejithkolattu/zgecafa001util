sap.ui.define(["jquery.sap.global","sap/ui/core/Control"],function(e,n){"use strict";return{handleLocking:function(e,n){var a=e;if(n===undefined||n===null||n===""){sap.m.MessageToast.show(" Workitem id is missing");return false}var s="/sap/opu/odata/sap/Y88GECAGS004_SRV/";var i=new sap.ui.model.odata.v2.ODataModel(s);i.callFunction("/Check_Wi_Lock",{method:"GET",urlParameters:{Wid:n},success:function(e,n){if("addEventListener"in window){window.addEventListener("beforeunload",t,this)}else if("attachEvent"in window){window.attachEvent("onbeforeunload",t,this)}if(sap.ui.getCore().byId("backBtn")!==undefined)sap.ui.getCore().byId("backBtn").attachBrowserEvent("click",o,this);if(sap.ui.getCore().byId("homeBtn")!==undefined)sap.ui.getCore().byId("homeBtn").attachBrowserEvent("click",o,this);sap.m.MessageToast.show(" Your Work item have locked !!!")},error:function(e){sap.m.MessageToast.show("Error..!!")}})},handleUnLocking:function(e,n){var a=e;if(n===undefined||n===null||n===""){sap.m.MessageToast.show(" Workitem id is missing");return false}var s="/sap/opu/odata/sap/Y88GECAGS004_SRV/";var i=new sap.ui.model.odata.v2.ODataModel(s);i.read("/Unlock_Wid",{method:"POST",urlParameters:{Wid:n},success:function(e,n){if("removeEventListener"in window){window.removeEventListener("beforeunload",t)}else if("detachEvent"in window){window.detachEvent("onbeforeunload",t)}if(sap.ui.getCore().byId("backBtn")!==undefined)sap.ui.getCore().byId("backBtn").detachBrowserEvent("click",o,this);if(sap.ui.getCore().byId("homeBtn")!==undefined)sap.ui.getCore().byId("homeBtn").detachBrowserEvent("click",o,this);sap.m.MessageToast.show(" Your Work item have unlocked !!!")},error:function(e){sap.m.MessageToast.show("Error..!!")}})}};function t(e){var n=n||window.event;if(n){n.returnValue="message"}return"message"}function o(e){e.preventDefault();var n=new sap.m.Dialog({icon:"sap-icon://SAP-icons-TNT/exceptions",title:"Workitem Locked",content:[new sap.m.Text({text:"Please unlock your workitem"})],endButton:new sap.m.Button({text:"OK",press:function(){n.close()}})});n.open();return false}},true);