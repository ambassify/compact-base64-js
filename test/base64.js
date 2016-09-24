describe('base64', function () {

    var tests = [
        {
            description: 'HTML',
            plain: 'lorem ipsum <iframe>html code</iframe>',
            base64: 'bG9yZW0gaXBzdW0gPGlmcmFtZT5odG1sIGNvZGU8L2lmcmFtZT4=',
            base64url: 'bG9yZW0gaXBzdW0gPGlmcmFtZT5odG1sIGNvZGU8L2lmcmFtZT4'
        }, {
            description: 'Foreign characters',
            plain: 'é',
            base64: 'w6k=',
            base64url: 'w6k'
        }, {
            description: 'index 62 and 63 (+/)',
            plain: 'su>jects?fzed',
            base64: 'c3U+amVjdHM/ZnplZA==',
            base64url: 'c3U-amVjdHM_ZnplZA'
        }, {
            description: 'Weird stuff',
            plain: '💩🚎🎉🙃 こんにちは 你好 안녕하세요 Здравствуйте msGrüßGott',
            base64: '8J+SqfCfmo7wn46J8J+ZgyDjgZPjgpPjgavjgaHjga8g5L2g5aW9IOyViOuFle2VmOyEuOyalCDQl9C00YDQsNCy0YHRgtCy0YPQudGC0LUgbXNHcsO8w59Hb3R0',
            base64url: '8J-SqfCfmo7wn46J8J-ZgyDjgZPjgpPjgavjgaHjga8g5L2g5aW9IOyViOuFle2VmOyEuOyalCDQl9C00YDQsNCy0YHRgtCy0YPQudGC0LUgbXNHcsO8w59Hb3R0'
        }
    ];

    it('Should base64 encode correctly', function() {
        tests.forEach(function(t) {
            var msg = t.description + ' should encode correctly';
            assert.equal(Base64.encode(t.plain), t.base64, msg);
        });
    })

    it('Should base64 decode correctly', function() {
        tests.forEach(function(t) {
            var msg = t.description + ' should decode correctly';
            assert.equal(Base64.decode(t.base64), t.plain, msg);
        });
    })

    it('Should base64url encode correctly', function() {
        tests.forEach(function(t) {
            var msg = t.description + ' should url encode correctly';
            assert.equal(Base64.encodeUrl(t.plain), t.base64url, msg);
        });
    })

    it('Should base64url decode correctly', function() {
        tests.forEach(function(t) {
            var msg = t.description + ' should url decode correctly';
            assert.equal(Base64.decodeUrl(t.base64url), t.plain, msg);
        });
    })
})
