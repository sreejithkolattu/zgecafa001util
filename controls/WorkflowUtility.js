sap.ui.define(["jquery.sap.global","sap/ui/core/Control"],function(e,n){"use strict";return{handleLocking:function(n,a,i,o,s){var d=n;if(a===undefined||a===null||a===""){sap.m.MessageToast.show(" Workitem id is missing");return false}var u="/sap/opu/odata/sap/";u+=i?"":"Y88GECAGS004_SRV/";var c=new sap.ui.model.odata.v2.ODataModel(u);c.callFunction("/Check_Wi_Lock",{method:"GET",urlParameters:{Wid:a},success:function(e,n){if("addEventListener"in window){window.addEventListener("beforeunload",r.bind(this,a,i),this)}else if("attachEvent"in window){window.attachEvent("onbeforeunload",r.bind(this,a,i),this)}if(sap.ui.getCore().byId("backBtn")!==undefined)sap.ui.getCore().byId("backBtn").attachBrowserEvent("click",r.bind(this,a,i),this);if(sap.ui.getCore().byId("homeBtn")!==undefined)sap.ui.getCore().byId("homeBtn").attachBrowserEvent("click",t.bind(this,a,i),this);if(o)o(e,n)},error:function(n){try{var a=e.parseJSON(n.responseText).error.innererror.errordetails[0].message}catch(e){a="An unexpected error has occurred. Contact your administrator."}if(s)s(a,n)}})},handleUnLocking:function(n,a,i,o,s){var d=n;if(a===undefined||a===null||a===""){sap.m.MessageToast.show(" Workitem id is missing");return false}var u="/sap/opu/odata/sap";u+=i?"":"Y88GECAGS004_SRV/";var c=new sap.ui.model.odata.v2.ODataModel(u);c.callFunction("/Unlock_Wid",{method:"POST",urlParameters:{Wid:a},success:function(e,n){if("removeEventListener"in window){window.removeEventListener("beforeunload",r)}else if("detachEvent"in window){window.detachEvent("onbeforeunload",r)}if(sap.ui.getCore().byId("backBtn")!==undefined)sap.ui.getCore().byId("backBtn").detachBrowserEvent("click",r,this);if(sap.ui.getCore().byId("homeBtn")!==undefined)sap.ui.getCore().byId("homeBtn").detachBrowserEvent("click",t,this);sap.m.MessageToast.show(" Your Work item have unlocked !!!");if(o)o(e,n)},error:function(n){try{var a=e.parseJSON(n.responseText).error.innererror.errordetails[0].message}catch(e){a="An unexpected error has occurred. Contact your administrator."}if(s)s(a,n);sap.m.MessageToast.show("Error..!!")}})}};function a(e){var n=n||window.event;if(n){n.returnValue="message"}return"message"}function r(e,n){if(e===undefined||e===null||e===""){sap.m.MessageToast.show(" Workitem id is missing");return false}var a="/sap/opu/odata/sap/Y88GECAGS004_SRV/";var r=new sap.ui.model.odata.v2.ODataModel(a);r.callFunction("/Unlock_Wid",{method:"POST",urlParameters:{Wid:e},success:function(e,n){window.history.go(-1)},error:function(e){}});return false}function t(e,n){if(e===undefined||e===null||e===""){sap.m.MessageToast.show(" Workitem id is missing");return false}var a="/sap/opu/odata/sap/Y88GECAGS004_SRV/";var r=new sap.ui.model.odata.v2.ODataModel(a);r.callFunction("/Unlock_Wid",{method:"POST",urlParameters:{Wid:e},success:function(e,n){var a=sap.ushell.Container.getService("CrossApplicationNavigation");a.toExternal({target:{shellHash:"#"}})},error:function(e){}});return false}},true);