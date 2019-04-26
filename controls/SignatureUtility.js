sap.ui.define(["jquery.sap.global","sap/ui/core/Control"],function(e,t){"use strict";return{showSignatureFragment:function(e,t){var n=e;t=t!==""&&t!==undefined?t:"UTIL_FRAG";n._oDialog=sap.ui.xmlfragment(n.createId(t),"zgecafa001util.zgecafa001util.fragments.Signature",n);sap.ui.core.Fragment.byId(n.createId(t),"eSignHtml").setContent("<div class='writepad'> <canvas id='signature-pad' align='center' width='500' height='200' style='border:1px solid lavender; border-radius:5px';></canvas> </div>");n._oDialog.setBusy(true);n._oDialog.open();sap.ui.core.Fragment.byId(n.createId(t),"btnCancel").attachPress(function(e){n._oDialog.close();n._oDialog.destroy()});sap.ui.core.Fragment.byId(n.createId(t),"btnClear").attachPress(function(e){a(n)});sap.ui.core.Fragment.byId(n.createId(t),"btnApply").attachPress(function(e){try{n.onSaveSignature();n._oDialog.close();n._oDialog.destroy()}catch(e){sap.m.MessageToast.show(" Have to implement 'onSaveSignature'")}});a(n)},clearSignature:function(e){a(e)}};function a(e){var t=new Image;t.src="/webapp/image/pdf.bmp";var a=document.getElementById("signature-pad");var n=a.getContext("2d");var o=function(e){n.beginPath();n.moveTo(170,80);n.bezierCurveTo(130,100,130,150,230,150);n.bezierCurveTo(250,180,320,180,340,150);n.bezierCurveTo(420,150,420,120,390,100);n.bezierCurveTo(430,40,370,30,340,50);n.bezierCurveTo(320,5,250,20,250,50);n.bezierCurveTo(200,5,150,20,170,80);n.fillStyle="#fff";n.strokeStyle="#444";n.lineWidth=1.5;n.lineCap="round";n.fillRect(0,0,a.width,a.height);var o=n.getImageData(0,0,a.width,a.height);var r=o.data;for(var i=0;i<r.length;i+=4){if(r[i+3]<255){r[i]=255;r[i+1]=255;r[i+2]=255;r[i+3]=255}}n.putImageData(o,0,0);n.drawHorizontalLine=function(e,t,a,n){this.fillStyle=n;this.fillRect(e,t,a,.7)};n.drawHorizontalLine(0,130,500,"blue");n.drawImage(t,2,0)};if(t.complete){o(t)}else{t.onload=o}var r=true;var i=[];var s=[];var u={};var l={};var d=false;function c(){a.removeEventListener("mousemove",g,false);a.removeEventListener("mouseup",m,false);a.removeEventListener("touchmove",g,false);a.removeEventListener("touchend",m,false);document.body.removeEventListener("mouseup",m,false);document.body.removeEventListener("touchend",m,false)}function v(e){var t,n;var o=a.getBoundingClientRect();var r=o.top||0;var i=o.left||0;if(e.changedTouches&&e.changedTouches[0]){t=e.changedTouches[0].pageX-i;n=e.changedTouches[0].pageY-r}else if(e.layerX||0==e.layerX){t=e.clientX-i;n=e.clientY-r}else if(e.offsetX||0==e.offsetX){t=e.offsetX;n=e.offsetY}return{x:t,y:n}}function f(e){e.preventDefault();e.stopPropagation();a.addEventListener("mouseup",m,false);a.addEventListener("mousemove",g,false);a.addEventListener("touchend",m,false);a.addEventListener("touchmove",g,false);document.body.addEventListener("mouseup",m,false);document.body.addEventListener("touchend",m,false);var t=v(e);n.beginPath();i.push("moveStart");n.moveTo(t.x,t.y);i.push(t.x,t.y);u=t}function g(e,t){e.preventDefault();e.stopPropagation();var a=v(e);var o={x:(u.x+a.x)/2,y:(u.y+a.y)/2};if(d){var r=(l.x+u.x+o.x)/3;var s=(l.y+u.y+o.y)/3;i.push(r,s)}else{d=true}n.quadraticCurveTo(u.x,u.y,o.x,o.y);i.push(o.x,o.y);n.stroke();n.beginPath();n.moveTo(o.x,o.y);l=o;u=a}function m(e){c();r=false;n.stroke();i.push("e");d=false}a.addEventListener("touchstart",f,false);a.addEventListener("mousedown",f,false);e._oDialog.setBusy(false)}},true);