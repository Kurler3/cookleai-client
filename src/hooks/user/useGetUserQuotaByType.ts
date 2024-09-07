import { useQuery } from "@tanstack/react-query"
import useAxios from "../axios/useAxios.hook";
import { IQuota } from "@/types/quota.types";
import { getMinutesInMs } from "@/utils/functions";


type IUseGetUserQuotaByTypeProps = {
    quotaType: 'AI';
}

export const useGetUserQuotaByType = ({
    quotaType
}: IUseGetUserQuotaByTypeProps) => {

    const axios = useAxios();

    const {
        data: quota,
        isLoading,
        isFetching,
        error: errorWhileGettingUserQuota,
    } = useQuery({
        queryKey: ['user.quota', quotaType],
        queryFn: async ():Promise<IQuota>  => {
            const { data } = await axios.get('/users/quota-by-type', {
                params: {
                    quotaType,
                }
            });

            return data;
        },
        // Only launch request if there is a recipeId
        enabled: !!quotaType,
        retry: false,
        staleTime: getMinutesInMs(3),
    });

    return {
        quota,
        isGettingQuota: isLoading || isFetching,
        errorWhileGettingUserQuota, 
    }

}
