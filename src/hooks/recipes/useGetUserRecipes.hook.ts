import { mockRecipes } from "../../utils/constants/recipes.constants";


const useGetUserRecipes = () => {

    //TODO Make request
    
    return {
        recipes: mockRecipes,
        isLoadingRecipes: false,
    }
};

export default useGetUserRecipes;