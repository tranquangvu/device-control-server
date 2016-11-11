import scheduler from './scheduler';
import io from 'socket.io-client';
import { getValueOfDevice } from './services/device';

// cron job scheduler
// scheduler();
// console.log('-> Cron job is running...');

// action cable
const socket = io('http://0.0.0.0:5001');

socket.on('connect', () => {
  console.log('-> Connected');
});

socket.on('get_current_value', (data) => {
  let { device } = data

  getValueOfDevice(device)
    .then((values) => {
      socket.emit('response_current_value', values);
    })
    .catch((error) => {
      console.log(error);
    });
});

socket.on('disconnect', () => {
  console.log('-> Disconnected');
});

console.log('Listening on socket.....');
