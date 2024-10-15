import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';

import { ICookbook } from '../../../../../types';
import { FC } from 'react';
import { COOKBOOK_MODAL_IDS, COOKBOOK_ROLES } from '../../../../../utils/constants';


type IProps = {
    cookbook: ICookbook;
}

const CookbookActionsDropdown: FC<IProps> = ({
    cookbook
}) => {

    return (
        <div className='dropdown dropdown-end'>

            <div
                tabIndex={0}
                role="button"
                className='btn gap-2'
            >
                <MoreVertIcon />
            </div>

            <ul
                tabIndex={0}
                className='dropdown-content menu bg-base-100 rounded-box gap-2 w-52 p-4'
            >

                {/* EDIT TITLE */}
                {
                    cookbook.role !== COOKBOOK_ROLES.VIEWER && (
                        <label
                            className="menuActionClass font-bold hover:text-white p-2"
                            htmlFor={COOKBOOK_MODAL_IDS.EDIT}
                        >
                            <EditIcon style={{ height: "20px" }} />
                            Edit title
                        </label>
                    )
                }

                {/* DELETE / LEAVE */}
                <label
                    htmlFor={cookbook.role === COOKBOOK_ROLES.OWNER ? COOKBOOK_MODAL_IDS.DELETE : COOKBOOK_MODAL_IDS.LEAVE}
                    className='menuActionClass p-2 text-red-600 hover:bg-red-500 hover:text-white font-bold'
                >

                    <DeleteIcon style={{ height: "20px" }} />

                    {
                        cookbook.role === COOKBOOK_ROLES.OWNER ? 'Delete' : 'Leave'
                    }

                </label>

            </ul>

        </div>
    )
}

export default CookbookActionsDropdown