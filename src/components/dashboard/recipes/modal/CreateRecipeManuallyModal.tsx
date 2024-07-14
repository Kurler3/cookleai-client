import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants"


const CreateRecipeManuallyModal = () => {
  return (
    <div className="modal" role='dialog'>

      <div className="modal-box flex items-center flex-col">
          
          <h3 className="text-lg font-medium text-white">
            Create a new recipe manually
          </h3>

          <p>
            First, let's give your new recipe a title!
          </p>

          {/* INPUT */}
          <input
            type='text'
            className='input max-w-sm'
            placeholder='Enter the title for your new recipe'
          />


          {/* ADD NEW RECIPE BUTTON */}

      </div>

      <label className="modal-backdrop" htmlFor={RECIPE_ACTION_MODAL_IDS.CREATE_MANUALLY}>Close</label>

    </div>
  )
}

export default CreateRecipeManuallyModal