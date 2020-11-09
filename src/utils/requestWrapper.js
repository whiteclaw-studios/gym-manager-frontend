import axios from 'axios';
import { getCookie } from '../utils/helpers';
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
    if (!response) {
      return response;
    }

    console.log('Request success', response);

    return response;
  },
  (error) => {
    let data;

    /* eslint-enable no-console */
    return error;
  },
);
export default axiosWrapper;
