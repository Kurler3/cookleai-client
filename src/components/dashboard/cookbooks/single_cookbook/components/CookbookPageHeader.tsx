import { FC } from "react"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddIcon from '@mui/icons-material/Add';
import { ICookbook } from "@/types"
import CookbookActionsDropdown from "./CookbookActionsDropdown"
import { COOKBOOK_ROLES } from "@/utils/constants";


type IProps = {
    cookbook: ICookbook
}


const CookbookPageHeader: FC<IProps> = ({
    cookbook,
}) => {
    return (
        <div className="w-full flex flex-row justify-between items-center">

            {/* TITLE */}
            <h1 className="text-lg font-bold text-white">
                {cookbook.title}
            </h1>

            {/* ACTIONS */}
            <div className="flex flex-row gap-2">

                {/* ACTIONS DROPDOWN */}
                <CookbookActionsDropdown
                    cookbook={cookbook}
                />

                {/* INVITE */}
                <div className='dropdown'>

                    <div
                        tabIndex={0}
                        role="button"
                        className='btn gap-2 btn-neutral'
                    >
                        <PersonAddAltIcon />
                        Invite
                    </div>

                </div>

                {/* ADD RECIPES */}
                {
                    cookbook.role !== COOKBOOK_ROLES.VIEWER && (
                        <button className='common_btn gap-2'>
                            <AddIcon />
                            Add Recipes
                        </button>
                    )
                }

            </div>

        </div>
    )
}

export default CookbookPageHeader