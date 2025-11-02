import axios from "axios";

// Create an Axios instance
const Axios = axios.create({
    // baseURL: "http://localhost:5000", // Set your API base URL
    // baseURL: import.meta.env.VITE_BASE_URL
    baseURL: "http://13.201.81.40:5000/"
});

// Add a request interceptor to include the token in headers
Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Retrieve token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add token to headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default Axios;
