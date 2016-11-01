import env from '../env';
import request from 'request';
import deviceValues from '../services/deviceValues'

export default function storeValues {
  let values  = deviceValues();
  let options = {
    method: 'POST',
    url: `${env.api_server_url}/v${env.api_version}/values/create_list`,
    headers: {
      'Authorization': env.api_connect_token
    },
    body: {
      value: { list: device_values }
    }
  }

  request(options, (error, response, body) => {
    if(error || response.statusCode != 200) {
      return false;
    }
    return true;
  })
}
