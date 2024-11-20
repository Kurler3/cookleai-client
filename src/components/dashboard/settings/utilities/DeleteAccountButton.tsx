import { SETTINGS_MODAL_IDS } from "../../../../utils/constants/settings.constants"
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDeleteAccountModal from "../modals/ConfirmDeleteAccountModal";

const DeleteAccountButton = () => {
  
    return (
        <>  
            <label 
                htmlFor={SETTINGS_MODAL_IDS.DELETE_ACCOUNT}
                className="btn btn-error text-gray-100"
            >
                {/* DELETE ICON */}
                <DeleteIcon />

                {/* TEXT */}
                <p>
                    Delete your account
                </p>
            </label>

            <input 
                type="checkbox" 
                id={SETTINGS_MODAL_IDS.DELETE_ACCOUNT}
                className="modal-toggle"
            />

            <ConfirmDeleteAccountModal />
        </>
  )
}

export default DeleteAccountButton