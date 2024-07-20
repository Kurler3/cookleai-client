import { useMutation, useQueryClient } from "react-query";
import useAxios from "../axios/useAxios.hook";
import toast from "react-hot-toast";
import { handleCloseModal } from "@/utils/functions/closeModal";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants";
import { IAxiosNetworkError, IGetUserRecipesData } from "@/types";
import useGetUserRecipes from "./useGetUserRecipes.hook";
import axiosNetworkErrorHandler from "@/utils/functions/axiosNetworkErrorHandler";


const useDeleteRecipe = (recipeId?: number) => {
    
    const queryClient = useQueryClient();
    const axios = useAxios();

    const { recipeIdToIndexMap } = useGetUserRecipes();
    
    const {
        mutate: deleteRecipe,
        isLoading: isDeletingRecipe,
        error: deleteRecipeError,
    } = useMutation({
        mutationKey: ["deleteRecipe", ],
        mutationFn: async () => {
            const response = await axios.delete(`/recipes/${recipeId}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Recipe deleted successfully");

            // Delete the recipe from the cache
            queryClient.setQueryData("my-recipes", (oldData: unknown) => {

                const recipeIndexes = recipeIdToIndexMap.get(recipeId!);

                if(!recipeIndexes) return oldData;

                (oldData as IGetUserRecipesData).pages[recipeIndexes.pageIndex].splice(recipeIndexes.indexInPage, 1);

                return oldData;
            });

            // Close modal
            handleCloseModal(RECIPE_ACTION_MODAL_IDS.DELETE);
        },
        onError: axiosNetworkErrorHandler("An error occurred while deleting the recipe"),
        retry: false,
    });

    return {
        deleteRecipe,
        isDeletingRecipe,
        deleteRecipeError
    }
};

export default useDeleteRecipe;