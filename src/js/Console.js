// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

/**
 * Chrome console.* wrapper
 */
function Console() {
}

Console.Type = {
	LOG : "log",
	DEBUG : "debug",
	INFO : "info",
	WARN : "warn",
	ERROR : "error",
	GROUP : "group",
	GROUP_COLLAPSED : "groupCollapsed",
	GROUP_END : "groupEnd",
	TABLE : "table",
	COUNT : "count"
};

/**
 * Chrome console.* wrapper call generator
 * @param {String} type
 * @param {String} format
 * @param {Array} args
 */
Console.addMessage = function(/* type, format, args */) {
	chrome.extension.sendRequest({
		command : "sendToConsole",
		tabId : chrome.devtools.tabId,
		args : escape(JSON.stringify(Array.prototype.slice.call(arguments, 0)))
	});
};

// Generate Console output methods, i.e. Console.log(), Console.debug() etc.
(function() {
	var type, method_name,
		console_types = Object.getOwnPropertyNames(Console.Type);
	for (type = 0; type < console_types.length; ++type) {
		method_name = Console.Type[console_types[type]];
		Console[method_name] = Console.addMessage.bind(Console, method_name);
	}
})();
