import { useMutation } from "@tanstack/react-query";
import { ICookbook } from "../../types"
import axiosNetworkErrorHandler from "../../utils/functions/axiosNetworkErrorHandler";
import useAxios from "../axios/useAxios.hook";
import useGetRecipes from "../recipes/useGetRecipes.hook";
import toast from "react-hot-toast";


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
        filters: {
            cuisine: null,
            difficulty: null,
            title: null,
        }
    });

    const axios = useAxios();

    const {
        isPending: isRemovingRecipeFromCookbook,
        mutate: removeRecipeFromCookbook,
    } = useMutation({
        mutationKey: ["remove.recipe.from.cookbook"],
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
            };
            
        },
        onSuccess: ({
            recipeId,
        }) => {

            // Remove from cache.
            removeRecipeFromCache(recipeId);

            toast.success('Removed the recipe from the cookbook successfully!')

        },
        onError: axiosNetworkErrorHandler('An error occurred while removing the recipe from the cookbook'),
    });

    return {
        isRemovingRecipeFromCookbook,
        removeRecipeFromCookbook
    };

};

export default useRemoveRecipeFromCookbook;