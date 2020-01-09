'use strict';

var encode = function (source, inputEncoding) {
    return Buffer.from(source, inputEncoding || 'utf8').toString('base64');
};

var decode = function (encoded, outputEncoding) {
    if (outputEncoding === 'binary')
        return Buffer.from(encoded, 'base64');

    return Buffer.from(encoded, 'base64').toString(outputEncoding || 'utf8');
};

module.exports = require('./common')(encode, decode);
