import { useMutation } from "react-query";
import useAxios from "../axios/useAxios.hook";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/utils/constants";
import toast from "react-hot-toast";

const useCreateRecipe = () => {

    const navigate = useNavigate();
    const axios = useAxios();

    const {
        data: newRecipe,
        isLoading: isCreatingRecipe,
        error: errorCreatingRecipe,
        mutate: createRecipe,
    } = useMutation({
        mutationFn: async (title: string) => {
            const response = await axios.post('/recipes/create', { title });
            return response.data;
        },
        onError: () => {

            // Show toast
            toast.error('Error creating recipe. Please try again');

        },
        onSuccess: (data) => {

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