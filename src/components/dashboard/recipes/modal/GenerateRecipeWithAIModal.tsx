import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants"

//TODO
const GenerateRecipeWithAIModal = () => {
  return (
    <div className="modal" role='dialog'>

      <div className="modal-box ">
          generate with AI
      </div>

      <label className="modal-backdrop" htmlFor={RECIPE_ACTION_MODAL_IDS.GENERATE_WITH_AI}>Close</label>

    </div>
  )
}

export default GenerateRecipeWithAIModal