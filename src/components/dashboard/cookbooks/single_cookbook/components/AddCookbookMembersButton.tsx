import { COOKBOOK_MODAL_IDS } from "@/utils/constants"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddCookbookMembersModal from "./modals/AddCookbookMembersModal";
import { ICookbook } from "@/types";
import { FC } from "react";

type IProps = {
    cookbook: ICookbook;
}

const AddCookbookMembersButton: FC<IProps> = ({
    cookbook
}) => {

    return (
        <>

            <label
                className='btn gap-2 btn-neutral'
                htmlFor={COOKBOOK_MODAL_IDS.ADD_MEMBERS}
            >
                <PersonAddAltIcon />
                Add Members
            </label>

            <AddCookbookMembersModal 
                cookbook={cookbook}
            />
        </>
    )
}

export default AddCookbookMembersButton