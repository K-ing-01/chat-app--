"use client";
import {createContext, useContext, useEffect, useState} from "react";
import {authService} from "../../components/apis/auth/authService";
import {
    clearAccessToken,
    clearRefreshToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
} from "../../components/apis/tokenStore/TokenStore";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function restoreSession() {
            const storedRefreshToken = getRefreshToken();
            if (!storedRefreshToken) {
                setLoading(false);
                return;
            }
            try {
                const data = await authService.refresh(storedRefreshToken);
                setAccessToken(data.accessToken);
                if (data.refreshToken) setRefreshToken(data.refreshToken);

                const userData = await authService.me();
                setUser(userData);
            } catch {
                clearAccessToken();
                clearRefreshToken();
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        restoreSession();
    }, []);

    const login = async (credentials) => {
        const data = await authService.login(credentials);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        const userData = await authService.me();
        setUser(userData);
        return {...data, user: userData};
    };

    const logout = () => {
        clearAccessToken();
        clearRefreshToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, loading, login, logout, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}