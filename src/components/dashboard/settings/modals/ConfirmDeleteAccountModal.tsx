import { useState } from "react";
import { SETTINGS_MODAL_IDS } from "../../../../utils/constants/settings.constants"
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import useDeleteAccount from "../../../../hooks/settings/useDeleteAccount.hook";

const ConfirmDeleteAccountModal = () => {

    //////////////////////
    // HOOKS /////////////
    //////////////////////

    const {
        isDeletingAccount,
        deleteAccount,
    } = useDeleteAccount();

    //////////////////////
    // STATE /////////////
    //////////////////////

    const [confirmInputText, setConfirmInputText] = useState('');

    //////////////////////
    // CONST /////////////
    //////////////////////

    const canDelete = confirmInputText === "confirm" && ! isDeletingAccount;

    //////////////////////////////////////
    // FUNCTIONS /////////////////////////
    //////////////////////////////////////

    // Handle confirm delete recipe
    const handleConfirmDelete = () => {
        if (canDelete) {
            deleteAccount();
        }
    };

    //////////////////////
    // RETURN ////////////
    //////////////////////

    return (
        <div className="modal" role='dialog'>

            <div className="modal-box flex flex-col items-center gap-4 text-center border-red-600 border">
                {/* ALERT ICON */}
                <ReportProblemIcon
                    style={{ width: "45px", height: "45px", color: "yellow" }}
                />

                <p>
                    Are you sure you want to delete your account? This action
                    can't be reversed. To continue type <b>confirm</b> below
                </p>

                {/* INPUT */}
                <input
                    type="text"
                    placeholder="Type confirm"
                    className="input input-bordered w-full max-w-xs"
                    value={confirmInputText}
                    onChange={(e) => setConfirmInputText(e.target.value)}
                />

                {/* BOTTOM BUTTONS */}
                <div className="w-full flex justify-center items-center gap-4 m-auto">
                    {/* CONFIRM DELETE BTN */}
                    <button
                        className={`btn btn-error ${!canDelete ? "btn-disabled" : ""
                            }`}
                        onClick={handleConfirmDelete}
                    >
                        {isDeletingAccount && (
                            <span className="loading loading-spinner"></span>
                        )}
                        Delete
                    </button>
                </div>
            </div>

            <label className="modal-backdrop" htmlFor={SETTINGS_MODAL_IDS.DELETE_ACCOUNT}>Close</label>

        </div>
    )
}

export default ConfirmDeleteAccountModal