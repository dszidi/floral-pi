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
const { Client, Message } = require('./node_modules/node-osc/lib');
 
const client = new Client('127.0.0.1', 4559);

function sendOSC(sensor, value){
  const scale = [60,62,64,65,67,68,70,71,73,75,76,78,80,82,83]
  const threshold = 85;

  let message = new Message('/sensors/' + sensor.toString());
  let amp = value < threshold ? value * 0.036 : 1;
  let duration = value < threshold ? value / 100 : 1;

  const totalNotes = 13; // Highest note
  const startingNote = 60; // Lowest note

  let pitch = parseInt(value / 10) * 2;
  if(pitch > totalNotes){
    pitch = totalNotes;
  } else if(pitch < 1){
    pitch = 1;
  }

  message.append(parseFloat(amp.toFixed(2)));
  message.append(value > 60 ? 0 : scale[scale.length - pitch]);

  client.send(message, (err) => {
    //client.close();
    if(err){
      console.error(new Error(err));
    }

    console.log('Value: ' + value + ', PITCH: ' + pitch + ' ScaleTone: ' + scale[pitch]);    
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
      //console.log(value.toFixed(2));
      sendOSC(1, value.toFixed(2));
    }
  });
};
 
watchSensor1();
 
// Trigger a distance measurement once per second
setInterval(() => {
  trigger1.trigger(10, 1); // Set trigger high for 10 microseconds
}, 100);

