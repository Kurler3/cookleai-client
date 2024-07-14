import useCreateRecipe from "@/hooks/recipes/useCreateRecipe.hook"
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants"
import { useState } from "react"


const CreateRecipeManuallyModal = () => {

  //////////////////////////////////
  // HOOKS /////////////////////////
  //////////////////////////////////

  const {
    // newRecipe,
    isCreatingRecipe,
    errorCreatingRecipe,
    createRecipe,
  } = useCreateRecipe();

  //////////////////////////////////
  // STATE /////////////////////////
  //////////////////////////////////

  const [
    recipeTitle,
    setRecipeTitle,
  ] = useState('')

  //////////////////////////////////
  // RENDER ////////////////////////
  //////////////////////////////////


  if(isCreatingRecipe) {
    return <div>Loading...</div>
  }

  if(errorCreatingRecipe) {
    return <div>Error: {errorCreatingRecipe.message}</div>
  }

  return (
    <div className="modal" role='dialog'>

      <div className="modal-box flex items-start flex-col gap-4">
          
          <h3 className="text-lg font-medium text-white">
            Create a new recipe manually
          </h3>

          <p>
            First, let's give your new recipe a title!
          </p>

          {/* INPUT */}
          <input
            type='text'
            className='input input-bordered w-full focus:outline-app-green transition'
            placeholder='Enter the title for your new recipe'
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
          />


          {/* ADD NEW RECIPE BUTTON */}
          <button
            className={`btn ml-auto common_btn ${recipeTitle.length > 0 ? '' : 'btn-disabled'}`}
            onClick={() => createRecipe(recipeTitle)}
          >
            Create recipe
          </button>

      </div>

      <label className="modal-backdrop" htmlFor={RECIPE_ACTION_MODAL_IDS.CREATE_MANUALLY}>Close</label>

    </div>
  )
}

export default CreateRecipeManuallyModal