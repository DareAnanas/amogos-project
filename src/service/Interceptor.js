import axios from "axios";

const globalInstance = axios.create({
  baseURL: "https://bd-h8ye.onrender.com/",
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
    // Axios already parses JSON responses; just return the response.
    return response;
  },
  (error) => {
    // if (error.response && error.response.status === 401) {
    //   // If 401 Unauthorized, redirect to home page
    //   window.location.href = "/";
    // }
    return Promise.reject(error);
  }
);

export default globalInstance;
