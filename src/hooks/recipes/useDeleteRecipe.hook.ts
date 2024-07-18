import { useMutation } from "react-query";
import useAxios from "../axios/useAxios.hook";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { handleCloseModal } from "@/utils/functions/closeModal";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants";


const useDeleteRecipe = () => {
    const navigate = useNavigate();
    const axios = useAxios();

    const {
        mutate: deleteRecipe,
        isLoading: isDeletingRecipe,
        error: deleteRecipeError,
    } = useMutation({
        mutationKey: ["deleteRecipe", ],
        mutationFn: async (recipeId: number) => {
            const response = await axios.delete(`/recipes/${recipeId}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Recipe deleted successfully");

            // Close modal
            handleCloseModal(RECIPE_ACTION_MODAL_IDS.DELETE);
        },
        onError: (error: AxiosError) => {
            toast.error(error.response?.data?.message);
        },
        retry: false,
    });

    return {
        deleteRecipe,
        isDeletingRecipe,
        deleteRecipeError
    }
};

export default useDeleteRecipe;