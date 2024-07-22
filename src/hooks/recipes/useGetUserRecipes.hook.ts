import { useInfiniteQuery } from "react-query";
import useAxios from "../axios/useAxios.hook";
import { IRecipe } from "@/types";
import { useCallback, useMemo, useRef } from "react";

const useGetUserRecipes = (pageSize = 15) => {
    const observer = useRef<IntersectionObserver>();

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
    });

    const lastElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isLoading) return;

            // If when this func runs there is a observer, disconnect.
            if (observer.current) observer.current.disconnect();

            // Init observer and set in ref
            observer.current = new IntersectionObserver((entries) => {
                // If the first entry attached to this ref is intersecting the view port and
                // if there is a next page
                // and is not currently fetching => fetch next page
                if (entries[0].isIntersecting && hasNextPage && !isFetching) {
                    fetchNextPage();
                }
            });

            if (node) observer.current.observe(node);
        },
        [fetchNextPage, hasNextPage, isFetching, isLoading]
    );

    // Map between recipeId to pageIndex + indexInPage (will be faster when deleting)
    const recipeIdToIndexMap: Map<
        number,
        { pageIndex: number; indexInPage: number }
    > = useMemo(() => {
        const recipeMap = new Map();

        recipes?.pages.forEach((page, pageIndex) => {
            page.forEach((recipe, indexInPage) => {
                recipeMap.set(recipe.id, { pageIndex, indexInPage });
            });
        });

        return recipeMap;
    }, [recipes?.pages]);

    return {
        recipes: recipes?.pages.flat(),
        isLoadingRecipes: status === "loading",
        errorWhileGettingRecipes,
        isFetchingNextPage,
        lastElementRef,
        refetchUserRecipes: refetch,
        recipeIdToIndexMap,
    };
};

export default useGetUserRecipes;
