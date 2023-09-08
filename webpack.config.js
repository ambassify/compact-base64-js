module.exports = {
    mode: 'production',
    entry: './browser.js',
    output: {
        path: process.cwd(),
        filename: 'compact-base64.js',
        library: {
            type: 'umd',
            name: 'Base64',
        },

        // prevent error: `Uncaught ReferenceError: self is not define`
    }
};
