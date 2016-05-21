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
