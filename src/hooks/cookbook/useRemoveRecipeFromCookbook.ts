import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICookbook } from "../../types"
import axiosNetworkErrorHandler from "../../utils/functions/axiosNetworkErrorHandler";
import useAxios from "../axios/useAxios.hook";
import toast from "react-hot-toast";


type IUseRemoveRecipeFromCookbookArgs = {
    cookbook: ICookbook;
}

const useRemoveRecipeFromCookbook = ({
    cookbook,
}: IUseRemoveRecipeFromCookbookArgs) => {

    const queryClient = useQueryClient();

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
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: [
                    'cookbook.recipes',
                    cookbook.id.toString(),
                    10,
                    {
                        cuisine: null,
                        difficulty: null,
                        title: null,
                    }
                ],
                exact: true
            })

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