import useGetRecipe from "@/hooks/recipes/useGetRecipe.hook";
import { useParams } from "react-router-dom";
import useCanEditRecipe from "@/hooks/recipes/useCanEditRecipe.hook";
import RecipeDisplayPageHeader from "./display/RecipeDisplayPageHeader";
import RecipeDisplayMainContent from "./display/mainContent/RecipeDisplayMainContent";

const DetailedRecipePage = () => {

  const { recipeId } = useParams();

  const {
    isLoadingRecipe,
    errorWhileGettingRecipe,
    recipe,
  } = useGetRecipe(recipeId);

  const canEditRecipe = useCanEditRecipe(recipe);

  /////////////////////////////////////
  // RETURN ///////////////////////////
  /////////////////////////////////////

  //TODO: Handle
  if (isLoadingRecipe) {
    return <div>Loading...</div>
  }

  //TODO: Handle
  if (errorWhileGettingRecipe) {
    return <div>Error while getting recipe</div>
  }

  return (
    <div className="flex justify-start items-center flex-col gap-4 h-full w-full overflow-auto px-2">

      {/* HEADER */}
      <RecipeDisplayPageHeader
        recipe={recipe}
        canEditRecipe={canEditRecipe}
      />


      {/* MAIN CONTENT */}
      <RecipeDisplayMainContent
        recipe={recipe}
      />

    </div>
  )
}

export default DetailedRecipePage