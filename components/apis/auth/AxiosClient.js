import axios from "axios";
import {getAccessToken} from "../tokenStore/TokenStore";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
const LOCALURL = process.env.NEXT_PUBLIC_LOCAL_URL;

export const axiosClient = axios.create({
        baseURL: LOCALURL, headers: {
            "Content-Type": "application/json",
        }, withCredentials: true, // required so the httpOnly refresh-token cookie is sent automatically
    }
)

axiosClient.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, (error) => Promise.reject(error))

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || error.message || "Something went wrong";
        return Promise.reject({
            message,
            status: error.response?.status,
            data: error.response?.data,
        });
    }
);

