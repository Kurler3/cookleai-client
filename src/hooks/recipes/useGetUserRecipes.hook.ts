import { useInfiniteQuery } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import { IRecipe } from "@/types";
import { useInfinityQueryFunctions } from "../common/useInfinityQueryFunctions";

const useGetUserRecipes = (pageSize = 15) => {

    const axios = useAxios();

    const {
        fetchNextPage,
        isFetching,
        isLoading,
        isFetchingNextPage,
        data: recipes,
        error: errorWhileGettingRecipes,
        hasNextPage,
        status,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["my-recipes"],
        queryFn: async ({ pageParam = 0 }): Promise<IRecipe[]> => {
            return axios
                .get("/recipes/my-recipes", {
                    params: { page: pageParam, limit: pageSize },
                })
                .then((res) => res.data);
        },
        getNextPageParam: (lastPage, pages) => {
            return lastPage.length ? pages.length : undefined; // If the last page was not empty, then continue fetching, otherwise stop.
        },
        initialPageParam: 0,
    });

    const {
        lastElementRef,
        itemIdToIndexesMap: recipeIdToIndexMap,
    } = useInfinityQueryFunctions<IRecipe>({
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetching,
        data: recipes,
    });


    return {
        recipes: recipes?.pages.flat(),
        isLoadingRecipes: status === "pending",
        errorWhileGettingRecipes,
        isFetchingNextPage,
        lastElementRef,
        refetchUserRecipes: refetch,
        recipeIdToIndexMap,
    };
};

export default useGetUserRecipes;
