import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5164",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers = config.headers || {};
    if (token) {
        // ensure header is set in a way axios will send
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export default api;