import { FC, useCallback, useState } from "react";
import { ICookbookMember, ICookbookRole, IManageCookbookMembersFunc, IManageRecipeMembersFn, IRecipeMember, IRecipeRole } from "../../types";
import { useGetUser } from "../../hooks/user";
import UserItem from "./UserItem";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type IProps = {
    modalId: string;
    members: ICookbookMember[] | IRecipeMember[];
    isManagingMembers: boolean;
    manageMembersFunc: IManageRecipeMembersFn | IManageCookbookMembersFunc;
}

const ManageMembersModal: FC<IProps> = ({
    modalId,
    members,
    isManagingMembers,
    manageMembersFunc,
}) => {

    ///////////////////////////////////
    // HOOKS //////////////////////////
    ///////////////////////////////////

    const {
        user: currentUser,
    } = useGetUser();

    ///////////////////////////////////
    // STATE //////////////////////////
    ///////////////////////////////////

    // Stores the changes.
    const [changedMembers, setChangedMembers] = useState({
        edited: [] as { userId: number; role: ICookbookRole | IRecipeRole }[],
        deleted: [] as number[],
    });

    ///////////////////////////////////
    // CONSTANTS //////////////////////
    ///////////////////////////////////

    const canSave = changedMembers.edited.length > 0 || changedMembers.deleted.length > 0;

    ///////////////////////////////////
    // FUNCTIONS //////////////////////
    ///////////////////////////////////


    // Need to be able to update a members role.
    const handleUpdateMember = ({
        userId,
        role,
    }: {
        userId: number;
        role: ICookbookRole;
    }) => {

        // Change the edited members state.
        setChangedMembers((prev) => {

            const editedMembers = [...prev.edited];

            const idx = editedMembers.findIndex((member) => member.userId === userId);

            if (idx === -1) {
                editedMembers.push({ userId, role });
            } else {
                editedMembers[idx] = { userId, role };
            }

            return {
                ...prev,
                edited: editedMembers,
            }

        });

    }

    // Need to be able to delete a member from the cookbook.
    const handleDeleteMember = ({
        userId,
    }: {
        userId: number;
    }) => {

        setChangedMembers((prev) => {


            const newDeletedMembers = [...prev.deleted];

            const idx = newDeletedMembers.findIndex((member) => member === userId);

            if (idx === -1) {
                newDeletedMembers.push(userId);
            }

            // Check if was in the updated members array.
            const updatedIdx = prev.edited.findIndex((member) => member.userId === userId);

            const newEditMembers = [...prev.edited];

            if (updatedIdx > -1) {

                // Remove the member from the updated members array.
                newEditMembers.splice(updatedIdx, 1);
            }

            return {
                ...prev,
                deleted: newDeletedMembers,
                edited: newEditMembers,
            }

        });

    }

    // Function that restores back a deleted member.
    const handleRestoreDeletedMember = ({
        userId,
    }: {
        userId: number;
    }) => {

        setChangedMembers((prev) => {

            const newDeletedMembers = [...prev.deleted];

            const idx = newDeletedMembers.findIndex((member) => member === userId);

            if (idx > -1) {
                newDeletedMembers.splice(idx, 1);
            }

            return {
                ...prev,
                deleted: newDeletedMembers,
            }

        });

    }

    // Function that handles saving the changes.
    const handleSaveChanges = useCallback(() => {

        if(isManagingMembers || !canSave) return;

        manageMembersFunc({
            editedMembers: changedMembers.edited,
            removeMembers: changedMembers.deleted,
        })

    }, [canSave, changedMembers.deleted, changedMembers.edited, isManagingMembers, manageMembersFunc]);

    return (
        <>

            {/* TOGGLE */}
            <input
                type="checkbox"
                id={modalId}
                className="modal-toggle"
            />

            {/* modal */}
            <div className="modal" role="dialog">

                {/* ACTUAL MODAL CONTENT */}
                <div className="modal-box flex flex-col gap-4 h-[500px] justify-start items-start gap-4 w-full">

                    {/* TITLE */}
                    <div className="text-xl font-bold text-left text-white">
                        Manage Members
                    </div>

                    {/* MANAGE EXISTING LIST OF MEMBERS */}
                    <div className="w-full flex flex-col justify-start items-center gap-2 h-full overflow-y-auto">
                        {members && members?.length > 0 ? (
                            <>
                                {members.map(({ user, role }) => {

                                    const isEdited = changedMembers.edited.some(({ userId }) => userId === user.id);
                                    const isDeleted = changedMembers.deleted.some((userId) => userId === user.id);

                                    return (
                                        <UserItem
                                            key={`chosen_user_${user.id}`}
                                            user={user}
                                            onClickUser={currentUser?.id === user.id ? undefined : (user) => !isDeleted ? handleDeleteMember({ userId: user.id }) : handleRestoreDeletedMember({ userId: user.id })}
                                            isAlreadySelected={!isDeleted}
                                            alreadySelectedIcon={
                                                <RemoveCircleOutlineIcon className="text-red-600 text-[30px]" />
                                            }
                                            role={role}
                                            isShowRoleInput={!isDeleted && currentUser?.id !== user.id}
                                            onEditUserRole={(userId, role) => handleUpdateMember({ userId, role })}
                                            customClassName={`
                                                ${isEdited ? 'border border-green-600' : ''}
                                                ${isDeleted ? 'border border-red-600' : ' '}
                                            `}
                                            isUseAnimation={false}
                                            clickedDelay={0}
                                            customTooltipTxt={
                                                isEdited ? 'This user has been edited' :
                                                    isDeleted ? 'This user has been deleted' :
                                                        undefined
                                            }
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <>No members added yet</>
                        )}
                    </div>

                    {/* SAVE BUTTONS */}
                    <div className="w-full flex justify-end items-center">
                        <button
                            className={`btn ${canSave ? 'btn-success' : 'btn-disabled'}`}
                            disabled={!canSave}
                            onClick={handleSaveChanges}
                        >
                            {isManagingMembers && <span className="loading loading-spinner"></span>}
                            Save
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
    )
}

export default ManageMembersModal