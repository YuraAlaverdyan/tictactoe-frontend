import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Create an Axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Define request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (config.headers) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Define response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {

    return response;
  },
  (error) => {
    if (error.response.status === 401) window.location.href = '/';

    return Promise.reject(error);
  },
);