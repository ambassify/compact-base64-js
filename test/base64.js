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
        }, {
            description: 'Uint8Array',
            plain: [0x00, 0x10, 0x20, 0x30, 0x40],
            base64: 'ABAgMEA=',
            base64url: 'ABAgMEA',
            encoding: 'binary'
        }, {
            description: 'Binary encoding',
            plain: [ 48, 70, 2, 33, 0, 129, 57, 180, 55, 211, 15, 20, 226, 144, 232, 247, 111, 250, 249, 250, 146, 143, 195, 233, 37, 237, 155, 161, 93, 79, 169, 95, 246, 60, 208, 11, 62, 2, 33, 0, 240, 104, 132, 163, 231, 242, 62, 209, 220, 80, 51, 158, 8, 9, 18, 46, 136, 248, 29, 172, 161, 208, 110, 156, 123, 186, 175, 153, 154, 47, 173, 141 ],
            base64: 'MEYCIQCBObQ30w8U4pDo92/6+fqSj8PpJe2boV1PqV/2PNALPgIhAPBohKPn8j7R3FAznggJEi6I+B2sodBunHu6r5maL62N',
            base64url: 'MEYCIQCBObQ30w8U4pDo92_6-fqSj8PpJe2boV1PqV_2PNALPgIhAPBohKPn8j7R3FAznggJEi6I-B2sodBunHu6r5maL62N',
            encoding: 'binary'
        }, {
            description: 'HEX encoding',
            plain: '00fffecbc08a',
            base64: 'AP/+y8CK',
            base64url: 'AP_-y8CK',
            encoding: 'hex'
        }, {
            description: 'Weird stuff',
            plain: '💩🚎🎉🙃 こんにちは 你好 안녕하세요 Здравствуйте msGrüßGott',
            base64: '8J+SqfCfmo7wn46J8J+ZgyDjgZPjgpPjgavjgaHjga8g5L2g5aW9IOyViOuFle2VmOyEuOyalCDQl9C00YDQsNCy0YHRgtCy0YPQudGC0LUgbXNHcsO8w59Hb3R0',
            base64url: '8J-SqfCfmo7wn46J8J-ZgyDjgZPjgpPjgavjgaHjga8g5L2g5aW9IOyViOuFle2VmOyEuOyalCDQl9C00YDQsNCy0YHRgtCy0YPQudGC0LUgbXNHcsO8w59Hb3R0',
            encoding: 'utf8'
        }
    ];

    it('Should base64 encode correctly', function() {
        tests.forEach(function(t) {
            var msg = t.description + ' should encode correctly';
            assert.equal(Base64.encode(t.plain, t.encoding), t.base64, msg);
        });
    })

    it('Should base64 decode correctly', function() {
        tests.forEach(function(t) {
            var msg = t.description + ' should decode correctly';
            var result = Base64.decode(t.base64, t.encoding);
            if (Array.isArray(t.plain))
                result = Array.from(result);
            assert.deepEqual(result, t.plain, msg);
        });
    })

    it('Should base64url encode correctly', function() {
        tests.forEach(function(t) {
            var msg = t.description + ' should url encode correctly';
            assert.equal(Base64.encodeUrl(t.plain, t.encoding), t.base64url, msg);
        });
    })

    it('Should base64url decode correctly', function() {
        tests.forEach(function(t) {
            var msg = t.description + ' should url decode correctly';
            var result = Base64.decodeUrl(t.base64url, t.encoding);
            if (Array.isArray(t.plain))
                result = Array.from(result);
            assert.deepEqual(result, t.plain, msg);
        });
    })
})
