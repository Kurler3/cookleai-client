import { FC, useState } from "react";
import { COOKBOOK_MODAL_IDS, ROUTE_PATHS } from "@/utils/constants"
import { ICookbook } from "@/types";
import useLeaveCookbook from "@/hooks/cookbook/useLeaveCookbook";
import { useNavigate } from "react-router-dom";

type IProps = {
    cookbook: ICookbook;
}

const LeaveCookbookModal: FC<IProps> = ({
    cookbook,
}) => {

    const navigate = useNavigate();

    const {
        leaveCookbook,
        isLeavingCookbook,
    } = useLeaveCookbook({
        onSuccessFn: () => {
            navigate(ROUTE_PATHS.COOKBOOKS);
        }
    })

    const [confirmationText, setConfirmationText] = useState("");

    const canLeave = confirmationText === "leave";

    const handleLeave = () => {
        if(isLeavingCookbook) return;

        leaveCookbook({
            cookbookId: cookbook.id,
        });
    }

    return (
        <>

            <input
                type="checkbox"
                id={COOKBOOK_MODAL_IDS.LEAVE}
                className="modal-toggle"
            />

            <div className="modal" role="dialog">

                <div className="modal-box border border-red-600 flex flex-col gap-2">

                    {/* CHANGE TITLE */}
                    <h1 className="text-lg font-bold text-white">Leave cookbook</h1>

                    <p>
                        Confirm that you want to leave this cookbook by typing
                        <span className="font-bold"> "leave"</span>
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
                            className={`btn ${canLeave ? 'btn-error' : 'btn-disabled'}`}
                            disabled={!canLeave}
                            onClick={handleLeave}
                        >
                            {isLeavingCookbook && <span className="loading loading-spinner"></span>}
                            Leave
                        </button>
                    </div>
                </div>

                <label className="modal-backdrop" htmlFor={COOKBOOK_MODAL_IDS.LEAVE}>Close</label>

            </div>


        </>
    )
}

export default LeaveCookbookModal;