import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import useGetUserRecipes from "./useGetUserRecipes.hook";
import { IGetUserRecipesData, IRecipe, IUpdateRecipe } from "@/types";
import axiosNetworkErrorHandler from "@/utils/functions/axiosNetworkErrorHandler";
import toast from "react-hot-toast";

const useEditRecipe = () => {

    // Get the query client
    const queryClient = useQueryClient();
    
    const axios = useAxios();

    const { recipeIdToIndexMap } = useGetUserRecipes();


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
        onSuccess: (editedReciped: IRecipe) => {

            queryClient.setQueryData(["my-recipes"], (oldData: unknown) => {

                const recipeIndexes = recipeIdToIndexMap.get(
                    editedReciped.id,
                );

                if(!recipeIndexes) return editedReciped;

                (oldData as IGetUserRecipesData).pages[recipeIndexes.pageIndex][recipeIndexes.indexInPage] = editedReciped;

                return oldData;
            })  

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