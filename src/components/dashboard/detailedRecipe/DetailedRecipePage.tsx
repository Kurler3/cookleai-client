import useGetRecipe from "@/hooks/recipes/useGetRecipe.hook";
import { useParams } from "react-router-dom";
import useCanEditRecipe from "@/hooks/recipes/useCanEditRecipe.hook";
import RecipeDisplayPageHeader from "./display/RecipeDisplayPageHeader";
import RecipeDisplayMainContent from "./display/mainContent/RecipeDisplayMainContent";
import LoadingScreen from "@/components/utils/LoadingScreen";
import ErrorScreen from "@/components/utils/ErrorScreen";
import MembersList from "../../utils/MembersList";
import { RECIPE_ACTION_MODAL_IDS } from "../../../utils/constants";
import { useGetUser } from "../../../hooks/user";
import ManageRecipeMembersModal from "./modals/ManageRecipeMembersModal";

const DetailedRecipePage = () => {

  const { recipeId } = useParams();

  const {
    isLoadingRecipe,
    errorWhileGettingRecipe,
    recipe,
  } = useGetRecipe(recipeId);

  const {
    user: currentUser
  } = useGetUser();

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

      {/* MEMBERS */}
      <MembersList 
        modalId={RECIPE_ACTION_MODAL_IDS.MANAGE_MEMBERS}
        isRecipe={true}
        currentUser={currentUser}
        members={recipe?.users ||[]}
      />


      {/* MAIN CONTENT */}
      <RecipeDisplayMainContent
        recipe={recipe}
      />

      {/* MANAGE MEMBERS MODAL */}
      <ManageRecipeMembersModal 
        recipe={recipe}
      />

    </div>
  )
}

export default DetailedRecipePage