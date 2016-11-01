import env from '../env';
import request from 'request';

export default function deviceValues() {
  getDevices()
    .then(devices => {
      return Promise.all(devices.map(device => getValueOfDevice(device));
    })
    .then(values => {
      return values;
    })
    .catch(reason => {
      console.log(reason);
    });
}

function getDevices() {
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
      resolve(body);
    });
  });
}

function getValueOfDevice(device) {
  return new Promise((resolve, reject) => {
    request.get(`http://${device.ip}/getAllValue`, (error, response, body) => {
      if(error || response.statusCode != 200) {
        reject(error);
      }
      resolve({...body, device_id: device.id})
    });
  })
}
