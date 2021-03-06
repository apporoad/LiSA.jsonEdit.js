function btoa (cc){
    return Buffer.from(cc, 'binary').toString('base64')
}

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


module.exports = {
    "@get" : ()=>{
        var json = {
            hello : "world",
            "goood" : 'good good day',
            name : '中国人'
        }
        return b64EncodeUnicode(JSON.stringify(json))
    }
}