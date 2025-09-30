import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_LOCAL_API_URL || 'http://localhost:5000/api',
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken =
      JSON.parse(localStorage.getItem('userData'))?.token || '';

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
