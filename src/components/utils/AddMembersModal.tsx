import { FC, useMemo, useState } from "react";
import SearchUsers from "./SearchUsers";
import { useGetUser } from "../../hooks/user";
import { COOKBOOK_ROLES, ICookbookMember, ICookbookRole, IUser } from "../../types";
import UserItem from "./UserItem";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { handleCloseModal } from "../../utils/functions/closeModal";


type IProps = {
    modalId: string;
    isLoading: boolean;
    confirmAddUsers: ({
        members,
        onSuccessFn,
    }: { members: ICookbookMember[], onSuccessFn?: () => void }) => void;
}


const AddMembersModal: FC<IProps> = ({
    modalId,
    isLoading,
    confirmAddUsers,
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

        if (user) {
            added.push(user.id);
        }

        return added;
    }, [members, user])

    const canSave = useMemo(() => members.length, [members.length]);

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

        if (isLoading || members.length === 0) return;

        confirmAddUsers({
            members: members,
            onSuccessFn: () => {

                // Clean state.
                setMembers(() => []);

                // Close modal.
                handleCloseModal(modalId);
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
                id={modalId}
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
                            {isLoading && (
                                <span className="loading loading-spinner"></span>
                            )}
                            Save Changes
                        </button>
                    </div>


                </div>

                <label
                    className="modal-backdrop"
                    htmlFor={modalId}
                >
                    Close
                </label>

            </div>
        </>

    );

}

export default AddMembersModal