import { useEffect } from 'react';
import useRefreshToken from '../auth/useRefreshToken.hook';
import { useAuth } from '../auth/useAuth.hook';
import { AxiosResponse } from 'axios';
import axios from '../../axios';

const useAxios = () => {

    const refresh = useRefreshToken();

    const { token } = useAuth();

    // Add interceptors
    useEffect(() => {
        // Request interceptors
        const requestInterceptors = axios.interceptors.request.use(
            async (config) => {
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptors
        const responseInterceptors = axios.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            async (error) => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    // Attach private attribute to request to keep track
                    originalRequest._retry = true;
                    try {
                        const accessToken = await refresh();
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        // Handle refresh token error, e.g., redirect to login
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        // Cleanup
        return () => {
            axios.interceptors.request.eject(requestInterceptors);
            axios.interceptors.response.eject(responseInterceptors);
        };
    }, []);

    return axios;
};

export default useAxios;
