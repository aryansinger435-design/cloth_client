import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem("cloth_user");
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(() => localStorage.getItem("cloth_token") || null);
    const [loading, setLoading] = useState(true);

    // Refresh profile on mount if token exists
    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                try {
                    const res = await api.get("/profile");
                    if (res.data?.success && res.data?.data) {
                        setUser(res.data.data);
                        localStorage.setItem("cloth_user", JSON.stringify(res.data.data));
                    }
                } catch (err) {
                    console.warn("Session expired or invalid, logging out:", err.message);
                    logout();
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, [token]);

    const login = async (email, password) => {
        const res = await api.post("/login", { email, password });
        if (res.data?.success && res.data?.data) {
            const { token: receivedToken, user: receivedUser } = res.data.data;
            setToken(receivedToken);
            setUser(receivedUser);
            localStorage.setItem("cloth_token", receivedToken);
            localStorage.setItem("cloth_user", JSON.stringify(receivedUser));
            return receivedUser;
        }
        throw new Error(res.data?.message || "Login failed");
    };

    const register = async (userData) => {
        const res = await api.post("/register", userData);
        return res.data;
    };

    const verifyOTP = async (email, otp) => {
        const res = await api.post("/verify-otp", { email, otp });
        return res.data;
    };

    const resendOTP = async (email) => {
        const res = await api.post("/resend-otp", { email });
        return res.data;
    };

    const updateProfile = async (formData, isMultipart = false) => {
        const config = isMultipart
            ? { headers: { "Content-Type": "multipart/form-data" } }
            : {};
        const res = await api.put("/update-profile", formData, config);
        if (res.data?.success && res.data?.data) {
            const updated = res.data.data;
            setUser(updated);
            localStorage.setItem("cloth_user", JSON.stringify(updated));
            return updated;
        }
        return res.data;
    };

    const updateAddress = async (addressData) => {
        const res = await api.put("/update-address", addressData);
        if (res.data?.success && res.data?.data) {
            setUser(res.data.data);
            localStorage.setItem("cloth_user", JSON.stringify(res.data.data));
        }
        return res.data;
    };

    const refreshProfile = async () => {
        if (!token) return null;
        try {
            const res = await api.get("/profile");
            if (res.data?.success && res.data?.data) {
                setUser(res.data.data);
                localStorage.setItem("cloth_user", JSON.stringify(res.data.data));
                return res.data.data;
            }
        } catch (error) {
            console.error("Refresh profile error:", error);
        }
        return null;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("cloth_token");
        localStorage.removeItem("cloth_user");
    };

    const isAuthenticated = !!token && !!user;
    const isAdmin = user?.role === "admin";

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated,
                isAdmin,
                login,
                register,
                verifyOTP,
                resendOTP,
                updateProfile,
                updateAddress,
                refreshProfile,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
