import { useState } from "react";
import { IRecipe, IRecipeFilters } from "../../../../types";
import { RECIPE_ACTION_MODAL_IDS } from "../../../../utils/constants/recipes.constants";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import useDeleteRecipe from "@/hooks/recipes/useDeleteRecipe.hook";

type IProps = {
    recipe?: IRecipe;
    onSuccessCallback?: () => void;
    filters?: IRecipeFilters;
};

const DeleteRecipeModal: React.FC<IProps> = ({ 
    recipe, 
    onSuccessCallback, 
    filters
}) => {

    //////////////////////////////////////
    // HOOK //////////////////////////////
    //////////////////////////////////////

    const { deleteRecipe, isDeletingRecipe } =
        useDeleteRecipe({
            recipeId: recipe?.id,
            onSuccessCallback,
            filters
        });

    //////////////////////////////////////
    // STATE /////////////////////////////
    //////////////////////////////////////

    // Confirm input state
    const [confirmInputText, setConfirmInputText] = useState("");

    const canDelete = confirmInputText === "confirm" && !isDeletingRecipe;

    //////////////////////////////////////
    // FUNCTIONS /////////////////////////
    //////////////////////////////////////

    // Handle confirm delete recipe
    const handleConfirmDelete = () => {
        if (canDelete) {
            deleteRecipe();
        }
    };

    //////////////////////////////////////
    // RENDER ////////////////////////////
    //////////////////////////////////////

    return (
        <div className="modal" role="dialog">

            <div className="modal-box flex flex-col items-center gap-4 text-center border-red-600 border">
                {/* ALERT ICON */}
                <ReportProblemIcon
                    style={{ width: "45px", height: "45px", color: "yellow" }}
                />

                <p>
                    Are you sure you want to delete this recipe? This action
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
                        className={`btn btn-error ${
                            !canDelete ? "btn-disabled" : ""
                        }`}
                        onClick={handleConfirmDelete}
                    >
                        {isDeletingRecipe && (
                            <span className="loading loading-spinner"></span>
                        )}
                        Delete
                    </button>

                </div>
                
            </div>

            <label
                className="modal-backdrop"
                htmlFor={RECIPE_ACTION_MODAL_IDS.DELETE}
            >
                Close
            </label>
        </div>
    );
};

export default DeleteRecipeModal;
