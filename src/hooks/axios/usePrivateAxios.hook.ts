import { useEffect } from 'react';
import useRefreshToken from '../auth/useRefreshToken.hook';
import { privateAxios } from '../../axios';
import { useAuth } from '../auth/useAuth.hook';
import { AxiosResponse } from 'axios';

const usePrivateAxios = () => {
    const refresh = useRefreshToken();

    const { token } = useAuth();

    // Add interceptors
    useEffect(() => {
        // Request interceptors
        const requestInterceptors = privateAxios.interceptors.request.use(
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
        const responseInterceptors = privateAxios.interceptors.response.use(
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

                        return privateAxios(originalRequest);
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
            privateAxios.interceptors.request.eject(requestInterceptors);
            privateAxios.interceptors.response.eject(responseInterceptors);
        };
    }, []);

    return privateAxios;
};

export default usePrivateAxios;
