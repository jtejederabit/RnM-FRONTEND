import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosRequestConfig, AxiosError } from 'axios';
import axiosInstance from '../api/axiosCall.ts';

const useAxios = () => {
    const [error, setError] = useState<AxiosError | null>(null);
    const navigate = useNavigate();

    const request = async (endpoint: string, options: AxiosRequestConfig) => {
        try {
            const response = await axiosInstance(
                endpoint,
                options);
            return response.data;
        } catch (err) {
            const axiosError = err as AxiosError;
            setError(axiosError);
            if (axiosError.response && axiosError.response.status === 401) {
                navigate('/login');
            }
            throw axiosError;
        }
    };

    return { request, error };
};

export default useAxios;
