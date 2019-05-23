/*!
 * ${copyright}
 */
sap.ui.define(["jquery.sap.global"],function(){"use strict";var e={};e.render=function(e,t){e.write("<div");e.writeControlData(t);e.addClass("sapRULTExample");e.writeClasses();e.write(">");e.writeEscaped(t.getText());e.write("</div>")};return e},true);