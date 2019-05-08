sap.ui.define(["jquery.sap.global","sap/ui/core/Control"],function(e,t){"use strict";return{DateFormat:function(e){return new Date((new Date).toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]},ValidateForm:function(e,t){var i=t!==undefined?true:false;var n=true;this.resetValidStates(e);var u=false;var a=e.getView().getControlsByFieldGroupId("fgInput");a.forEach(function(g){try{if(i&&g.getId().indexOf(t)===-1){return}if(r(g,"fgInput")){if(r(g,"fgInputEntry")){u=l(g,e);n=n?f(g):n}}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgSelect");a.forEach(function(g){try{if(i&&g.getId().indexOf(t)===-1){return}if(r(g,"fgSelect")){if(r(g,"fgSelectEntry")){u=l(g,e);n=n?f(g):n}}else if(g.getValueState()==="Error"){u=true}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgCheckBox");a.forEach(function(l){try{if(i&&l.getId().indexOf(t)===-1){return}if(r(l,"fgCheckBoxEntry")){u=g(l,e);n=n?f(l):n}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgRadioButton");a.forEach(function(l){try{if(i&&l.getId().indexOf(t)===-1){return}if(r(l,"fgRadioButtonEntry")){u=g(l,e);n=n?f(l):n}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgRadioButtonGroup");a.forEach(function(l){try{if(i&&l.getId().indexOf(t)===-1){return}if(r(l,"fgRadioButtonGroupEntry")){u=g(l,e);n=n?f(l):n}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgMultiSelect");a.forEach(function(g){try{if(i&&g.getId().indexOf(t)===-1){return}if(r(g,"fgSelect")){if(r(g,"fgMultiSelectEntry")){u=l(g,e);n=n?f(g):n}}else if(g.getValueState()==="Error"){u=true}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgDate");a.forEach(function(r){try{if(i&&r.getId().indexOf(t)===-1){return}if(r.getVisible()&&r.getEnabled()&&r.getValueState()!=="Error"){if(r.getDateValue()===""||r.getDateValue()===null||r.getDateValue()===undefined){u=l(r,e);n=n?f(r):n}}else if(r.getValueState()==="Error"){u=true}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgEmail");a.forEach(function(g){try{if(i&&g.getId().indexOf(t)===-1){return}if(r(g,"fgEmail")){if(g.getRequired()){if(r(g,"fgEmailEntryReq")){u=l(g,e);n=n?f(g):n}}else if(g.getValue().length>0){if(r(g,"fgEmailEntry")){u=l(g,e);n=n?f(g):n}}}else if(g.getValueState()==="Error"){u=true}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgMobile");a.forEach(function(g){try{if(i&&g.getId().indexOf(t)===-1){return}if(r(g,"fgMobile")){if(g.getRequired()){if(r(g,"fgMobileEntryReq")){u=l(g,e);n=n?f(g):n}}else if(g.getValue().length>0){if(r(g,"fgMobileEntry")){u=l(g,e);n=n?f(g):n}}}else if(g.getValueState()==="Error"){u=true}}catch(e){}});a=e.getView().getControlsByFieldGroupId("fgNumber");a.forEach(function(g){try{if(i&&g.getId().indexOf(t)===-1){return}if(r(g,"fgNumber")){if(g.getRequired()){if(r(g,"fgNumberEntryReq")){u=l(g,e);n=n?f(g):n}}else if(g.getValue().length>0){if(r(g,"fgNumberEntry")){u=l(g,e);n=n?f(g):n}}}else if(g.getValueState()==="Error"){u=true}}catch(e){}});return u},resetValidStates:function(e){var t=["fgInput","fgSelect","fgDate","fgEmail","fgNumber"];t.forEach(function(t){var r=e.getView().getControlsByFieldGroupId(t);r.forEach(function(e){a(e)})})}};function r(e,t){if(t==="fgInput"&&i(e)){return e.getRequired()&&e.getValueState()!=="Error"}else if((t==="fgSelect"||t==="fgMobile"||t==="fgEmail"||t==="fgNumber"||t==="fgDate")&&i(e)){return e.getValueState()!=="Error"}else if(t==="fgInputEntry"&&i(e)){return e.getValue()===undefined||e.getValue().trim()===""}else if(t==="fgSelectEntry"&&i(e)){return e.getSelectedItemId()===""||e.getSelectedKey()===""||e.getSelectedKey()===undefined}else if(t==="fgMultiSelectEntry"&&i(e)){return e.getSelectedKeys()===""||e.getSelectedKeys()===undefined}else if(t==="fgCheckBoxEntry"&&i(e)){return e.getSelected()===false}else if(t==="fgRadioButtonEntry"&&i(e)){return e.getSelected()===false}else if(t==="fgRadioButtonGroupEntry"&&i(e)){return e.getSelectedIndex()===-1}else if(t==="fgMobileEntryReq"&&i(e)){return n(e,"mobile")}else if(t==="fgMobileEntry"&&i(e)){return!o("mobile").test(e.getValue())}else if(t==="fgEmailEntryReq"&&i(e)){return n(e,"email")}else if(t==="fgEmailEntry"&&i(e)){return!o("email").test(e.getValue())}else if(t==="fgNumberEntryReq"&&i(e)){return n(e,"Numaric")}else if(t==="fgNumberEntry"&&i(e)){return!o("Numaric").test(e.getValue())}else if(t==="fgDateEntry"&&i(e)){return e.getValue()===undefined||e.getDateValue().trim()===""||e.getDateValue()===null||e.getDateValue()===undefined}}function i(e){try{return e.getEnabled()&&e.getVisible()}catch(e){return true}}function n(e,t){try{return e.getValue()===undefined||e.getValue().trim()===""||!o(t).test(e.getValue())}catch(e){return false}}function f(e){try{e.focus();return false}catch(e){return true}}function u(e,t){try{var r="ERROR_";if(e!==null&&e!==undefined){var i=e.split("--")[e.split("--").length-1];r+=i}r=t.getResourceBundle().getText(r);r=r.indexOf("ERROR_")===0?t.getResourceBundle().getText("ERROR_GENERIC"):r;r=r.indexOf("ERROR_")===0?"Invalid Entry":r;return r}catch(e){return"Invalid Entry"}}function l(e,t){try{e.setValueState("Error");e.setValueStateText(u(e.getId(),t));return true}catch(e){}}function g(e,t){try{e.setValueState("Error");return true}catch(e){}}function a(e){try{if(e.getValueState()==="Error"&&e.getVisible()&&e.getEnabled()){e.setValueState("None");e.setValueStateText("")}}catch(e){}}function o(e){if(e==="Numaric"){return/^\d+$/}else if(e==="email"){return/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}else if(e==="mobile"){return/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g}else if(e==="Empty"){return/\S+/}else if(e==="Decimal"){return/\S+/}}},true);