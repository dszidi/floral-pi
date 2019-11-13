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

// OSC (OPEN SOUND CONTROL)
const { Client } = require('./node_modules/node-osc/lib');
 
const client = new Client('127.0.0.1', 3333);

function sendOSC(sensor, value){
  client.send('/oscAddress', 200, () => {
    //client.close();
  });
}

// pigpio example
const Gpio = require('pigpio').Gpio;
 
// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6/34321;
 
// FIRST SENSOR
const trigger1 = new Gpio(4, {mode: Gpio.OUTPUT});
const echo1 = new Gpio(17, {mode: Gpio.INPUT, alert: true});
 
trigger1.digitalWrite(0); // Make sure trigger is low
 
const watchSensor1 = () => {
  let startTick;
 
  echo1.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      const value = diff / 2 / MICROSECDONDS_PER_CM;
      console.log(value.toFixed(2));
      sendOSC(1, value);
    }
  });
};
 
watchSensor1();
 
// Trigger a distance measurement once per second
setInterval(() => {
  trigger1.trigger(10, 1); // Set trigger high for 10 microseconds
}, 100);

