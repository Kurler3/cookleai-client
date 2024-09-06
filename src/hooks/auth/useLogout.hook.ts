import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import { useAuth } from "./useAuth.hook";
import { useNavigate } from "react-router-dom";


const useLogout = () => {

    const {
        setToken,
        token,
    } = useAuth();

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const axios = useAxios();

    // Call the api to clear the cookie, because can't access the http cookie from the client.
    const {
        mutate,
        isPending,
    } = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => axios.post('/auth/logout'),
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['current_user', token],
            });
            setToken(null);
            navigate('/');
        },
        onError: (error) => {
            console.error(error);
        },
        retry: false,
    });
    
    
    // Return
    return {
        isLoggingOut: isPending,
        logout: mutate 
    }
};

export default useLogout;