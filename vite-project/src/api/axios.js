import axios from "axios";

export const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Request interceptor to automatically attach JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("cloth_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // If token expired or invalid, clear local storage
            const message = error.response.data?.message || "";
            if (message.toLowerCase().includes("token expired") || message.toLowerCase().includes("invalid token")) {
                localStorage.removeItem("cloth_token");
                localStorage.removeItem("cloth_user");
            }
        }
        return Promise.reject(error);
    }
);

export default api;
