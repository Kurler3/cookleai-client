import useGetRecipe from "@/hooks/recipes/useGetRecipe.hook";
import { useParams } from "react-router-dom";


//TODO
const DetailedRecipeEditPage = () => {
    
  const { recipeId } = useParams();

  const {
    isLoadingRecipe,
    errorWhileGettingRecipe,
    recipe,
  } = useGetRecipe(recipeId);

return (
    <div>
      {recipeId}
    </div>
  )
}

export default DetailedRecipeEditPage