import env from '../env';
import request from 'request';

function randomBetween(start, end) {
  return Math.floor(Math.random() * (end - start)) + start;
}

export function getDevices() {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'GET',
      url: `${env.api_server_url}/v${env.api_version}/devices`,
      headers: {
        'Authorization': env.api_connect_token
      }
    }

    request(options, (error, response, body) => {
      if(error || response.statusCode != 200) {
        reject(err); return;
      }

      body = JSON.parse(body);
      return body.success ? resolve(body.data) : reject(body.data);
    });
  });
}

export function getValueOfDevice(device) {
  return new Promise((resolve, reject) => {
    request.get(`http://${device.ip}/getAllValue`, (error, response, body) => {
      if(error || response.statusCode != 200) {
        reject(error);
      }
      resolve(Object.assign(JSON.parse(body), {device_id: device.id}));
    });
  });
}

export function turnOnLed(device) {
  return new Promise((resolve, reject) => {
    request.get(`http://${device.ip}/?led=on`, (error, response, body) => {
      if(error || response.statusCode != 200) {
        reject(error);
      }
      resolve(Object.assign(JSON.parse(body), {device_id: device.id}));
    });
  });
}

export function turnOffLed(device) {
  return new Promise((resolve, reject) => {
    request.get(`http://${device.ip}/?led=off`, (error, response, body) => {
      if(error || response.statusCode != 200) {
        reject(error);
      }
      resolve(Object.assign(JSON.parse(body), {device_id: device.id}));
    });
  });
}

export function turnOnServo(device) {
  return new Promise((resolve, reject) => {
    request.get(`http://${device.ip}/?servo=on`, (error, response, body) => {
      if(error || response.statusCode != 200) {
        reject(error);
      }
      resolve(Object.assign(JSON.parse(body), {device_id: device.id}));
    });
  });
}

export function turnOffServo(device) {
  return new Promise((resolve, reject) => {
    request.get(`http://${device.ip}/?servo=off`, (error, response, body) => {
      if(error || response.statusCode != 200) {
        reject(error);
      }
      resolve(Object.assign(JSON.parse(body), {device_id: device.id}));
    });
  });
}
