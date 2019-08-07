'use strict';

var encode = function (source) {
    return Buffer.from(source, 'utf8').toString('base64');
};

var decode = function (encoded) {
    return Buffer.from(encoded, 'base64').toString('utf8');
};

module.exports = require('./common')(encode, decode);
