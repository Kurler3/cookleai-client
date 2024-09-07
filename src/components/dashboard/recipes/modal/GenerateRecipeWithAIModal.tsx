import useCreateRecipe from "@/hooks/recipes/useCreateRecipe.hook";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants"
import { useState } from "react";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useGetUserQuotaByType } from "@/hooks/user";

const GenerateRecipeWithAIModal = () => {

  //////////////////////////////////
  // HOOKS /////////////////////////
  //////////////////////////////////

  const {
    quota,
    isGettingQuota,
    errorWhileGettingUserQuota
  } = useGetUserQuotaByType({
    quotaType: 'AI',
  })

  const { isCreatingRecipe, createRecipe } = useCreateRecipe({
    withAI: true,
  });

  //////////////////////////////////
  // STATE /////////////////////////
  //////////////////////////////////

  const [recipeTitle, setRecipeTitle] = useState("");

  //////////////////////////////////
  // MEMO //////////////////////////
  //////////////////////////////////

  const canCreateRecipe = !(recipeTitle.length === 0 || isCreatingRecipe || isGettingQuota || !quota || quota.used >= quota.limit);

  //////////////////////////////////
  // FUNCTIONS /////////////////////
  //////////////////////////////////

  const handleCreateRecipe = () => {

    if(!canCreateRecipe) return;

    // If used more or equal to the limit of the quota
    if(quota!.used >= quota!.limit) {
      return;
    }

    createRecipe(recipeTitle);

  }

  //////////////////////////////////
  // RETURN ////////////////////////
  //////////////////////////////////

  if(errorWhileGettingUserQuota) {
    //TODO
    return (
      <div>
        Error getting user quota
      </div>
    )
  }

  return (
    <div className="modal" role='dialog'>

      <div className="modal-box flex items-start flex-col gap-4">
        <h3 className="text-lg font-medium text-white">
          Create a new recipe with AI <AutoAwesomeIcon
            className="text-info"
          />

        </h3>

        <p>Enter a list of ingredients or the name of a recipe</p>

        {/* INPUT */}
        <input
          type="text"
          className="input input-bordered w-full focus:outline-app-green transition"
          placeholder="Enter ingredients"
          value={recipeTitle}
          onChange={(e) => setRecipeTitle(e.target.value)}
          disabled={quota && quota.used >= quota.limit}
        />

        <div>
          {
            isGettingQuota && !quota ? (
              <div>

                Getting your quota...
                <span className="loading loading-spinner"></span>
              </div>
            ) : (
              <div>

                You have used <span className="text-green-500">{quota!.used}</span> AI requests out of <span className="text-green-500">{quota!.limit}</span>. This resets everyday.

              </div>
            )
          }
        </div>

        {/* ADD NEW RECIPE BUTTON */}
        <button
          className={`btn ml-auto common_btn ${!canCreateRecipe ? "btn-disabled" : ""
            }`}
          onClick={handleCreateRecipe}
        >
          {isCreatingRecipe && <span className="loading loading-spinner loading-md"></span>}
          Create recipe
        </button>
      </div>

      <label className="modal-backdrop" htmlFor={RECIPE_ACTION_MODAL_IDS.GENERATE_WITH_AI}>Close</label>

    </div>
  )
}

export default GenerateRecipeWithAIModal