import useGetRecipe from "@/hooks/recipes/useGetRecipe.hook";
import { useParams } from "react-router-dom";


const DetailedRecipePage = () => {

  const { recipeId } = useParams();

  const {
    isLoadingRecipe,
    errorWhileGettingRecipe,
    recipe,
  } = useGetRecipe(recipeId);
      
  return (
    <div>DetailedRecipePage</div>
  )
}

export default DetailedRecipePage