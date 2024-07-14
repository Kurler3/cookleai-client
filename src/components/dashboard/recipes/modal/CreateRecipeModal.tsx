import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants";
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
                    <button className="btn hover:bg-app-green-hover hover:text-white">

                        {/* AI ICON */}
                        <AutoAwesomeIcon 
                            className="text-info"
                        />

                        {/* TEXT */}
                        Generate recipe with AI

                    </button>

                    {/* CREATE MANUALLY */}
                    <button className="btn hover:bg-app-green-hover hover:text-white">

                        {/* EDIT ICON */}
                        <EditIcon 

                        />

                        {/* TEXT */}
                        Create manually

                    </button>

            </div>
            <label className="modal-backdrop" htmlFor={RECIPE_ACTION_MODAL_IDS.CREATE}>Close</label>



            {/* GENERATE WITH AI MODAL */}
            

            {/* CREATE MANUALLY MODAL */}
        </div>  
    )
}

export default CreateRecipeModal;