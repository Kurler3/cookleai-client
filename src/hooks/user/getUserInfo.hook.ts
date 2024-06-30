import { useQuery } from "react-query"
import { getMinutesInMs } from "../../utils/functions"
import axios from "axios"
import { BASE_BACKEND_URL, COOKLEAI_ACCESS_TOKEN } from "../../utils/constants"
import { IUser } from "../../types"

export const useGetUser = (
    jwtToken=localStorage.getItem(COOKLEAI_ACCESS_TOKEN)
) => {

    const {
        data,
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
    } = useQuery({
        staleTime: getMinutesInMs(5),
        queryKey: 'current_user',
        queryFn: async () => {

            if(!jwtToken) {
                throw new Error('No token found');
            }

            // Check if token is ok and user exists
            const user = await axios.get(BASE_BACKEND_URL + '/users/me', {
                headers: {
                    Authorization: 'Bearer ' + jwtToken,
                },
            });

            // Set jwt in local storage for future requests.
            localStorage.setItem(COOKLEAI_ACCESS_TOKEN, jwtToken!);

            return user.data as IUser;
        },
        onError: () => {
            localStorage.removeItem(COOKLEAI_ACCESS_TOKEN)
        },
        refetchInterval:  getMinutesInMs(5 * 60), // 5 Minutes
        refetchIntervalInBackground: true,
        retry: false,
        
    })

    return {
        isLoadingUser: isLoading || isFetching,
        isErrorWhileGettingUser: isError,
        user: data,
        isFetchedUserSuccessfully: isSuccess,
        error,
    }

}