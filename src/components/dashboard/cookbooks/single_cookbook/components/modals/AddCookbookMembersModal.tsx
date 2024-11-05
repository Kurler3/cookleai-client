import { COOKBOOK_MODAL_IDS } from "@/utils/constants"
import { COOKBOOK_ROLES, ICookbook, ICookbookMember, ICookbookRole, IUser } from "@/types";
import { FC, useMemo, useState } from "react";
import SearchUsers from "../../../../../utils/SearchUsers";
import UserItem from "../../../../../utils/UserItem";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useGetUser } from "../../../../../../hooks/user";
import useAddMembersToCookbook from "../../../../../../hooks/cookbook/useAddMembersToCookbook";
import { handleCloseModal } from "../../../../../../utils/functions/closeModal";

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

    const canSave = useMemo(() => members.length, [members.length]);

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

        setMembers((prevMembers) => {

            const newMembers = [...prevMembers]

            const idx = newMembers.findIndex((member) => member.user.id === user.id);

            if (idx > -1) {
                newMembers.splice(idx, 1);
                return newMembers;
            }

            return newMembers;

        });

    }

    // Edit member.
    const editMember = (userId: number, newRole: ICookbookRole) => {
        setMembers((prevMembers) => {
            const newMembers = [...prevMembers]
            const idx = newMembers.findIndex((member) => member.user.id === userId);
            if (idx > -1) {
                newMembers[idx].role = newRole;
                return newMembers;
            }
            return newMembers;
        });
    }

    // Function to be called when saving changes.
    // If already loading => skip
    // If theres no changes => return false.
    // Reset the state to empty.
    const handleSaveChanges = () => {

        if(isAddingMembersToCookbook) return;
        if(members.length === 0) return;

        addMembersToCookbook({
            members: members,
            onSuccessFn: () => {

                // Clean state.
                setMembers(() => []);

                // Close modal.
                handleCloseModal(COOKBOOK_MODAL_IDS.ADD_MEMBERS);
            }
        });

    }
     

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
                <div className="modal-box flex flex-col gap-4 h-[500px] justify-start items-start gap-4 w-full">

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
                    <div className="w-full flex flex-col justify-start items-center gap-2 h-full overflow-y-auto">
                        {members && members?.length > 0 ? (
                            <>
                                {members.map(({ user, role }) => {

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
                                            onEditUserRole={editMember}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <>No members added yet</>
                        )}
                    </div>

                    {/* // CANCEL AND SAVE BUTTONS */}
                    <div className="w-full flex justify-center items-center gap-4 m-auto">
                        {/* CONFIRM DELETE BTN */}
                        <button
                            className={`btn btn-success ${!canSave ? "btn-disabled" : ""
                                }`}
                            onClick={handleSaveChanges}
                        >
                            {isAddingMembersToCookbook && (
                                <span className="loading loading-spinner"></span>
                            )}
                            Save Changes
                        </button>
                    </div>


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