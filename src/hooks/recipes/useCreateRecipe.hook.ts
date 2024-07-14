import { useMutation } from "react-query";
import useAxios from "../axios/useAxios.hook";

const useCreateRecipe = () => {

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