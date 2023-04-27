import axios from "./constants";

export const SignupApi = (user: any) => {
  return axios.post("/auth/signUp").then((response: any) => response.data());
};
