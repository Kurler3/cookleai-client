import useGetRecipe from "@/hooks/recipes/useGetRecipe.hook";
import { useParams } from "react-router-dom";
import EditRecipeSection from "./edit/EditRecipeSection";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants";
import EditRecipeImageModal from "./edit/modal/EditRecipeImageModal";
import { useEffect, useState } from "react";
import getEditRecipeInitialState from "@/utils/functions/recipe/getEditRecipeInitialState";

const DetailedRecipeEditPage = () => {

    const { recipeId } = useParams();

    const { isLoadingRecipe, recipe } = useGetRecipe(recipeId);

    // STATE FOR FORM
    const [
        editRecipeState,
        setEditRecipeState,
    ] = useState(getEditRecipeInitialState(recipe));

    console.log(recipe?.title, editRecipeState.title)
    
    ////////////////////////////////////////////////////////
    // AS SOON AS RECIPE CHANGES => UPDATE EDIT STATE //////
    ////////////////////////////////////////////////////////

    useEffect(() => {
        if(recipe) {
            setEditRecipeState(recipe);
        }
    }, [])
 

    ///////////////////////////////////
    // RETURN /////////////////////////
    ///////////////////////////////////

    if (isLoadingRecipe) {
        //TODO
        return <div>Loading...</div>;
    }

    if (!recipe) return null;

    

    return (
        <div className="flex justify-start items-start flex-col gap-4 h-full w-full">
            {/* TITLE */}
            <h3 className="font-medium text-white text-2xl">Edit Recipe</h3>

            {/* GENERAL */}

            <EditRecipeSection
                title="General"
                labelText="Only the title is required. You can edit the recipe at
                        any time."
                sectionInputs={[
                    {
                        title: 'Title',
                        inputElement: () => (
                            <input
                                type="text"
                                className="input flex-1 p-2 bg-base-300 focus:outline-app-green h-10"
                                placeholder="Give your recipe a name..."
                                value={recipe.title}
                            />
                        )
                    },
                    {   
                        title: 'Image',
                        inputElement: () => (
                            <label
                                htmlFor={RECIPE_ACTION_MODAL_IDS.EDIT_IMAGE}
                                className="btn"
                            >
                                <CameraAltIcon />
                                Edit Image
                            </label>
                        )
                    }
                ]}
            />

            {/* CONTENT */}
            <EditRecipeSection
                title="Content"
                labelText="Only the title is required. You can edit the recipe at
                        any time."
                sectionInputs={[
                   {
                    title: 'Servings',
                    titleTooltipText: 'Use numbers, such as 3. You can also enter a range, such as 3-5.',
                    inputElement: () => (
                        <input 
                            type="text"
                            className="input flex-1 p-2 bg-base-300 focus:outline-app-green h-10"
                            placeholder="Servings"
                            value={recipe.servings}
                        />
                    )
                   },

                ]}
                // SERVINGS - Normal string input
                // INGREDIENTS - Add and delete ingredients, each one has name, quantity and unit.
                // INSTRUCTIONS - Array of strings that can be dragged and dropped to change order.
                // NOTES - area
                // PREPARATION TIME - number input (mins)
                // COOKTIME - number input (mins)
                 
            />




            {/* //TODO: NUTRIENTS */}

            {/* EXTRA */}

            {/* DELETE / SAVE BUTTONS */}

            {/* MODALS */}

            {/* EDIT RECIPE IMAGE MODAL */}
            <input
                type="checkbox"
                id={RECIPE_ACTION_MODAL_IDS.EDIT_IMAGE}
                className="modal-toggle"

            />
            <EditRecipeImageModal recipe={recipe} />
        </div>
    );
};

export default DetailedRecipeEditPage;
