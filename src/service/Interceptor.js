import axios from 'axios';

const globalInstance = axios.create({
  baseURL: 'https://bd-h8ye.onrender.com/',
  timeout: 5000,
});

globalInstance.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

globalInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default globalInstance;
