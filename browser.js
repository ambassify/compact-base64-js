'use strict';

/**
 * Note on encode and replace functions:
 * These is for Unicode support
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
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

module.exports = require('./common')(encode, decode);
