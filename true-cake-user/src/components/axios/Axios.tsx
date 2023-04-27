import axios, { AxiosInstance, AxiosError } from "axios";
import { PATH } from "../../constant/Constant";
import store from "../../screens/reduxSetup/Store";
import { addUserDetails, resetUserDetailsState } from "../../screens/reduxSetup/UserDetailsSlice";
import { RouteList } from "../../utils/Routes";

const instance: AxiosInstance = axios.create({
  baseURL: PATH,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error: AxiosError) {
    if (error)
      if (error?.response?.status == 401) {
        // redirect to landing page on unauthorized user
        window.location.href = RouteList[0].path;
        store.dispatch(resetUserDetailsState());
      }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
