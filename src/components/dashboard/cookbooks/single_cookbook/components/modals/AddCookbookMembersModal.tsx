import { COOKBOOK_MODAL_IDS } from "@/utils/constants"
import { COOKBOOK_ROLE_TYPE, COOKBOOK_ROLES, ICookbook, ICookbookMember, IUser } from "@/types";
import { FC, useMemo, useState } from "react";
import SearchUsers from "../../../../../utils/SearchUsers";


type IProps = {
    cookbook: ICookbook;
}

const AddCookbookMembersModal: FC<IProps> = ({
    cookbook,
}) => {

    //////////////////////////////////////
    // STATE /////////////////////////////
    //////////////////////////////////////

    // State to track the members.
    const [members, setMembers] = useState<ICookbookMember[]>([]);

    //////////////////////////////////////
    // MEMO //////////////////////////////
    //////////////////////////////////////

    const alreadyAddedUserIds = useMemo(() => {
        return members.map((member) => member.user.id);
    }, [members])

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
                    role: COOKBOOK_ROLES.VIEWER as COOKBOOK_ROLE_TYPE,
                    user,
                },
                ...prevMembers
            ]

        });

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
                <div className="modal-box flex flex-col gap-4 h-[500px]">

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



                    {/* CANCEL AND SAVE BUTTONS */}


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