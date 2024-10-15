import { FC, useState } from "react"
import { COOKBOOK_MODAL_IDS } from "@/utils/constants"
import { ICookbook } from "@/types";
import useDeleteCookbook from "../../../../../../hooks/cookbook/useDeleteCookbook";

import { handleCloseModal } from "../../../../../../utils/functions/closeModal";


type IProps = {
  cookbook: ICookbook;
}


const DeleteCookbookModal: FC<IProps> = ({
  cookbook,
}) => {

  const {
    deleteCookbook,
    isDeletingCookbook,
  } = useDeleteCookbook({
    cookbookId: cookbook.id.toString(),
    onSuccessFn: () => {
      handleCloseModal(COOKBOOK_MODAL_IDS.DELETE);
    }
  })

  const [confirmationText, setConfirmationText] = useState("");

  const canDelete = confirmationText === "delete";

  const handleDelete = () => {

    if(isDeletingCookbook) return;

    deleteCookbook();

  }

  return (
    <>

      <input
        type="checkbox"
        id={COOKBOOK_MODAL_IDS.DELETE}
        className="modal-toggle"
      />

      <div className="modal" role="dialog">

        <div className="modal-box border border-red-600 flex flex-col gap-2">

          {/* CHANGE TITLE */}
          <h1 className="text-lg font-bold text-white">Delete cookbook</h1>

          <p>
            Confirm that you want to delete this cookbook by typing
            <span className="font-bold"> "delete"</span>
          </p>

          {/* INPUT */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Type here to confirm</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={confirmationText}
              onChange={({ target: { value } }) => setConfirmationText(value)}
            />
          </label>

          {/* SAVE BUTTON */}
          <div className="w-full flex justify-end items-center">
            <button
              className={`btn ${canDelete ? 'btn-error' : 'btn-disabled'}`}
              disabled={!canDelete}
              onClick={handleDelete}
            >
              {isDeletingCookbook && <span className="loading loading-spinner"></span>}
              Delete
            </button>
          </div>
        </div>

        <label className="modal-backdrop" htmlFor={COOKBOOK_MODAL_IDS.EDIT}>Close</label>

      </div>

    </>
  )
}

export default DeleteCookbookModal