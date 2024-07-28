import useGetRecipe from "@/hooks/recipes/useGetRecipe.hook";
import { useParams } from "react-router-dom";
import EditRecipeSection from "./edit/EditRecipeSection";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants";
import EditRecipeImageModal from "./edit/modal/EditRecipeImageModal";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import getEditRecipeInitialState from "@/utils/functions/recipe/getEditRecipeInitialState";
import { IRecipeEditState } from "@/types";
import EditRecipeIngredients from "./edit/inputs/EditRecipeIngredients";

const DetailedRecipeEditPage = () => {

    const { recipeId } = useParams();

    const { isLoadingRecipe, recipe } = useGetRecipe(recipeId);

    // STATE FOR FORM
    const [
        editRecipeState,
        setEditRecipeState,
    ] = useState(getEditRecipeInitialState(recipe));

    ////////////////////////////////////////////////////////
    // ON CHANGE EDIT RECIPE STATE /////////////////////////
    ////////////////////////////////////////////////////////

    const onChangeEditRecipeState = useCallback((
        updateStateObj: Partial<IRecipeEditState>   
    ) => {  
        setEditRecipeState((prevEditRecipeState) => {
            return {
                ...prevEditRecipeState,
                ...updateStateObj,
            }
        });
    }, [])

    //TODO Handle on change of inputs
    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>
    ) => {

        const {
            name,
            value,
        } = event.target;

        onChangeEditRecipeState({ [name]: value });

    }, [onChangeEditRecipeState])  

    ////////////////////////////////////////////////////////
    // AS SOON AS RECIPE CHANGES => UPDATE EDIT STATE //////
    ////////////////////////////////////////////////////////

    useEffect(() => {
        if (recipe) {
            onChangeEditRecipeState(getEditRecipeInitialState(recipe));
        }
    }, [recipe])


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
                        inputElement: (
                            <input
                                type="text"
                                className="input flex-1 p-2 bg-base-300 focus:outline-app-green h-10"
                                placeholder="Give your recipe a name..."
                                value={editRecipeState.title}
                                onChange={handleOnChange}
                                name='title'
                            />
                        )
                    },
                    {
                        title: 'Image',
                        inputElement: (
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

                    //Servings
                    {
                        title: 'Servings',
                        titleTooltipText: 'Use numbers, such as 3. You can also enter a range, such as 3-5.',
                        inputElement: (
                            <input
                                type="text"
                                className="input flex-1 p-2 bg-base-300 focus:outline-app-green h-10"
                                placeholder="Servings"
                                value={editRecipeState.servings}
                                onChange={handleOnChange}
                                name='servings'
                            />
                        )
                    },
                    // INGREDIENTS - Add and delete ingredients, each one has name, quantity and unit.
                    {
                        title: 'Ingredients',
                        titleTooltipText: 'Add, remove and edit any ingredients for this recipe',
                        inputElement: (
                            <EditRecipeIngredients 
                                ingredients={editRecipeState.ingredients}
                                onChangeEditRecipeState={onChangeEditRecipeState}
                            />
                        )
                    }

                    // INSTRUCTIONS - Array of strings that can be dragged and dropped to change order.

                    // NOTES - area

                    // PREPARATION TIME - number input (mins)

                    // COOKTIME - number input (mins)

                ]}
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
