import axios from "axios";
import { mainDomain } from "@/utils/mainDomain";




export const loginSendOtp = async (mobile) => {
    try {
        const data = new FormData();
        data.append("mobile", mobile);
        await axios.post(`${mainDomain}/api/Account/login/SendOtp`, data);
        return null;
    } catch (err) {
        return err;
    }
};

export const loginOtp = async (data) => {
    try {

        const response = await axios.post(`${mainDomain}/api/Account/login/otp`, data);
        return response.data;
    } catch (err) {
        return err;
    }
};


export const login = async (data) => {
    try {
        const response = await axios.post(`${mainDomain}/api/Account/login`, data);
        return response.data;
    } catch (err) {
        return err;
    }
};

export const RegisterSendOtp = async (mobile) => {
    try {
        const data = new FormData();
        data.append("mobile", mobile);
        await axios.post(`${mainDomain}/api/Account/Register/SendOtp`, data);
        return null;
    } catch (err) {
        return err;
    }
};


export const Register = async (data) => {
    try {

        const response = await axios.post(`${mainDomain}/api/Account/Register`, data);
        return response.data;
    } catch (err) {
        return err;
    }
};