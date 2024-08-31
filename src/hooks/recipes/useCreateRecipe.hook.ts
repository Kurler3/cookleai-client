import { useMutation } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/utils/constants";
import toast from "react-hot-toast";

const useCreateRecipe = ({
    withAI=false
}={}) => {

    const navigate = useNavigate();
    const axios = useAxios();

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