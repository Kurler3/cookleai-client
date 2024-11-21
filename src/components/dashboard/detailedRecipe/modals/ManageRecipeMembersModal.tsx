import { FC } from "react";
import { IRecipe } from "../../../../types"
import ManageMembersModal from "../../../utils/ManageMembersModal";
import { RECIPE_ACTION_MODAL_IDS } from "../../../../utils/constants";
import useManageRecipeMembers from "../../../../hooks/recipes/useManageRecipeMembers";
import { handleCloseModal } from "../../../../utils/functions/closeModal";

type IProps = {
    recipe?: IRecipe;
}

const ManageRecipeMembersModal: FC<IProps> = ({
    recipe,
}) => {

    ////////////////////////////////////
    // HOOKS ///////////////////////////
    ////////////////////////////////////

    const {
        manageRecipeMembers,
        isManagingRecipeMembers,
    } = useManageRecipeMembers({
        recipeId: recipe?.id.toString(),
        onSuccessFn: () => {
            // Close the modal.
            handleCloseModal(RECIPE_ACTION_MODAL_IDS.MANAGE_MEMBERS)
        },
    });

    ////////////////////////////////
    // RETURN //////////////////////
    ////////////////////////////////

    return (
        <ManageMembersModal 
            modalId={RECIPE_ACTION_MODAL_IDS.MANAGE_MEMBERS}
            members={recipe?.users || []}
            isManagingMembers={isManagingRecipeMembers}
            manageMembersFunc={manageRecipeMembers}
        />
    )
}

export default ManageRecipeMembersModal;
