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


// Use rpi pin number scheme
gpio.setMode(gpio.MODE_BCM);

// Listen
/*gpio.on('change', function(channel, value) {
	console.log('Channel ' + channel + ' value is now ' + value);
});*/

// PIN 4
gpio.setup(4, gpio.DIR_IN, readInput4);
function readInput4(err) {
    if (err) throw err;
    gpio.read(4, function(err, value) {
        if (err) throw err;
        console.log('PIN 4: ' + value);
    });
}


