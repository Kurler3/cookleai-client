import useGetRecipe from "@/hooks/recipes/useGetRecipe.hook";
import { useParams } from "react-router-dom";
import useCanEditRecipe from "@/hooks/recipes/useCanEditRecipe.hook";
import RecipeDisplayPageHeader from "./display/RecipeDisplayPageHeader";
import RecipeDisplayMainContent from "./display/mainContent/RecipeDisplayMainContent";
import LoadingScreen from "@/components/utils/LoadingScreen";
import ErrorScreen from "@/components/utils/ErrorScreen";

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

  // Handle
  if (isLoadingRecipe) {
    return (
      <LoadingScreen 
        message="Fetching your recipe..."
      />
    )
  }

  // Handle
  if (errorWhileGettingRecipe) {
    return (
      <ErrorScreen />
    )
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