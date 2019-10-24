sap.ui.define(["jquery.sap.global", "sap/ui/core/Control"], function (jQuery, Control) {
	"use strict";
	/**
	 * @author Sreejith Ravindran
	 * @version ${1.0}
	 * Date: Nov 3, 2018
	 */
	return {
		/**
		 * Function showSignatureFragment (fragInst,fragmentId) 
		 * @param {fragInst} Current Instance 
		 * @param {fragmentId} Id of fragment 
		 * @return {} 
		 * @public
		 */
		showSignatureFragment: function (fragInst,fragmentId) {
			var that = fragInst;
			fragmentId = (fragmentId!==""&&fragmentId!==undefined)?fragmentId:"UTIL_FRAG";
			that._oDialog = sap.ui.xmlfragment(that.createId(fragmentId),"zgecafa001util.zgecafa001util.fragments.Signature", that);
			sap.ui.core.Fragment.byId(that.createId(fragmentId), 'eSignHtml').setContent("<div class='writepad'> <canvas id='signature-pad' align='center' width='500' height='200' style='border:1px solid lavender; border-radius:5px';></canvas> </div>");
			that._oDialog.setBusy(true);
			that._oDialog.open();
			sap.ui.core.Fragment.byId(that.createId(fragmentId), 'btnCancel').attachPress(
				function(oControlEvent) {
            		that._oDialog.close();
					that._oDialog.destroy();
            	}
			);
			sap.ui.core.Fragment.byId(that.createId(fragmentId), 'btnClear').attachPress(
				function(oControlEvent) {
            		 onSignature(that);
            	}
			);
			sap.ui.core.Fragment.byId(that.createId(fragmentId), 'btnApply').attachPress(
				function(oControlEvent) {
					try{
						var canvas = document.getElementById("signature-pad");
						var link = document.createElement('a');
						link.href = canvas.toDataURL("image/png");
						var imgData = link.href.split(',')[1];
						that.onSaveSignature(imgData);
						that._oDialog.close();
						that._oDialog.destroy();
					}catch(e){
            			sap.m.MessageToast.show(" Have to implement 'onSaveSignature'");
					}
            	}
			);
			onSignature(that);
		},
		clearSignature: function (that) {
			onSignature(that);
		}
	};

	//============================================================================================================
	//------------------------------------------------------------------------------------------------------------
	//                Generic Functions for Element utility 
	//------------------------------------------------------------------------------------------------------------

	/**
	 * Function 
	 * @param {function} patternName 
	 * @return {void} 
	 * @public
	 */
	function onSignature(that) {
		
		var base_image = new Image();
		//base_image.src = "/webapp/image/pdf.bmp";
		var canvas = document.getElementById("signature-pad");
		var context = canvas.getContext("2d");
		
		var callback = function(image) {
			context.beginPath();
			context.moveTo(170, 80);
			context.bezierCurveTo(130, 100, 130, 150, 230, 150);
			context.bezierCurveTo(250, 180, 320, 180, 340, 150);
			context.bezierCurveTo(420, 150, 420, 120, 390, 100);
			context.bezierCurveTo(430, 40, 370, 30, 340, 50);
			context.bezierCurveTo(320, 5, 250, 20, 250, 50);
			context.bezierCurveTo(200, 5, 150, 20, 170, 80);
	
			context.fillStyle = "#fff";
			context.strokeStyle = "#444";
			context.lineWidth = 1.5;
			context.lineCap = "round";
			context.fillRect(0, 0, canvas.width, canvas.height);
			var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
			var data = imgData.data;
			for (var i = 0; i < data.length; i += 4) {
				if (data[i + 3] < 255) {
					data[i] = 255;
					data[i + 1] = 255;
					data[i + 2] = 255;
					data[i + 3] = 255;
				}
			}
			context.putImageData(imgData, 0, 0);
			context.drawHorizontalLine = function (left, top, width, color) {
				this.fillStyle = color;
				this.fillRect(left, top, width, 0.7);
			};
			context.drawHorizontalLine(0, 130, 500, "blue");
			context.drawImage(base_image, 2, 0);	
		};
		
		if(base_image.complete) { //check if image was already loaded by the browser
		   callback(base_image);
		}else {
		   base_image.onload = callback;
		}
		

		var disableSave = true;
		var pixels = [];
		var cpixels = [];
		var xyLast = {};
		var xyAddLast = {};
		var calculate = false;
		//functions
		function remove_event_listeners() {
			canvas.removeEventListener('mousemove', on_mousemove, false);
			canvas.removeEventListener('mouseup', on_mouseup, false);
			canvas.removeEventListener('touchmove', on_mousemove, false);
			canvas.removeEventListener('touchend', on_mouseup, false);

			document.body.removeEventListener('mouseup', on_mouseup, false);
			document.body.removeEventListener('touchend', on_mouseup, false);
		}

		function get_coords(e) {
			var x, y;
			var canvasArea = canvas.getBoundingClientRect();
			var offsety = canvasArea.top || 0;
			var offsetx = canvasArea.left || 0;
			if (e.changedTouches && e.changedTouches[0]) {
				x = e.changedTouches[0].pageX - offsetx;
				y = e.changedTouches[0].pageY - offsety;
			} else if (e.layerX || 0 == e.layerX) {
				x = e.clientX - offsetx;
				y = e.clientY - offsety;
			} else if (e.offsetX || 0 == e.offsetX) {
				x = e.offsetX;
				y = e.offsetY;
			}
			return {
				x: x,
				y: y
			};
		};

		function on_mousedown(e) {
			e.preventDefault();
			e.stopPropagation();

			canvas.addEventListener('mouseup', on_mouseup, false);
			canvas.addEventListener('mousemove', on_mousemove, false);
			canvas.addEventListener('touchend', on_mouseup, false);
			canvas.addEventListener('touchmove', on_mousemove, false);
			document.body.addEventListener('mouseup', on_mouseup, false);
			document.body.addEventListener('touchend', on_mouseup, false);

			var xy = get_coords(e);
			context.beginPath();
			pixels.push('moveStart');
			context.moveTo(xy.x, xy.y);
			pixels.push(xy.x, xy.y);
			xyLast = xy;
		};

		function on_mousemove(e, finish) {

			e.preventDefault();
			e.stopPropagation();

			var xy = get_coords(e);
			var xyAdd = {
				x: (xyLast.x + xy.x) / 2,
				y: (xyLast.y + xy.y) / 2
			};

			if (calculate) {
				var xLast = (xyAddLast.x + xyLast.x + xyAdd.x) / 3;
				var yLast = (xyAddLast.y + xyLast.y + xyAdd.y) / 3;
				pixels.push(xLast, yLast);
			} else {
				calculate = true;
			}

			context.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
			pixels.push(xyAdd.x, xyAdd.y);
			context.stroke();
			context.beginPath();
			context.moveTo(xyAdd.x, xyAdd.y);
			xyAddLast = xyAdd;
			xyLast = xy;

		};

		function on_mouseup(e) {
			remove_event_listeners();
			disableSave = false;
			context.stroke();
			pixels.push('e');
			calculate = false;
		};

		canvas.addEventListener('touchstart', on_mousedown, false);
		canvas.addEventListener('mousedown', on_mousedown, false);

		that._oDialog.setBusy(false);

	}

}, /* bExport= */ true);