import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import useGetUserRecipes from "./useGetUserRecipes.hook";
import { IRecipe, IUpdateRecipe } from "@/types";
import axiosNetworkErrorHandler from "@/utils/functions/axiosNetworkErrorHandler";
import toast from "react-hot-toast";

const useEditRecipe = () => {

    // Get the query client
    const queryClient = useQueryClient();
    
    const axios = useAxios();

    const { editRecipeInCache } = useGetUserRecipes();

    const {
        mutate: editRecipe,
        isPending: isEditingRecipe,
        error: editRecipeError,
    } = useMutation({
        mutationKey: ['editRecipe'],
        mutationFn: async (
            recipeUpdateObject: IUpdateRecipe,
        ) => {
            const res = await axios.patch(`/recipes/${recipeUpdateObject.id}`, recipeUpdateObject); 
            return res.data;
        },
        onSuccess: (editedRecipe: IRecipe) => {

            // Update cache in list
            editRecipeInCache(editedRecipe)
            
            // Update cache of single recipe
            queryClient.setQueryData(
                ["recipe", editedRecipe.id.toString()], 
                () => editedRecipe,
            );

            toast.success('Recipe edited successfully!')
        },
        onError: axiosNetworkErrorHandler('An error ocurred while editing this recipe'),
        retry: false,

    })



    return {
        editRecipe,
        isEditingRecipe,
        editRecipeError,
    }
};

export default useEditRecipe;