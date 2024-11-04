import { COOKBOOK_MODAL_IDS } from "@/utils/constants"
import { COOKBOOK_ROLES, ICookbook, ICookbookMember, IUser } from "@/types";
import { FC, useMemo, useState } from "react";
import SearchUsers from "../../../../../utils/SearchUsers";
import UserItem from "../../../../../utils/UserItem";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useGetUser } from "../../../../../../hooks/user";

type IProps = {
    cookbook: ICookbook;
}

const AddCookbookMembersModal: FC<IProps> = ({
    cookbook,
}) => {

    //////////////////////////////////////
    // STATE /////////////////////////////
    //////////////////////////////////////

    const {
        user,
    } = useGetUser(); 

    // State to track the members.
    const [members, setMembers] = useState<ICookbookMember[]>([]);

    //////////////////////////////////////
    // MEMO //////////////////////////////
    //////////////////////////////////////

    const alreadyAddedUserIds = useMemo(() => {

        const added = members.map((member) => member.user.id);

        if(user) {
            added.push(user.id);
        }

        return added;
    }, [members, user])

    //////////////////////////////////////
    // HOOKS /////////////////////////////
    //////////////////////////////////////

    // Hook to add users to cookbook.

    //////////////////////////////////////
    // FUNCTIONS /////////////////////////
    //////////////////////////////////////

    // Function to add users.
    const onAddUsers = (user: IUser) => {

        setMembers((prevMembers) => {

            const isAlreadyAdded = prevMembers.some(member => member.user.id === user.id);

            if (isAlreadyAdded) return prevMembers;

            return [
                {
                    role: COOKBOOK_ROLES.VIEWER,
                    user,
                },
                ...prevMembers
            ]

        });

    }

    // Remove user.
    const onRemoveUser = (user: IUser) => {
        console.log('REMOVED')
        //TODO

    }

    //TODO Function to be called when saving changes.
    //TODO If already loading => skip
    //TODO If theres no changes => return false.
    //TODO Reset the state to empty.

    //TODO Function to update a member.


    //////////////////////////////////////
    // RETURN ////////////////////////////
    //////////////////////////////////////

    return (
        <>
            <input
                type="checkbox"
                id={COOKBOOK_MODAL_IDS.ADD_MEMBERS}
                className="modal-toggle"
            />

            <div className="modal" role="dialog">

                {/* ACTUAL MODAL CONTENT */}
                <div className="modal-box flex flex-col gap-4 h-[500px] overflow-y-auto justify-start items-start gap-4 w-full">

                    {/* TITLE */}
                    <div className="text-xl font-bold text-left text-white">
                        Add Members
                    </div>

                    {/* SEARCH FOR USERS */}
                    <SearchUsers
                        allAddedUserIds={alreadyAddedUserIds}
                        onAddUser={onAddUsers}
                    />

                    {/* LIST OF ADDED USERS */}
                    <div className="w-full flex flex-col justify-start items-center gap-2">
                        {members && members?.length > 0 ? (
                            <>
                                {members.map(({user, role}) => {
                                    return (
                                        <UserItem
                                            key={`chosen_user_${user.id}`}
                                            user={user}
                                            onClickUser={onRemoveUser}
                                            isAlreadySelected={true}
                                            alreadySelectedIcon={
                                                <RemoveCircleOutlineIcon className="text-red-600 text-[30px]" />
                                            }
                                            role={role}
                                            isShowRoleInput
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <>No members added yet</>
                        )}
                    </div>

                    {/* //TODO CANCEL AND SAVE BUTTONS */}


                </div>

                <label
                    className="modal-backdrop"
                    htmlFor={COOKBOOK_MODAL_IDS.ADD_MEMBERS}
                >
                    Close
                </label>

            </div>
        </>

    )
}

export default AddCookbookMembersModal