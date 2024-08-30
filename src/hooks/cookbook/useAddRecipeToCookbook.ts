import { ICookbook, IGetCookbooksQueryParams } from "@/types";
import useAxios from "../axios/useAxios.hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IInfinityQueryData } from "@/types/api.types";
import useGetCookbooks from "./useGetCookbooks";
import toast from "react-hot-toast";
import axiosNetworkErrorHandler from "@/utils/functions/axiosNetworkErrorHandler";


const useAddRecipeToCookbook = (cookbookQueryParams?: IGetCookbooksQueryParams) => {

    const axios = useAxios();

    const queryClient = useQueryClient();

    const {
        cookbookIdToIndexesMap,
    } = useGetCookbooks(cookbookQueryParams);

    const {
        mutate,
        isPending,
    } = useMutation({
        mutationKey: [
            "add-recipe-to-cookbook",
        ],
        mutationFn: async ({
            cookbookId,
            recipeId,
        }: {
            cookbookId: number,
            recipeId: number,
        }) => {
            await axios.post(`/cookbooks/${cookbookId}/recipes/${recipeId}`);
            return {
                cookbookId,
                recipeId,
            };
        },
        onSuccess: ({
            cookbookId,
        }) => {

            // Update cache (remove the cookbook from this cache)
            // Only remove this cookbook IF this query cache is using the excludeRecipeId.
            if (cookbookQueryParams?.excludedRecipeId) {
                queryClient.setQueryData(
                    [
                        "cookbooks",
                        cookbookQueryParams
                    ],
                    (oldData: IInfinityQueryData<ICookbook>) => {

                        const newData = { ...oldData };

                        const cookbookIndexes = cookbookIdToIndexesMap.get(cookbookId);

                        if (!cookbookIndexes) return newData;

                        try {
                            newData.pages[cookbookIndexes.pageIndex].splice(cookbookIndexes.indexInPage, 1)
                        } catch (error) {
                            console.error('Error: ', error)
                        }

                        return newData;
                    }
                );
            }


            toast.success('Recipe added to cookbook!');
        },
        onError: axiosNetworkErrorHandler(
            'An error ocurred while adding this recipe to this coobook'
        ),
        retry: false,
    });

    return {
        addRecipeToCookbook: mutate,
        isAddingRecipeToCookbook: isPending,
    }
}

export default useAddRecipeToCookbook;