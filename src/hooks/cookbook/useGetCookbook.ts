import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import { ICookbook } from "../../types";
import useHandleFetchError from "../common/useHandleFetchError";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../utils/constants";

const useGetCookbook = (
    cookbookId?: string,
) => {

    const navigate = useNavigate();
    const axios = useAxios();
    const queryClient = useQueryClient();

    const {
        isLoading,
        isFetching,
        error,
        data,
        refetch,
    } = useQuery({
        enabled: !!cookbookId,
        queryKey: [
            "cookbook", cookbookId
        ],
        queryFn: async (): Promise<ICookbook> => {
            const { data } = await axios.get(`/cookbooks/${cookbookId}`);
            return data; 
        },
        staleTime: 1000 * 60 * 3,
        retry: false,
        refetchIntervalInBackground: true,
    });

    useHandleFetchError({
        error,
        errMsg: "An error occurred while getting the cookbook",
        unAuthorizedMsg: "You are not authorized to view this cookbook",
        fnc: () => {
            navigate(ROUTE_PATHS.COOKBOOKS)
        }
    });

    const handleEditCookbook = (
        newCookbook: Partial<ICookbook>
    ) => {

        queryClient.setQueryData(
            ["cookbook", cookbookId],
            (oldCookbook: ICookbook) => {

                if(!oldCookbook) return null;

                return {
                    ...oldCookbook,
                    ...newCookbook,
                }

            }
        )

    }

    return {
        isLoadingCookbook: isLoading || isFetching,
        error,
        refetch,
        cookbook: data,
        handleEditCookbook,
    }

}   


export default useGetCookbook;