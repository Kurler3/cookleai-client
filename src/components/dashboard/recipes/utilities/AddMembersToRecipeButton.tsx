import { RECIPE_ACTION_MODAL_IDS } from "../../../../utils/constants";
import AddIcon from "@mui/icons-material/Add";
import AddMembersModal from "../../../utils/AddMembersModal";


const AddMembersToRecipeButton = () => {

    ///////////////////////////////
    // HOOKS //////////////////////
    ///////////////////////////////
    
    //TODO - Use hook to add members on recipes.
    


    ///////////////////////////////
    // RENDER /////////////////////
    ///////////////////////////////

    return (
        <>

            <label 
                htmlFor={RECIPE_ACTION_MODAL_IDS.ADD_MEMBERS}
                className="btn border border-gray-400 hover:border-gray-400 text-white"
            >
                <AddIcon style={{ height: "20px" }} />
                Add Members
            </label>

            <AddMembersModal 
                modalId={RECIPE_ACTION_MODAL_IDS.ADD_MEMBERS}
                isLoading={false}
                confirmAddUsers={() => { }}
            />
        </>
    );


}

export default AddMembersToRecipeButton