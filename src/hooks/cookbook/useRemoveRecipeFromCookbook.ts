import { useMutation } from "@tanstack/react-query";
import { ICookbook } from "../../types"
import axiosNetworkErrorHandler from "../../utils/functions/axiosNetworkErrorHandler";
import useAxios from "../axios/useAxios.hook";
import useGetRecipes from "../recipes/useGetRecipes.hook";


type IUseRemoveRecipeFromCookbookArgs = {
    cookbook: ICookbook;
}

const useRemoveRecipeFromCookbook = ({
    cookbook,
}: IUseRemoveRecipeFromCookbookArgs) => {

    const {
        removeRecipeFromCache
    } = useGetRecipes({
        cookbookId: cookbook.id.toString(),
    });

    const axios = useAxios();

    const {
        isPending: isRemovingRecipeFromCookbook,
        mutate: removeRecipeFromCookbook,
    } = useMutation({
        mutationKey: ["removeRecipeFromCookbook"],
        mutationFn: async ({
            recipeId,
        }: {
            recipeId: number;
        }) => {
            await axios.delete(`/cookbooks/${cookbook.id}/remove-recipe`, {
                data: {
                    recipeId,
                }
            });

            return {
                recipeId,
            }
        },
        onSuccess: ({
            recipeId,
        }) => {
        
            // Remove from cache.
            removeRecipeFromCache(recipeId)

        },
        onError: axiosNetworkErrorHandler('An error occurred while removing the recipe from the cookbook'),
    });

    return {
        isRemovingRecipeFromCookbook,
        removeRecipeFromCookbook
    };

};

export default useRemoveRecipeFromCookbook;