//authApi.js

import { axiosForLogin } from "./axiosForLogin";
import instanceAxios from "./instanceAxios";

export const Logout = async () => {
    const response = await axiosForLogin.post('/logout');
    return response.data;
  };


  export const authStatus = async () => {
    const response = await axiosForLogin.get('/auth');
    return response.data;
  };