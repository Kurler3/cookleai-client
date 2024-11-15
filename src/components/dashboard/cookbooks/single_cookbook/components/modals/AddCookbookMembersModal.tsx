import { COOKBOOK_MODAL_IDS } from "@/utils/constants"
import { ICookbook } from "@/types";
import { FC} from "react";
import useAddMembersToCookbook from "@/hooks/cookbook/useAddMembersToCookbook";
import AddMembersModal from "../../../../../utils/AddMembersModal";

type IProps = {
    cookbook: ICookbook;
}

const AddCookbookMembersModal: FC<IProps> = ({
    cookbook,
}) => {

    //////////////////////////////////////
    // HOOKS /////////////////////////////
    //////////////////////////////////////

    // Hook to add users to cookbook.
    const {
        isAddingMembersToCookbook,
        addMembersToCookbook,
    } = useAddMembersToCookbook({
        cookbook,
    });

    //////////////////////////////////////
    // RETURN ////////////////////////////
    //////////////////////////////////////

    return (
        <AddMembersModal
            modalId={COOKBOOK_MODAL_IDS.ADD_MEMBERS}
            isLoading={isAddingMembersToCookbook}
            confirmAddUsers={addMembersToCookbook}
        />
    )
}

export default AddCookbookMembersModal