let accessToken = null;

export function setAccessToken(token) {
    accessToken = token;
}

export function getAccessToken() {
    return accessToken;
}

export function clearAccessToken() {
    accessToken = null;
}

export function setRefreshToken(token) {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("refreshToken", token);
    }
}

export function getRefreshToken() {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("refreshToken")
}

export function clearRefreshToken() {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem("refreshToken")
    }
}