import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/utils/constants";
import toast from "react-hot-toast";
import { IQuota } from "@/types/quota.types";
// import useGetRecipes from "./useGetRecipes.hook";
import { IRecipe } from "../../types";

type IUseCreateRecipeArgs = {
    withAI?: boolean;
    cookbookId?: string;
}

const useCreateRecipe = ({
    withAI=false,
    cookbookId,
}: IUseCreateRecipeArgs={}) => {

    const navigate = useNavigate();
    const axios = useAxios();
    const queryClient = useQueryClient();

    // const {
    //     addRecipeToCache
    // } = useGetRecipes({
    //     cookbookId,
    // });

    const {
        data: newRecipe,
        isPending: isCreatingRecipe,
        error: errorCreatingRecipe,
        mutate: createRecipe,
    } = useMutation({
        mutationFn: async (title: string) => {
            const apiRoute = withAI ? 'create-with-ai' : 'create';
            const body = withAI ? { prompt: title } : { title }
            const response = await axios.post(`/recipes/${apiRoute}`, body);

            const newRecipe = response.data as IRecipe;

            if(cookbookId) {
                await axios.post(`/cookbooks/${cookbookId}/recipes/${newRecipe.id}`);
            }

            return newRecipe;
        },
        onError: () => {

            // Show toast
            toast.error('Error creating recipe. Please try again');

        },
        onSuccess: (data) => {

            // // Add recipe to the cache.
            // addRecipeToCache(data);

            if(withAI) {

                queryClient.setQueryData(
                    ['user.quota', 'AI'],
                    (oldData: IQuota) => {
                        if(!oldData) return null;

                        const newQuota = {...oldData};

                        newQuota.used += 1;

                        return newQuota;
                    }
                )

            }

            // Show success toast
            toast.success('Recipe created successfully');

            // Redirect to page of recipe
            navigate(`${ROUTE_PATHS.RECIPES}/${data.id}`);
        }
    });

    return {
        newRecipe,
        isCreatingRecipe,
        errorCreatingRecipe,
        createRecipe,
    }
};

export default useCreateRecipe;