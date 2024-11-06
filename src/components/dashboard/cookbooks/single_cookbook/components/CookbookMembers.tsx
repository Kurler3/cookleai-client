import { FC } from "react";
import { COOKBOOK_ROLES, ICookbook, IUser } from "@/types"
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ImageWithLoader from "../../../../utils/ImageWithLoader";
import { COOKBOOK_MODAL_IDS } from "../../../../../utils/constants";

type IProps = {
    cookbook: ICookbook;
    currentUser?: IUser;
};

const CookbookMembers: FC<IProps> = ({
    cookbook,
    currentUser,
}) => {

    return (
        <div className='flex flex-row gap-2 justify-start items-center w-full'>

            {
                cookbook.users!.map(({ role, user }, index) => {

                    return (
                        <div
                            className="tooltip tooltip-right" data-tip={`${user.firstName}${currentUser?.id === user.id ? ' (you)' : ''} is a ${role.toLowerCase()} in this cookbook`}
                            key={`cookbook_user_${user.id}_${index}`}
                        >
                            <label htmlFor={role === COOKBOOK_ROLES.OWNER ? COOKBOOK_MODAL_IDS.MANAGE_MEMBERS : ''} >
                                <div
                                    className="avatar cursor-pointer relative"
                                >
                                    <div className="w-10 rounded-full bg-red-500">

                                        <ImageWithLoader
                                            imageUrl={user.avatar}
                                            imgClassName=""
                                            altTxt={user.email}
                                            loader={<div className="loading loading-spinner"></div>}
                                        />

                                    </div>

                                    {
                                        role === COOKBOOK_ROLES.OWNER ? (
                                            <AdminPanelSettingsIcon
                                                className="absolute bottom-[-10px] right-[-10px] z-2 text-red-600 rounded bg-neutral"
                                            />
                                        ) :
                                            role === COOKBOOK_ROLES.EDITOR ? (
                                                <EditIcon
                                                    className="absolute bottom-[-10px] right-[-10px] z-2 text-green-600 bg-neutral rounded"
                                                />
                                            ) : (
                                                <VisibilityIcon
                                                    className="absolute bottom-[-10px] right-[-10px] z-2 text-white  rounded"
                                                />
                                            )
                                    }
                                </div>
                            </label>
                        </div>
                    );
                    
                })
            }

        </div>
    )
}

export default CookbookMembers;