var Canvas = require('canvas'),
    canvasMixins = require('./canvas-mixins');

module.exports = {
    Image: Canvas.Image,
    Font: Canvas.Font,

    create: function(width, height) {
        var canvas = new Canvas(width, height);

        // add mixins
        canvas.toUint32Array = canvasMixins.toUint32Array.bind(null, canvas);

        return canvas;
    }
};