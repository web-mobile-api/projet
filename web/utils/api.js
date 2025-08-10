
// Assumes axios is loaded globally (via CDN in HTML)
window.token = undefined;
window.userId = undefined;
window.api = axios.create({
    baseURL: "https://localhost:3001"
});
window.api.interceptors.request.use((config) => {
    if (window.token) {
        config.headers.Authorization = `Bearer ${window.token}`;
    }
    return config;
});