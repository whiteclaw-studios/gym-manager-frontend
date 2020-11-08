import axios from 'axios';
import { getCookie } from '../utils/helpers';
const axiosWrapper = (options) => {
  let configs = { ...options };
  const { ignoreToken = false } = options;
  const token = getCookie('authToken');
  console.log('configs', configs);
  configs.headers = configs.headers || {};
  configs.headers['Content-Type'] = 'application/json';
  if (!ignoreToken)
    configs.headers.Authorization =
      'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJmaXRib3NzSnd0Iiwic3ViIjoiMTVkZjUxYjgtZjYyZC00ZjViLThhZTItYzE4ZmJjYTFiYjE4IiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTYwNDgzODA3NiwiZXhwIjoxNjA0ODM4Njc2fQ.1LBn3Q25xI0amz9pQnJGy9Em7_-dDxRif0BGEdQmhg4vaLIeNz5dgnGyEfjl71mpbLcPJi0oxLHwvl53i7EouA';
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
