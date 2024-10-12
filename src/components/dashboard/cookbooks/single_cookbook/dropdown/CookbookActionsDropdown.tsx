import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ICookbook } from '../../../../../types';
import { FC } from 'react';
import { COOKBOOK_ROLES } from '../../../../../utils/constants';

type IProps = {
    cookbook: ICookbook;
}

const CookbookActionsDropdown: FC<IProps> = ({
    cookbook
}) => {

    return (
        <div className='dropdown dropdown-end '>

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
                            htmlFor=""
                            className='menuActionClass p-2 hover:text-white font-bold'
                        >
                            <EditIcon style={{ height: '20px' }} />
                            Edit title
                        </label>
                    )
                }

                {/* DELETE / LEAVE */}
                <label
                    htmlFor=""
                    className='menuActionClass p-2 text-red-600 hover:bg-red-500 hover:text-white font-bold'
                >

                    <DeleteIcon style={{ height: "20px" }} />

                    {
                        cookbook.role === 'OWNER' ? 'Delete' : 'Leave'
                    }

                </label>

            </ul>

            {/* //TODO MODAL FOR EDITING THE COOKBOOK TITLE */}
            
            {/* //TODO MODAL FOR DELETING THE COOKBOOK */}

            {/* //TODO MODAL FOR LEAVING THE COOKBOOK */}

        </div>
    )
}

export default CookbookActionsDropdown