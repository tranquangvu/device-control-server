import env from '../env';
import request from 'request';
import { getDevices, getValueOfDevice } from '../services/device'

export default function store() {
  getDevices()
    .then(devices => {
      return Promise.all(devices.map(device => getValueOfDevice(device)));
    })
    .then(values => {
      return postToServer(values);
    })
    .catch(reason => {
      console.log(reason);
    });
}

function postToServer(values) {
  let options = {
    method: 'POST',
    url: `${env.api_server_url}/v${env.api_version}/values/create_list`,
    headers: {
      'Authorization': env.api_connect_token
    },
    json: {
      value: { list: values }
    }
  }

  request(options, (error, response, body) => {
    if(error) {
      console.log(error); return;
    }
    console.log('-> Stored value to database server');
  });
}
