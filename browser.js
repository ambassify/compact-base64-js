'use strict';

/**
 * Note on escape and encode functions:
 * These is for Unicode support
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa#Unicode_strings
 */

var encode = function (source) {
    return btoa(escape(encodeURIComponent(source)));
};

var decode = function (encoded) {
    return decodeURIComponent(unescape(atob(encoded)));
};

module.exports = require('./common')(encode, decode);
