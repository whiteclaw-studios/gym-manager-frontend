import axios from 'axios';
const axiosWrapper = (options) => {
  let configs = options;
  return axios.request({ ...configs });
};
export default axiosWrapper;
