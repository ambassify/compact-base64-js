# compact-base64

Base64 encoding and decoding for Node.JS and browsers without polyfills.

This package provides a separate entry point in `package.json` for bundlers to use, this way Webpack and Browserify (other bundlers aren't tested) users will be able to use the optimized-for-browser version of the library. This means the bundlers won't need to polyfill Node.JS's `Buffer`.

For browser environments, the library uses `btoa` and `atob`, for Node.JS it uses `Buffer`.

UMD module named Base64 is available from `compact-base64.js`. You can use `https://cdn.rawgit.com/ambassify/compact-base64-js/[tag]/compact-base64.js` in your regular HTML scripts by filling in the desired tag.

## Browser support

[IE10 and newer + everything else](http://caniuse.com/#feat=atob-btoa)

## API

```
var Base64 = require('compact-base64');

// base64 encode
var encoded = Base64.encode("hello world");
--> aGVsbG8gd29ybGQ=

// base64 decode
var decoded = Base64.decode(encoded);
--> hello world

// convert base64 to base64url
var urlSafe = Base64.originalToUrl(encoded);
--> aGVsbG8gd29ybGQ

// convert base64 to base64url
var encoded2 = Base64.urlToOriginal(urlSafe);
--> aGVsbG8gd29ybGQ=

// base64url encode
var urlSafe2 = Base64.encodeUrl("hello world");
--> aGVsbG8gd29ybGQ

// base64url decode
var decoded = Base64.decodeUrl(urlSafe2);
--> hello world



```
