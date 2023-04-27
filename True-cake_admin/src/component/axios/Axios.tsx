// import axios, { AxiosInstance } from 'axios';
// // import { PATH } from '../../constant/Constant';

// const instance: AxiosInstance = axios.create({
//   baseURL: "http://34.204.53.179:7000/api/",
//   headers: {
//     Accept: 'application/json',
//     'Content-type': 'application/json',
//   },
// })

//export default instance;

import axios from "axios";
export const BaseUrl = "http://34.200.195.34:7000/api/";

/**get Token for LocalStorage.................*/
const token = localStorage.getItem("authToken");
const instance: any = axios.create({
  baseURL: "http://34.200.195.34:7000/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config: any) {
    const authToken = JSON.parse(localStorage.getItem("authToken") as any);
    config.headers["Authorization"] = `Bearer ${authToken}`;
    return config;
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
