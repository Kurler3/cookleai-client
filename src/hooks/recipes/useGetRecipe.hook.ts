import { useQuery } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import { useNavigate } from "react-router-dom";
import { RECIPE_ROLES, ROUTE_PATHS } from "@/utils/constants";
import toast from "react-hot-toast";
import { INetworkError, IRecipe } from "@/types";
import { useEffect } from "react";
import useIsInEditPage from "../common/useIsInEditPage";
import { getMinutesInMs } from "@/utils/functions";

const useGetRecipe = (recipeId?: string) => {
    const navigate = useNavigate();
    const axios = useAxios();

    const isInEditPage = useIsInEditPage();

    const {
        isLoading,
        isFetching,
        error: errorWhileGettingRecipe,
        data: recipe,
    } = useQuery({
        // Set the query key
        queryKey: ['recipe', recipeId],

        // Set the query function
        queryFn: async (): Promise<IRecipe> => {
            const { data } = await axios.get(`/recipes/${recipeId}`);
            return data;
        },
        // Only launch request if there is a recipeId
        enabled: !!recipeId,
        retry: false,
        staleTime: getMinutesInMs(3),
        
    });

    useEffect(() => {

        // If there's an error
        if(errorWhileGettingRecipe) {

            let toastErrMsg: string;

            // If unauthorized
            if ((errorWhileGettingRecipe as INetworkError).statusCode === 401) {
                toastErrMsg = "You are not authorized to view this recipe";
            } else {
                toastErrMsg = "An error occurred while getting the recipe";
            }

            toast.error(toastErrMsg);

            navigate(ROUTE_PATHS.RECIPES);

        }
    }, [errorWhileGettingRecipe, navigate]);

    // If role is viewer, and trying to edit => redirect back
    useEffect(() => {

        if(recipe?.role === RECIPE_ROLES.VIEWER && isInEditPage) {
            toast.error('You are not authorized to edit this recipe');
            navigate(ROUTE_PATHS.RECIPES);
        }

    }, [isInEditPage, navigate, recipe?.role])

    return {
        isLoadingRecipe: isLoading || isFetching,
        errorWhileGettingRecipe,
        recipe,
    };
};

export default useGetRecipe;
