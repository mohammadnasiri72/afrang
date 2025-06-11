import axios from "axios";
import { mainDomain } from "@/utils/mainDomain";



// export const authServiceStatic = {
//   login: async (username, password) => {
//     const data = {
//       username,
//       password,
//       remember: true,
//     };

//     return axios.post(mainDomain + "/api/Account/login", data);
//   },
// };

// export const authServiceSendOtp = {
//   login: async (mobile) => {
//     const data = new FormData();
//     data.append("mobile", mobile);

//     return axios.post(mainDomain + "/api/Account/login/SendOtp", data);
//   },
//   Register: async (mobile) => {
//     const data = new FormData();
//     data.append("mobile", mobile);

//     return axios.post(mainDomain + "/api/Account/Register/SendOtp", data);
//   },
// };

// export const authServiceOtp = { 
//   login: async (mobile, code) => {
//     const data = {
//       mobile,
//       code,
//     };
//     return axios.post(mainDomain + "/api/Account/login/otp", data);
//   },
//   register: async (data) => {
//     return axios.post(mainDomain + "/api/Account/Register", data);
//   },
// };

export const authServiceSignOut = {
  signOut: async (token) => {
    return axios.post(mainDomain + "/api/Account/signOut", {} , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// export const changePassword = async (data, token) => {
//     try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/Account/ChangePassword`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify(data)
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || 'خطا در تغییر رمز عبور');
//         }

//         return await response.json();
//     } catch (error) {
//         throw error;
//     }
// };

export const getUserProfile = async (token) => {
    try {
        const response = await axios.get(`${mainDomain}/api/User/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (token, fields) => {
    try {
        const response = await axios.put(`${mainDomain}/api/User/profile`, fields, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
