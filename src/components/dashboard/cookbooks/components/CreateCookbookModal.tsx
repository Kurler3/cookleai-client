import { useState } from "react";
import { COOKBOOK_MODAL_IDS } from "../../../../utils/constants";
import useCreateCookbook from "../../../../hooks/cookbook/useCreateCookbook";



const CreateCookbookModal = () => {

    //////////////////////////////////
    // HOOKS /////////////////////////
    //////////////////////////////////

    const {
        isCreatingCookbook,
        createCookbook,
    } = useCreateCookbook();

    //////////////////////////////////
    // STATE /////////////////////////
    //////////////////////////////////

    const [cookbookTitle, setCookbookTitle] = useState("");


    //////////////////////////////////
    // RETURN ////////////////////////
    //////////////////////////////////

    return (
        <div className="modal" role='dialog'>


            <div className="modal-box flex flex-col gap-4">

                <h3 className="text-lg font-medium text-white">
                    Create a new cookbook manually
                </h3>

                {/* INPUT */}
                <input
                    type="text"
                    className="input input-bordered w-full focus:outline-app-green transition"
                    placeholder="Enter the title for your new cookbook"
                    value={cookbookTitle}
                    onChange={(e) => setCookbookTitle(e.target.value)}
                />

                {/* ADD NEW RECIPE BUTTON */}
                <button
                    className={`btn ml-auto common_btn ${cookbookTitle.length === 0 || false ? "btn-disabled" : ""
                        }`}
                    onClick={() => createCookbook(cookbookTitle)}
                >
                    {isCreatingCookbook && <span className="loading loading-spinner loading-md"></span>}
                    Create cookbook
                </button>


            </div>

            <label className="modal-backdrop" htmlFor={COOKBOOK_MODAL_IDS.CREATE}>Close</label>

        </div>
    )
};

export default CreateCookbookModal;