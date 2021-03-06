import scheduler from './scheduler';
import io from 'socket.io-client';
import request from 'request';
import {
  turnOnLed,
  turnOffLed,
  turnOnServo,
  turnOffServo,
  getValueOfDevice,
} from './services/device';

// cron job scheduler
// scheduler();
// console.log('-> Cron job is running...');

// action cable
const socket = io('http://0.0.0.0:5001');

socket.on('connect', () => {
  console.log('-> Connected');
  socket.emit('ls_response_connect', {ls: true});
});

socket.on('get_current_value', (data) => {
  let { device } = data

  getValueOfDevice(device)
    .then((values) => {
      socket.emit('ls_response_current_value', values);
    })
    .catch((error) => {
      console.log(error);
    });
});

socket.on('turn_on_led', (data) => {
  let { device } = data

  turnOnLed(device)
    .then((result) => {
      socket.emit('ls_response_device_status', result);
    })
    .catch((error) => {
      console.log(error);
    })
});

socket.on('turn_off_led', (data) => {
  let { device } = data

  turnOffLed(device)
    .then((result) => {
      socket.emit('ls_response_device_status', result);
    })
    .catch((error) => {
      console.log(error);
    })
});

socket.on('turn_on_servo', (data) => {
  let { device } = data

  turnOnServo(device)
    .then((result) => {
      socket.emit('ls_response_device_status', result);
    })
    .catch((error) => {
      console.log(error);
    })
});

socket.on('turn_off_servo', (data) => {
  let { device } = data

  turnOffServo(device)
    .then((result) => {
      socket.emit('ls_response_device_status', result);
    })
    .catch((error) => {
      console.log(error);
    })
});

socket.on('disconnect', () => {
  console.log('-> Disconnected');
});

console.log('Listening on socket.....');
