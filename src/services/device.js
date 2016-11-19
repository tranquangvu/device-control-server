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
    // request.get(`http://${device.ip}/getAllValue`, (error, response, body) => {
    //   if(error || response.statusCode != 200) {
    //     reject(error);
    //   }
    //   resolve({...JSON.parse(body), device_id: device.id});
    // });
    resolve({
      temperature: randomBetween(20, 40),
      humidity: randomBetween(50, 80),
      soil_moisture: randomBetween(50, 80),
      light: randomBetween(2000, 3000),
      device_id: device.id
    });
  });
}
