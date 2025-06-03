import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";
import Swal from "sweetalert2";

// import sweet alert 2
const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
});

// اضافه کردن تاخیر مصنوعی
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getCategory = async (params) => {
    // اضافه کردن تاخیر 3 ثانیه‌ای
    // await delay(3000);
    
    try {
        // const params = {
        //     TypeId: 4,
        //     LangCode: "fa",
        //     IsHome: 1,
        // };

        const response = await axios.get(`${mainDomain}/api/Category`, {
            params,
        });
        return response.data;
    } catch (error) {
        Toast.fire({
            icon: "error",
            text: error.response?.data ? error.response?.data : "خطای شبکه",
        });
    }
};


export const getCategoryById = async (id) => {
    try {
       

        const response = await axios.get(`${mainDomain}/api/Category/${id}`);

        return response.data;
    } catch (error) {
        Toast.fire({
            icon: "error",
            text: error.response?.data ? error.response?.data : "خطای شبکه",
        });
    }
};

export const getBreadcrumb = async (id) => {
    try {
        const params = {
            id,
            LangCode: "fa",
        };

        const response = await axios.get(`${mainDomain}/api/Category/Breadcrumb`, {
            params,
        });

        return response.data;
    } catch (error) {
        Toast.fire({
            icon: "error",
            text: error.response?.data ? error.response?.data : "خطای شبکه",
        });
        return [];
    }
};

export const getBreadcrumbProduct = async (id) => {
    try {
        const params = {
            id,
            LangCode: "fa",
        };

        const response = await axios.get(`${mainDomain}/api/Item/Breadcrumb`, {
            params,
        });

        return response.data;
    } catch (error) {
        Toast.fire({
            icon: "error",
            text: error.response?.data ? error.response?.data : "خطای شبکه",
        });
        return [];
    }
};



