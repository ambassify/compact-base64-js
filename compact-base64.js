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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Note on encode and replace functions:
	 * These is for Unicode support
	 * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
	 */

	var encode = function (source, inputEncoding) {
	    var raw = '';
	    var data = [];

	    if (/^utf-?(8|16)$/i.test(inputEncoding) || !inputEncoding) {
	        encodeURIComponent(source).replace(/%([0-9A-F]{2})|./g, function(m, p1) {
	            data.push(p1 ? parseInt(p1, 16) : m.charCodeAt(0));
	        });
	    }
	    else if (inputEncoding === 'hex') {
	        source.replace(/[0-9A-F]{2}/gi, function(m) {
	            data.push(parseInt(m, 16));
	        });
	    }
	    else if (inputEncoding === 'binary') {
	        data = source;
	    }
	    else {
	        throw new Error('Invalid inputEncoding supplied');
	    }

	    // map + join generates invalid results for binary data
	    data.forEach(function(b) {
	        var hex = ('00' + b.toString(16)).slice(-2);
	        raw += String.fromCharCode('0x' + hex);
	    });

	    return btoa(raw);
	};

	var decode = function (encoded, outputEncoding) {
	    var data = Array.prototype.map.call(atob(encoded), function(c) {
	        return c.charCodeAt(0);
	    });

	    if (outputEncoding === 'binary')
	        return data;

	    if (outputEncoding === 'hex') {
	        return data.map(function(b) {
	            return ('00' + b.toString(16)).slice(-2);
	        }).join('');
	    }

	    if (/^utf-?(8|16)$/i.test(outputEncoding) || !outputEncoding) {
	        return decodeURIComponent(data.map(function(c) {
	            return '%' + ('00' + c.toString(16)).slice(-2);
	        }).join(''));
	    }

	    throw new Error('Invalid outputEncoding supplied');
	};

	module.exports = __webpack_require__(1)(encode, decode);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

	    _module.encodeUrl = function (source, inputEncoding) {
	        return originalToUrl(encode(source, inputEncoding));
	    };

	    _module.decodeUrl = function (encoded, outputEncoding) {
	        return decode(urlRoOriginal(encoded), outputEncoding);
	    };

	    return _module;
	}


/***/ })
/******/ ])
});
;