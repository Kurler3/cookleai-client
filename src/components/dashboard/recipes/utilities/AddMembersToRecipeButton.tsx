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

            <label htmlFor={RECIPE_ACTION_MODAL_IDS.ADD_MEMBERS}>
                <AddIcon style={{ height: "20px" }} />
                Add Members
            </label>

            <input
                type="checkbox"
                id={RECIPE_ACTION_MODAL_IDS.ADD_MEMBERS}
                className="modal-toggle"
            />

            <AddMembersModal 
                modalId={RECIPE_ACTION_MODAL_IDS.ADD_MEMBERS}
                isLoading={false}
                confirmAddUsers={() => { }}
            />
        </>
    );


}

export default AddMembersToRecipeButton