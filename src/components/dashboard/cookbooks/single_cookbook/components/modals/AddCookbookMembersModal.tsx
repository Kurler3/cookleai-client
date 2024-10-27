import { COOKBOOK_MODAL_IDS } from "@/utils/constants"
import { ICookbook } from "@/types";
import { FC } from "react";



type IProps = {
    cookbook: ICookbook;
}


const AddCookbookMembersModal: FC<IProps> = ({
    cookbook,
}) => {

    console.log(cookbook)

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