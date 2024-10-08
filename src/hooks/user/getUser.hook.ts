import { useQuery } from "@tanstack/react-query"
import { getMinutesInMs } from "../../utils/functions"
import { IUser } from "../../types"
import useAxios from "../axios/useAxios.hook"
import { useAuth } from "../auth/useAuth.hook"

export const useGetUser = (
) => {

    const axios = useAxios();
    const {
        token
    } = useAuth();

    const {
        data,
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
    } = useQuery({
        // enabled: !!token,
        staleTime: getMinutesInMs(5),
        queryKey: ['current_user', token],
        queryFn: async () => {

            // Check if token is ok and user exists
            const user = await axios.get('/users/me', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }); 
            
            return user.data as IUser;
        },
        refetchInterval: getMinutesInMs(5), // 5 Minutes
        refetchIntervalInBackground: true,
        retry: false,
    }); 

    return {
        isLoadingUser: isLoading || isFetching,
        isErrorWhileGettingUser: isError,
        user: data,
        isFetchedUserSuccessfully: isSuccess,
        error: error as Error,
        isLoggedIn: !!data && isSuccess,
    }

}