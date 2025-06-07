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

export const getLikes = async (limit, token) => {
    try {
        const response = await axios.get(`${mainDomain}/api/UserActivity/Likes/${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
    }
};

export const postLike = async (id, token) => {

    try {
        const response = await axios.post(`${mainDomain}/api/UserActivity/Like/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data
    } catch (error) {
        Toast.fire({
            icon: "error",
            text: error.response?.data ? error.response?.data : "خطای شبکه",
        });
        return {}
    }
};

export const postLiked = async (id, token) => {
    try {
        const response = await axios.post(`${mainDomain}/api/UserActivity/Liked/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data
    } catch (error) {
        return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
    }
};