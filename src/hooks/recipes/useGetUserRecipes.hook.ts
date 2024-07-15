import { useQuery } from "react-query";
import useAxios from "../axios/useAxios.hook";
import { IRecipe } from "@/types";


const useGetUserRecipes = () => {

    const axios = useAxios();

    const {
        isLoading,
        isFetching,
        data: recipes,
        error: errorWhileGettingRecipes,
    } = useQuery({
        queryKey: ['my-recipes'],
        queryFn: ():Promise<IRecipe[]> => axios.get('/recipes/my-recipes').then(res => res.data),
    })

    return {
        recipes,
        isLoadingRecipes: isLoading || isFetching,
        errorWhileGettingRecipes,
    }
};

export default useGetUserRecipes;