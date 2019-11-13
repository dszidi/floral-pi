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
let pins = [7, 14];
let callBacks = {};

pins.forEach((pin) => {
  
  const readInput = (err) => {
      if (err) throw err;
      gpio.read(pin, function(err, value) {
          if (err) throw err;
          console.log('The value is ' + value);
      });
  }

  callBacks[pin] = readInput;
  //gpio.setup(pin, gpio.DIR_IN, readInput);
  gpio.setup(pin, gpio.DIR_IN, callBacks[pin]);
});


/*pins.forEach((err) => {
    //if (err) throw err;
    gpio.read(pin, function(err, value) {
        if (err) throw err;
        console.log('PIN ' + pin + ': ' + value);
    });
});*/

// EXAMPLE CALLBACK
/*function readInput(err) {
    if (err) throw err;
    gpio.read(7, function(err, value) {
        if (err) throw err;
        console.log('The value is ' + value);
    });
}*/


