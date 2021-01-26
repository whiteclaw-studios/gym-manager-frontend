import axios from 'axios';
import { get, getCookie } from '../utils/helpers';
const axiosWrapper = (options) => {
  let configs = { ...options };
  const { ignoreToken = false } = options;
  configs.headers = configs.headers || {};
  configs.headers['Content-Type'] = 'application/json';
  if (!ignoreToken) {
    const token = getCookie('VJS');
    configs.headers.Authorization = token;
  }
  return axios.request({ ...configs });
};
const resInterceptor = axios.interceptors.response.use(
  (response) => {
    console.log('inside response obj interceptor', response);

    if (!response) {
      return response;
    }

    return response;
  },
  (error) => {
    let data = get(error, 'response.data', '');
    console.log('inside response error interceptor', error, data);
    /* eslint-enable no-console */
    return { error, data };
  },
);
export default axiosWrapper;
