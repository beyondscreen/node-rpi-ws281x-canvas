# control ws281x-LEDs using a html5-canvas in node.js

this package allows you to control a grid of WS281x-LEDs (like the Adafruit Neopixel) using a canvas-element in node.js. 
This package provides a small wrapper around the [`node-canvas`][]-module which mainly handles the format-conversion from canvas pixel-data to the Uint32-format required by the [`rpi-ws281x-native`][]-module.

## Setup

install via npm:

    npm install rpi-ws281x-canvas
 
or from source:

    git clone https://github.com/raspberry-node/node-rpi-ws281x-canvas.git
    cd node-rpi-ws281x-canvas
    npm install


## Usage

The module exports a `create(width, height)`-function that will return an instance of a `Canvas`-element.

    var ws281xCanvas = require('rpi-ws281x-canvas'),
        canvas = ws281xCanvas.create(10,10);

The returned is an instance of a HTML5-Canvas implementation ([`node-canvas`][]). 

The only additional method - `toUint32Array()` - handles the conversion of canvas pixel-data into the data-format used by the [`rpi-ws281x-native`][]-module (unsigned 32-bit integer per pixel, format: `0x00rrggbb`). For conversion of alpha-values, a black background is assumed.

In Addition to that there are two classes, `Image` and `Font`, that are made available as additional exports of the module.

### Example

This will draw a blue rectangle on the LED-Grid.

    var ws281x = require('rpi-ws281x-native'),
        canvas = require('rpi-ws281x-canvas').create(10,10),
        ctx = canvas.getContext('2d');

    ws281x.init(100);

    ctx.fillStyle = 'blue';
    ctx.fillRect(2, 2, 8, 8);
    
    ws281x.render(canvas.toUint32Array());


## Testing

a simple test-script is provided in `examples/sprite-animation.js`, it is intended to run with a 10x10 matrix, so you might need to adjust the values to match your setup.

[`node-canvas`]: https://github.com/Automattic/node-canvas
[`rpi-ws281x-native`]: https://github.com/raspberry-node/node-rpi-ws281x-native