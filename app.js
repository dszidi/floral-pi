const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// GPIO READ EXAMPLE
var gpio = require('./node_modules/rpi-gpio');

// Setup PINS
//let pins = [7, 14];

/*pins.forEach((pin) => {
  gpio.setup(pin, gpio.DIR_IN, readInput7);
});*/

// PIN 7
gpio.setup(pin, gpio.DIR_IN, readInput7);
function readInput7(err) {
    if (err) throw err;
    gpio.read(7, function(err, value) {
        if (err) throw err;
        console.log('PIN 7: ' + value);
    });
}

// PIN 14
gpio.setup(pin, gpio.DIR_IN, readInput14);
function readInput14(err) {
    if (err) throw err;
    gpio.read(14, function(err, value) {
        if (err) throw err;
        console.log('PIN 14: ' + value);
    });
}


