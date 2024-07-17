import { useInfiniteQuery } from "react-query";
import useAxios from "../axios/useAxios.hook";
import { IRecipe } from "@/types";


const useGetUserRecipes = () => {

    const axios = useAxios();

    const {
        isLoading,
        isFetching,
        fetchNextPage,
        data: recipes,
        error: errorWhileGettingRecipes,
    } = useInfiniteQuery({
        queryKey: ['my-recipes'],
        queryFn: ({ pageParams }):Promise<IRecipe[]> => axios.get('/recipes/my-recipes', { params: { page: pageParams, } }).then(res => res.data),
        getNextPageParam: (lastPage, pages) => {
            console.log({lastPage, pages});
            // if (lastPage.length < 10) return undefined;
            // return pages.length + 1;
        }
    });

    console.log({recipes})
    // fetchNextPage();

    return {
        recipes: recipes?.pages.flat(),
        isLoadingRecipes: isLoading || isFetching,
        errorWhileGettingRecipes,
    }
};

export default useGetUserRecipes;