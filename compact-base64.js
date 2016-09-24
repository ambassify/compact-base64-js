(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Base64"] = factory();
	else
		root["Base64"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Note on escape and encode functions:
	 * These is for Unicode support
	 * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa#Unicode_strings
	 */

	var encode = function (source) {
	    return btoa(encodeURIComponent(source).replace(/%([0-9A-F]{2})/g, function(m, p1) {
	        return String.fromCharCode('0x' + p1);
	    }));
	};

	var decode = function (encoded) {
	    return decodeURIComponent(Array.prototype.map.call(atob(encoded), function(c) {
	        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	    }).join(''));
	};

	module.exports = __webpack_require__(1)(encode, decode);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var toUrlRe = /[+/=]/g;
	var toOriginalRe = /[-_]/g;

	var originalToUrl = function (encoded) {
	    return encoded.replace(toUrlRe, function (match) {
	        if (match == '=')
	            return '';
	        else if (match == '+')
	            return '-';
	        else if (match == '/')
	            return '_';
	    });
	};

	var urlRoOriginal = function (encoded) {
	    return padBase64(encoded.replace(toOriginalRe, function (match) {
	        if (match == '-')
	            return '+';
	        else if (match == '_')
	            return '/';
	    }));
	};

	var padBase64 = function (encoded) {
	    var missing = 4 - (encoded.length % 4);

	    if (missing !== 4) {
	        encoded += "====".slice(0, missing);
	    }

	    return encoded;
	}

	module.exports = function (encode, decode) {
	    var _module = {};

	    _module.originalToUrl = originalToUrl;
	    _module.urlToOriginal = urlRoOriginal;

	    _module.encode = encode;
	    _module.decode = decode;

	    _module.encodeUrl = function (source) {
	        return originalToUrl(encode(source));
	    };

	    _module.decodeUrl = function (encoded) {
	        return decode(urlRoOriginal(encoded));
	    };

	    return _module;
	}


/***/ }
/******/ ])
});
;