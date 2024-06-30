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
        queryKey: 'current_user',
        queryFn: async () => {

            if(!jwtToken) {
                throw new Error('No token found');
            }

            // Check if token is ok and user exists
            const user = await axios.get(BASE_BACKEND_URL + '/user/me', {
                headers: {
                    Authorization: 'Bearer ' + jwtToken,
                },
            });

            // Set jwt in local storage for future requests.
            localStorage.setItem(COOKLEAI_ACCESS_TOKEN, jwtToken!);

            return user.data as IUser;
        },
        refetchInterval:  getMinutesInMs(5 * 60), // 5 Minutes
        refetchIntervalInBackground: true,
    })

    return {
        isLoadingUser: isLoading || isFetching,
        isErrorWhileGettingUser: isError,
        user: data,
        isFetchedUserSuccessfully: isSuccess,
        error,
    }

}