import axios from "axios";
import { mainDomain } from "@/utils/mainDomain";

export const authServiceStatic = {
  login: async (username, password) => {
    const data = {
      username,
      password,
      remember: true,
    };

    return axios.post(mainDomain + "/api/Account/login", data);
  },
};

export const authServiceSendOtp = {
  login: async (mobile) => {
    const data = new FormData();
    data.append("mobile", mobile);

    return axios.post(mainDomain + "/api/Account/login/SendOtp", data);
  },
  Register: async (mobile) => {
    const data = new FormData();
    data.append("mobile", mobile);

    return axios.post(mainDomain + "/api/Account/Register/SendOtp", data);
  },
};

export const authServiceOtp = {
  login: async (mobile, code) => {
    const data = {
      mobile,
      code,
    };
    return axios.post(mainDomain + "/api/Account/login/otp", data);
  },
  register: async (data) => {
    return axios.post(mainDomain + "/api/Account/Register", data);
  },
};

export const authServiceSignOut = {
  signOut: async (token) => {
    return axios.post(mainDomain + "/api/Account/signOut", {} , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
