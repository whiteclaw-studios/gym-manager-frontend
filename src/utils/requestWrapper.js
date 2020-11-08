import axios from 'axios';
const axiosWrapper = (options) => {
  let configs = options;
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
