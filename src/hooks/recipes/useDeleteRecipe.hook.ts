import { useMutation } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import toast from "react-hot-toast";
import { handleCloseModal } from "@/utils/functions/closeModal";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants";
import useGetUserRecipes from "./useGetUserRecipes.hook";
import axiosNetworkErrorHandler from "@/utils/functions/axiosNetworkErrorHandler";
import { IRecipeFilters } from "@/types";


type IProps = {
    recipeId?: number;
    onSuccessCallback?: () => void;
    filters?: IRecipeFilters;
};

const useDeleteRecipe = ({
    recipeId, 
    onSuccessCallback,
    filters,
}: IProps={}) => {

    const axios = useAxios();

    // const { removeRecipeFromCache } = useGetUserRecipes({ filters });

    const {
        mutate: deleteRecipe,
        isPending: isDeletingRecipe,
        error: deleteRecipeError,
    } = useMutation({
        mutationKey: ["deleteRecipe"],
        mutationFn: async () => {
            const response = await axios.delete(`/recipes/${recipeId}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Recipe deleted successfully");

            // Delete recipe from cache.
            // removeRecipeFromCache(recipeId!);

            // Close modal
            handleCloseModal(RECIPE_ACTION_MODAL_IDS.DELETE);

            onSuccessCallback?.();

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