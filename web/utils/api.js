const axios = require("axios")

export const api = axios.create({
    //Change the URL to your API endpoint
    baseURL: "https://localhost:3001"
});

export let token = undefined;

api.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});