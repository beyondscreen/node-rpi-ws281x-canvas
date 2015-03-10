var _uint32Array;

module.exports = {
    toUint32Array: function(canvas) {
        var ctx = canvas.getContext('2d'),
            imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        if(!canvas._uint32Array) {
            canvas._uint32Array = new Uint32Array(canvas.width * canvas.height)
        }

        for(var i=0, n=imgData.length; i<n; i+=4) {
            var pxIdx = i/4;
            var r, g, b, a = imgData[i+3]/255;

            if(a === 0) {
                canvas._uint32Array[pxIdx] = 0;
                continue;
            }

            r = imgData[i]*a;
            g = imgData[i+1]*a;
            b = imgData[i+2]*a;

            canvas._uint32Array[pxIdx] = ((r & 0xff) << 16)
                | ((g & 0xff) << 8)
                | (b & 0xff);
        }

        return canvas._uint32Array;
    }
};