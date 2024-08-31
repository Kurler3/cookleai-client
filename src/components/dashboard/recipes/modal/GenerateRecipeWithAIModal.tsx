import useCreateRecipe from "@/hooks/recipes/useCreateRecipe.hook";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants"
import { useState } from "react";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const GenerateRecipeWithAIModal = () => {

  //////////////////////////////////
  // HOOKS /////////////////////////
  //////////////////////////////////

  const { isCreatingRecipe, createRecipe } = useCreateRecipe({
    withAI: true,
  });

  //////////////////////////////////
  // STATE /////////////////////////
  //////////////////////////////////

  const [recipeTitle, setRecipeTitle] = useState("");


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
        />

        {/* ADD NEW RECIPE BUTTON */}
        <button
          className={`btn ml-auto common_btn ${recipeTitle.length === 0 || isCreatingRecipe ? "btn-disabled" : ""
            }`}
          onClick={() => createRecipe(recipeTitle)}
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