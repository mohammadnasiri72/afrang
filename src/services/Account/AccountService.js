import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const loginSendOtp = async (mobile, csrf) => {
  try {
    const data = new FormData();
    data.append("mobile", mobile);
    await axios.post(`${mainDomain}/api/Account/login/SendOtp`, data, {
      headers: {
        "X-CSRF-Token": csrf.csrfToken,
      },
      withCredentials: true,
    });
    return null;
  } catch (err) {
    return err;
  }
};

export const loginOtp = async (data) => {
  try {
    const response = await axios.post(
      `${mainDomain}/api/Account/login/otp`,
      data,
      {
        headers: {
          "X-CSRF-Token": data.csrf,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Account/login`, data, {
      headers: {
        "X-CSRF-Token": data.csrf,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const RegisterSendOtp = async (mobile, csrf) => {
  try {
    const data = new FormData();
    data.append("mobile", mobile);
    await axios.post(`${mainDomain}/api/Account/Register/SendOtp`, data, {
      headers: {
        "X-CSRF-Token": csrf.csrfToken,
      },
      withCredentials: true,
    });
    return null;
  } catch (err) {
    return err;
  }
};

export const Register = async (data, csrf) => {
  try {
    const response = await axios.post(
      `${mainDomain}/api/Account/Register`,
      data,
      {
        headers: {
          "X-CSRF-Token": csrf.csrfToken,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const ResetPassword = async (userName, csrf) => {
  const data = new FormData();
  data.append("userName", userName);
  try {
    const response = await axios.post(
      `${mainDomain}/api/Account/ResetPassword`,
      data,
      {
        headers: {
          "X-CSRF-Token": csrf.csrfToken,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    return {
      type: "error",
      message: err.response.data
        ? err.response.data
        : "خطا در بازیابی رمز عبور",
    };
  }
};

export const ChangePassword = async (data, token) => {
  const formData = new FormData();
  formData.append("CurrentPassword", data.currentPassword);
  formData.append("NewPassword", data.newPassword);
  formData.append("NewPassword2", data.confirmPassword);
  try {
    const response = await axios.post(
      `${mainDomain}/api/Account/ChangePassword`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { ok: true, message: response.data.message };
  } catch (err) {
    return { ok: false, message: err.response.data };
  }
};

export const SignOut = async (token) => {
  try {
    const response = await axios.post(
      `${mainDomain}/api/Account/signOut`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { ok: true, message: response.data };
  } catch (err) {
    return { ok: false, message: err.response.data };
  }
};
