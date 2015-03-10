var ws281x = require('rpi-ws281x-native'),
    ws281xCanvas = require('../index.js'),

    async = require('async'),
    fs = require('fs');

var IMAGE_DIR = __dirname + '/data/jslogo';
var FPS = 10;

var canvas = ws281xCanvas.create(10,10),
    Image = canvas.Image;

function loadImages(imagePath, callback) {
    var files = fs.readdirSync(imagePath)
        .map(function(f) { return imagePath + '/' + f; });

    async.mapLimit(files, 10, fs.readFile, function(err, fileBuffers) {
        if(err) { return callback(err); }

        var images = fileBuffers.map(function(buf) {
            var img = new Image();
            img.src = buf;

            return img;
        });

        callback(null, images);
    });
}

function startRendering(images) {
    var idx = 0,
        ctx = canvas.getContext('2d');

    ws281x.init(100);
    ws281x.setIndexMapping(ws281x.indexMapping.mirrorMatrixX(10,10));

    setInterval(function() {
        ctx.drawImage(images[idx], 0,0,10,10);
        ws281x.render(canvas.toUint32Array());

        idx = (idx+1)%images.length;
    }, 1000/FPS);
}

loadImages(IMAGE_DIR, startRendering);