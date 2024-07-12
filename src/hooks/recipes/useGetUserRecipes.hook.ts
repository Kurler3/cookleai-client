import { mockRecipes } from "../../utils/constants/recipes.constants";


const useGetUserRecipes = () => {

    //TODO Make request
    
    return {
        recipes: mockRecipes,
        isLoadingRecipes: true,
    }
};

export default useGetUserRecipes;