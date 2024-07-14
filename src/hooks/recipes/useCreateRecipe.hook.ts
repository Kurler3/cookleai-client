import { useMutation } from "react-query";
import useAxios from "../axios/useAxios.hook";



const useCreateRecipe = () => {

    const axios = useAxios();


    const {
        data,
        isLoading: isCreatingRecipe,
        error: errorCreatingRecipe,
        mutate: createRecipe,
    } = useMutation(
        (recipeData: FormData) => axios.post('/recipes', recipeData),
        { retry: 3 }
    );

    return {
        data,
        isCreatingRecipe,
        errorCreatingRecipe,
        createRecipe,
    }
};

export default useCreateRecipe;