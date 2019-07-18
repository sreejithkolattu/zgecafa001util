/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library zgecafa001util.zgecafa001util.
 */
sap.ui.define(["jquery.sap.global",
		"sap/ui/core/library"
	], // library dependency
	function ( /*jQuery*/ ) {

		"use strict";

		/**
		 * Fiori Library
		 *
		 * @namespace
		 * @name zgecafa001util.zgecafa001util
		 * @author SAP SE
		 * @version 1.0.0
		 * @public
		 */

		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name: "zgecafa001util.zgecafa001util",
			version: "1.0.0",
			dependencies: ["sap.ui.core"],
			types: [],
			interfaces: [],
			controls: [
				"zgecafa001util.zgecafa001util.controls.Example"
			],
			elements: []
		});

		/* eslint-disable */
		return zgecafa001util.zgecafa001util;
		/* eslint-enable */

	}, /* bExport= */ false);