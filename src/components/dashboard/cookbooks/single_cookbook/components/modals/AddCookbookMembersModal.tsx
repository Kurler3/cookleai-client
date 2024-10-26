import { COOKBOOK_MODAL_IDS } from "@/utils/constants"

const AddCookbookMembersModal = () => {
    return (
        <div className="modal" role="dialog">

            {/* ACTUAL MODAL CONTENT */}
            <div className="modal-box flex flex-col gap-4 h-fit">

            

            </div>

            <label
                className="modal-backdrop"
                htmlFor={COOKBOOK_MODAL_IDS.ADD_MEMBERS}
            >
                Close
            </label>

        </div>
    )
}

export default AddCookbookMembersModal