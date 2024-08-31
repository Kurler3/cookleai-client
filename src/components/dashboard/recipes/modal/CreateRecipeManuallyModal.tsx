import useCreateRecipe from "@/hooks/recipes/useCreateRecipe.hook";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants";
import { useState } from "react";

const CreateRecipeManuallyModal = () => {
    //////////////////////////////////
    // HOOKS /////////////////////////
    //////////////////////////////////

    const { isCreatingRecipe, createRecipe } = useCreateRecipe();

    //////////////////////////////////
    // STATE /////////////////////////
    //////////////////////////////////

    const [recipeTitle, setRecipeTitle] = useState("");

    //////////////////////////////////
    // RENDER ////////////////////////
    //////////////////////////////////

    return (
        <div className="modal" role="dialog">
            <div className="modal-box flex items-start flex-col gap-4">
                <h3 className="text-lg font-medium text-white">
                    Create a new recipe manually 
                </h3>

                <p>First, let's give your new recipe a title!</p>

                {/* INPUT */}
                <input
                    type="text"
                    className="input input-bordered w-full focus:outline-app-green transition"
                    placeholder="Enter the title for your new recipe"
                    value={recipeTitle}
                    onChange={(e) => setRecipeTitle(e.target.value)}
                />

                {/* ADD NEW RECIPE BUTTON */}
                <button
                    className={`btn ml-auto common_btn ${
                        recipeTitle.length === 0 || isCreatingRecipe ? "btn-disabled" : ""
                    }`}
                    onClick={() => createRecipe(recipeTitle)}
                >
                    {isCreatingRecipe && <span className="loading loading-spinner loading-md"></span>}
                    Create recipe
                </button>
            </div>

            {!isCreatingRecipe && (
                <label
                    className="modal-backdrop"
                    htmlFor={RECIPE_ACTION_MODAL_IDS.CREATE_MANUALLY}
                >
                    Close
                </label>
            )}
        </div>
    );
};

export default CreateRecipeManuallyModal;
