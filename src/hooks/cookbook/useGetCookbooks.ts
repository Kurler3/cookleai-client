import { ICookbook } from "@/types";
import useAxios from "../axios/useAxios.hook";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfinityQueryFunctions } from "../common/useInfinityQueryFunctions";

type IProps = {
    search?: string;
    selection?: string;
    pageSize?: number;
    excludedRecipeId?: number,
}

const useGetCookbooks = ({
    search,
    selection,
    excludedRecipeId,
    pageSize = 15,
}: IProps ={}) => {

    const axios = useAxios();

    const {
        fetchNextPage,
        isFetching,
        isLoading,
        isFetchingNextPage,
        data,
        error: errorWhileGettingCookbooks,
        hasNextPage,
        status,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["cookbooks", {
            search,
            selection,
            pageSize,
            excludedRecipeId,
        }],
        queryFn: async ({ pageParam = 0 }): Promise<ICookbook[]> => {

            //?? cookbook/my-cookbooks
                // Query params:
                    // search
                    // selection
                    // page
                    // limit
                    // excludedRecipeId
            return axios
                .get("/cookbooks/my-cookbooks", {
                    params: {
                        page: pageParam,
                        limit: pageSize,
                        selection,
                        search,
                        excludedRecipeId,
                    },
                })
                .then((res) => res.data);
        },
        getNextPageParam: (lastPage, pages) => {
            return lastPage.length > 0 ? pages.length : undefined;
        },
        initialPageParam: 0,
    });


    const {
        lastElementRef,
        itemIdToIndexesMap: cookbookIdToIndexesMap,
    } = useInfinityQueryFunctions<ICookbook>({
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetching,
        data,
    });


    return {
        cookbooks: data?.pages.flat(),
        isLoadingCookbooks: status === "pending",
        errorWhileGettingCookbooks,
        isFetchingNextPage,
        lastElementRef,
        refetchUserCookbooks: refetch,
        cookbookIdToIndexesMap,
    }
};

export default useGetCookbooks;