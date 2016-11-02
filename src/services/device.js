import env from '../env';
import request from 'request';

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
      return body.status === 'success' ? resolve(body.data) : reject(body.data);
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
    resolve({temp: 28, air_humid: 60.5, soil_humid: 70.5, brightness: 100, device_id: device.id});
  });
}
