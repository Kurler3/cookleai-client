import { IRecipe } from "@/types";
import { useMemo } from "react";




const useCanEditRecipe = (
    recipe?: IRecipe
) => {
    return useMemo(() => {
        if(!recipe) return false;
        if(!recipe.role) return false;
        return recipe.role === 'EDITOR' || recipe.role === 'OWNER';
    }, [recipe]);
};

export default useCanEditRecipe;