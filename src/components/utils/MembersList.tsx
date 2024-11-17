import { FC } from "react";
import { ICookbookMember, IRecipeMember, IUser } from "../../types";
import ImageWithLoader from "./ImageWithLoader";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';


type IProps = {
    modalId: string;
    isRecipe: boolean;
    currentUser?: IUser;
    members: ICookbookMember[] | IRecipeMember[];
};

const MembersList: FC<IProps> = ({
    modalId,
    isRecipe,
    currentUser,
    members,
}) => {
    
    const self = members.find(({user}) => user.id === currentUser?.id);

    return (
        <div className='flex flex-row gap-2 justify-start items-center w-full'>
            {
                self ? members!.map(({ role, user }, index) => {
                    return (
                        <div
                            className="tooltip tooltip-right" 
                            data-tip={`
                                ${user.firstName}${currentUser?.id === user.id ? ' (you)' : ''} is a ${role.toLowerCase()} in this ${isRecipe ? 'recipe' : 'cookbook'}
                            `}
                            key={`user_${user.id}_${index}`}
                        >
                            <label htmlFor={self?.role === 'OWNER' ? modalId : ''} >
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
                                        role === 'OWNER' ? (
                                            <AdminPanelSettingsIcon
                                                className="absolute bottom-[-10px] right-[-10px] z-2 text-red-600 rounded bg-neutral"
                                            />
                                        ) :
                                            role === 'EDITOR' ? (
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
                    
                }) : null
            }

        </div>
    )
}

export default MembersList;