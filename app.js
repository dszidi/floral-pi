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
var gpio = require('../rpi-gpio');

gpio.setup(7, gpio.DIR_IN, readInput);

function readInput(err) {
    if (err) throw err;
    gpio.read(7, function(err, value) {
        if (err) throw err;
        console.log('The value is ' + value);
    });
}



