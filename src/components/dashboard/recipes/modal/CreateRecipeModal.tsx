import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants";
import { handleCloseModal } from "@/utils/functions/closeModal";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EditIcon from '@mui/icons-material/Edit';

const CreateRecipeModal = () => {

    return (
        <div className="modal" role='dialog'>
            
            <div className="modal-box flex flex-col gap-2">
                    
                    <h3 className="text-white text-lg">
                        Create a new recipe
                    </h3>

                    <div>
                        You can can create a new recipe manually or using Cookle AI.
                    </div>

                    <div className="divider"></div>

                    {/* CREATE WITH AI */}
                    <label 
                        htmlFor={RECIPE_ACTION_MODAL_IDS.GENERATE_WITH_AI} 
                        className="btn hover:bg-app-green-hover hover:text-white"
                        onClick={() => handleCloseModal(RECIPE_ACTION_MODAL_IDS.CREATE)}
                    >
                        
                        {/* AI ICON */}
                        <AutoAwesomeIcon 
                            className="text-info"
                        />

                        {/* TEXT */}
                        Generate recipe with AI

                    </label>

                    {/* CREATE MANUALLY */}
                    <label 
                        htmlFor={RECIPE_ACTION_MODAL_IDS.CREATE_MANUALLY}
                        className="btn hover:bg-app-green-hover hover:text-white"
                        onClick={() => handleCloseModal(RECIPE_ACTION_MODAL_IDS.CREATE)}
                    >

                        {/* EDIT ICON */}
                        <EditIcon />

                        {/* TEXT */}
                        Create manually

                    </label>

            </div>
            <label className="modal-backdrop" htmlFor={RECIPE_ACTION_MODAL_IDS.CREATE}>Close</label>


        </div>  
    )
}

export default CreateRecipeModal;