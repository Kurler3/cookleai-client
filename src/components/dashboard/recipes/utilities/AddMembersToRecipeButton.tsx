import { RECIPE_ACTION_MODAL_IDS } from "../../../../utils/constants";
import AddIcon from "@mui/icons-material/Add";
import AddMembersModal from "../../../utils/AddMembersModal";
import useAddMembersToRecipe from "../../../../hooks/recipes/useAddMembersToRecipe.hook";
import { IRecipe } from "../../../../types";
import { FC } from "react";

type IProps = {
    recipe?: IRecipe;
};

const AddMembersToRecipeButton: FC<IProps> = ({
    recipe,
}) => {

    ///////////////////////////////
    // HOOKS //////////////////////
    ///////////////////////////////
    
    // Use hook to add members on recipes.
    const {
        isAddingMembersToRecipe,
        addMembersToRecipe,
    } = useAddMembersToRecipe({
        recipeId: recipe?.id,
    });
    
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
                isLoading={isAddingMembersToRecipe}
                confirmAddUsers={addMembersToRecipe}
            />
        </>
    );


}

export default AddMembersToRecipeButton