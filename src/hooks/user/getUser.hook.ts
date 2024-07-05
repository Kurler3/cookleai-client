import { useQuery } from "react-query"
import { getMinutesInMs } from "../../utils/functions"
import { BASE_BACKEND_URL, COOKLEAI_ACCESS_TOKEN } from "../../utils/constants"
import { IUser } from "../../types"
import usePrivateAxios from "../axios/usePrivateAxios.hook"
import { useAuth } from "../auth/useAuth.hook"

export const useGetUser = (
) => {

    const privateAxios = usePrivateAxios();
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
        enabled: !!token,
        staleTime: getMinutesInMs(5),
        queryKey: ['current_user', token],
        queryFn: async () => {

            // Check if token is ok and user exists
            const user = await privateAxios.get('/users/me', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            // Set jwt in local storage for future requests.
            localStorage.setItem(COOKLEAI_ACCESS_TOKEN, token!);

            return user.data as IUser;
        },
        onError: () => {
            // localStorage.removeItem(COOKLEAI_ACCESS_TOKEN)
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
        isLoggedIn: !!data && isSuccess,
    }

}