import { useInfiniteQuery } from "react-query";
import useAxios from "../axios/useAxios.hook";
import { IRecipe } from "@/types";
import { useCallback, useRef } from "react";

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

    const lastElementRef = useCallback(
        (node: HTMLDivElement) => {
          if (isLoading) return;
    
          if (observer.current) observer.current.disconnect();
    
          observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetching) {
              fetchNextPage();
            }
          });
    
          if (node) observer.current.observe(node);
        },
        [fetchNextPage, hasNextPage, isFetching, isLoading]
      );

    return {
        recipes: recipes?.pages.flat(),
        isLoadingRecipes: status === 'loading', // isLoading || isFetching,
        errorWhileGettingRecipes,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        lastElementRef,
    };
};

export default useGetUserRecipes;
