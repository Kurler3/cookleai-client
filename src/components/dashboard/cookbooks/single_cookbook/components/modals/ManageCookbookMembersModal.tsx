import { COOKBOOK_MODAL_IDS } from "@/utils/constants"
import { ICookbook } from "@/types"
import { FC } from "react";
import useManageCookbookMembers from "@/hooks/cookbook/useManageCookbookMembers";
import { handleCloseModal } from "@/utils/functions/closeModal";
import ManageMembersModal from "../../../../../utils/ManageMembersModal";

type IProps = {
    cookbook: ICookbook;
}

const ManageCookbookMembersModal: FC<IProps> = ({
    cookbook,
}) => {

    ///////////////////////////////////
    // HOOKS //////////////////////////
    ///////////////////////////////////

    const {
        manageCookbookMembers,
        isManagingCookbookMembers,
    } = useManageCookbookMembers({
        cookbookId: cookbook.id.toString(),
        onSuccessFn: () => {
            // Close the modal.
            handleCloseModal(COOKBOOK_MODAL_IDS.MANAGE_MEMBERS)
        },
    });

    ////////////////////////////////
    // RETURN //////////////////////
    ////////////////////////////////

    return (

        <ManageMembersModal 
            modalId={COOKBOOK_MODAL_IDS.MANAGE_MEMBERS}
            members={cookbook?.users || []}
            isManagingMembers={isManagingCookbookMembers}
            manageMembersFunc={manageCookbookMembers}
        />
    )
}

export default ManageCookbookMembersModal