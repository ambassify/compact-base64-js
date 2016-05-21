'use strict';

var encode = function (source) {
    return (new Buffer(source)).toString('base64');
};

var decode = function (encoded) {
    return (new Buffer(encoded, 'base64')).toString();
};

module.exports = require('./common')(encode, decode);
