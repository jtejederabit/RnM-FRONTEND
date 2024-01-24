import axios from 'axios';
import { store } from '../../store/store.ts';
import { clearToken } from '../../store/loginSlice';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(config => {
    const token = store.getState().login.token;
    if (token) {
        config.headers['authorization'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401 || error.response.status === 403) {
        store.dispatch(clearToken());
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default axiosInstance;
