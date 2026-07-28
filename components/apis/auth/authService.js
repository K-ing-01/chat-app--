import {axiosClient} from "./AxiosClient";

export const authService = {
    register: (data) => axiosClient.post("/api/auth/signup", data),
    login: (data) => axiosClient.post("/api/auth/login", data),
    verifyOtp: (data) => axiosClient.post("/api/auth/otp/verify", data),
    resendOtp: (data) => axiosClient.post("/api/auth/otp/resend", data),
    refresh: (refreshToken) => axiosClient.post("/api/auth/refresh", {refreshToken}),
    me: () => axiosClient.get("/api/users/me"),
}