import { COOKBOOK_MODAL_IDS } from "@/utils/constants"
import { ICookbook, ICookbookMember } from "@/types";
import { FC, useState } from "react";


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
    // HOOKS /////////////////////////////
    //////////////////////////////////////
    
    //TODO Hook to add users to cookbook.

    //////////////////////////////////////
    // FUNCTIONS /////////////////////////
    //////////////////////////////////////

    //TODO Function to be called when saving changes.
        //TODO If already loading => skip
        //TODO If theres no changes => return false.
        //TODO Reset the state to empty.
    

    //TODO Function to update a member.

    //TODO Function to add a member.

    console.log(cookbook)

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
                <div className="modal-box flex flex-col gap-4 h-fit">

                    {/* TITLE */}
                    <div className="text-xl font-bold text-left text-white">
                        Add Members
                    </div>

                    {/* SEARCH FOR USERS */}
                    

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