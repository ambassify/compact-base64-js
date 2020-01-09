'use strict';

/**
 * Note on encode and replace functions:
 * These is for Unicode support
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
 */

var encode = function (source, inputEncoding) {
    var raw = '';
    var data = source;

    if (inputEncoding !== 'binary') {
        data = [];
        encodeURIComponent(source).replace(/%([0-9A-F]{2})|./g, function(m, p1) {
            data.push(p1 ? parseInt(p1, 16) : m.charCodeAt(0));
        });
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

    return decodeURIComponent(data.map(function(c) {
        return '%' + ('00' + c.toString(16)).slice(-2);
    }).join(''));
};

module.exports = require('./common')(encode, decode);
