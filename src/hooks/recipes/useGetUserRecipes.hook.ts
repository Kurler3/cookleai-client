import { InfiniteData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import { IRecipe, IRecipeFilters } from "@/types";
import { useInfinityQueryFunctions } from "../common/useInfinityQueryFunctions";
import { getMinutesInMs } from "@/utils/functions";

type IUseGetUserRecipesInput = {
    pageSize?: number;
    filters?: IRecipeFilters;
}

const useGetUserRecipes = ({
    pageSize = 15,
    filters,
}: IUseGetUserRecipesInput = {}) => {

    const queryKey = ["my-recipes", filters ?? {
        cuisine: null,
        difficulty: null,
        title: null,
    }
    ]

    const axios = useAxios();
    const queryClient = useQueryClient();

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
        queryKey,
        queryFn: async ({ pageParam = 0 }): Promise<IRecipe[]> => {
            return axios
                .get("/recipes/my-recipes", {
                    params: {
                        page: pageParam,
                        limit: pageSize,
                        ...(filters ?? {})
                    },
                })
                .then((res) => res.data);
        },
        getNextPageParam: (lastPage, pages) => {
            return lastPage.length ? pages.length : undefined; // If the last page was not empty, then continue fetching, otherwise stop.
        },
        initialPageParam: 0,
        // If any filters, don't cache the data, because it can change often and its hard to manage with mutations.
        staleTime: filters ? 0 : getMinutesInMs(3),
    });

    const {
        lastElementRef,
        itemIdToIndexesMap: recipeIdToIndexMap,
        flatData,
    } = useInfinityQueryFunctions<IRecipe>({
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetching,
        data: recipes,
    });

    ////////////////////////////////////
    // FUNCTIONS ///////////////////////
    ////////////////////////////////////

    const removeRecipeFromCache = (recipeId: number) => {
        const recipeIndexes = recipeIdToIndexMap.get(recipeId);
        if (!recipeIndexes) return;

        queryClient.setQueryData(queryKey, (oldData: InfiniteData<IRecipe[]>) => {

            if (!oldData) return null;

            const newData = { ...oldData };

            newData.pages = oldData.pages.map((page) => [...page]);

            newData.pages[recipeIndexes.pageIndex].splice(recipeIndexes.indexInPage, 1);

            return newData;
        });

        queryClient.invalidateQueries({ queryKey, exact: true });
    };

    const addRecipeToCache = (newRecipe: IRecipe) => {

        // Remove the recipe from the cache
        queryClient.setQueryData(
            queryKey,
            (oldData: InfiniteData<IRecipe[]>) => {

                if (!oldData) {
                    console.error(`no cache found for: 'my-recipes'`);
                    return null;
                }

                // Clone oldData to ensure new references
                const newData = {
                    ...oldData,
                    pages: oldData.pages.map((page) => [...page]),
                };


                newData.pages[0].unshift(newRecipe);

                return newData;
            }
        );
    }

    const editRecipeInCache = (updatedRecipe: IRecipe) => {
        queryClient.setQueryData(
            queryKey,
            (oldData: InfiniteData<IRecipe[]>) => {

                if (!oldData) {
                    console.error(`no cache found for: 'my-recipes'`);
                    return null;
                }

                const newData = {
                    ...oldData,
                    pages: oldData.pages.map((page) => [...page]),
                };

                const recipeIndexes = recipeIdToIndexMap.get(updatedRecipe.id);

                if (!recipeIndexes) return newData;

                newData.pages[recipeIndexes.pageIndex][recipeIndexes.indexInPage] = updatedRecipe;

                return newData;
            }
        )
    }

    ////////////////////////////////////
    // RETURN //////////////////////////
    ////////////////////////////////////

    return {
        recipes: flatData,
        isLoadingRecipes: status === "pending",
        errorWhileGettingRecipes,
        isFetchingNextPage,
        lastElementRef,
        refetchUserRecipes: refetch,
        recipeIdToIndexMap,

        ////////////////////////////////////////////
        // FUNCTIONS FOR UPDATING THE CACHE ////////
        ////////////////////////////////////////////

        removeRecipeFromCache,
        addRecipeToCache,
        editRecipeInCache,

    };
};

export default useGetUserRecipes;
