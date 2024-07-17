import { useInfiniteQuery } from "react-query";
import useAxios from "../axios/useAxios.hook";
import { IRecipe } from "@/types";

const useGetUserRecipes = (pageSize = 15) => {
    const axios = useAxios();

    const {
        fetchNextPage,
        isFetchingNextPage,
        data: recipes,
        error: errorWhileGettingRecipes,
        hasNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["my-recipes", pageSize],
        queryFn: async ({ pageParam = 0 }): Promise<IRecipe[]> => {

            await new Promise((resolve) => setTimeout(resolve, 2000));

            return axios
            .get("/recipes/my-recipes", {
                params: { page: pageParam, limit: pageSize },
            })
            .then((res) => res.data)

        },
        getNextPageParam: (lastPage, pages) => {
            return lastPage.length ? pages.length : undefined; // If the last page was not empty, then continue fetching, otherwise stop.
        },
    });

    return {
        recipes: recipes?.pages.flat(),
        isLoadingRecipes: status === 'loading', // isLoading || isFetching,
        errorWhileGettingRecipes,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    };
};

export default useGetUserRecipes;
