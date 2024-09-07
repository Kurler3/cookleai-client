import useGetRecipe from "@/hooks/recipes/useGetRecipe.hook";
import { useNavigate, useParams } from "react-router-dom";
import EditRecipeSection from "./edit/EditRecipeSection";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { CUISINE_TYPES, RECIPE_ACTION_MODAL_IDS, RECIPE_DIFFICULTY, ROUTE_PATHS } from "@/utils/constants";
import EditRecipeImageModal from "./edit/modal/EditRecipeImageModal";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import getEditRecipeInitialState from "@/utils/functions/recipe/getEditRecipeInitialState";
import { INutrients, IRecipeEditState, IUpdateRecipe } from "@/types";
import EditRecipeIngredients from "./edit/inputs/ingredients/EditRecipeIngredients";
import EditRecipeInstructions from "./edit/inputs/instructions/EditRecipeInstructions";
import DeleteRecipeModal from "../recipes/modal/DeleteRecipeModal";
import { DeleteIcon } from "@chakra-ui/icons";
import SaveIcon from '@mui/icons-material/Save';
import useEditRecipe from "@/hooks/recipes/useEditRecipe.hook";
import _ from 'lodash'
import getObjectDifferences from "@/utils/functions/getObjectsDifferences";
import EditRecipeVisibilityInput from "../recipes/EditRecipeVisibilityInput";

const DetailedRecipeEditPage = () => {

    const navigate = useNavigate();

    const { recipeId } = useParams();

    // Use get recipe
    const { isLoadingRecipe, recipe } = useGetRecipe(recipeId);

    // Use edit recipe
    const {
        editRecipe,
        isEditingRecipe,
    } = useEditRecipe();

    // STATE FOR FORM
    const [
        editRecipeState,
        setEditRecipeState,
    ] = useState(getEditRecipeInitialState(recipe));

    ////////////////////////////////////////////////////////
    // CHECK IF THERES ANY CHANGES /////////////////////////
    ////////////////////////////////////////////////////////

    const canSave = useMemo(() => {

        // If the objects are completly the same
        if (_.isEqual(recipe, editRecipeState)) return false;

        // Check if there's any invalid ingredient.
        const editStateHasInvalidIngredient = editRecipeState.ingredients?.some(ingredient => {
            return !ingredient.name || !ingredient.quantity || !ingredient.unit;
        });

        if (editStateHasInvalidIngredient) return false;

        // Check if there's any empty instruction.
        const hasInvalidInstruction = editRecipeState.instructions?.some((instruction) => {
            return instruction.length === 0;
        })

        if (hasInvalidInstruction) return false;

        return true;

    }, [editRecipeState, recipe]);

    const changes = useMemo(() => {

        if (!recipe) return {};

        if (!canSave) return {};

        return {
            id: recipe.id,
            ...getObjectDifferences(recipe, editRecipeState),
        }

    }, [recipe, editRecipeState])

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

    // Handle on change of inputs
    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {

        const {
            name,
            value,
        } = event.target;

        onChangeEditRecipeState({ [name]: value === '' ? null : value });

    }, [onChangeEditRecipeState]);

    const handleOnChangeNutrients = (event: ChangeEvent<HTMLInputElement>) => {

        const {
            name,
            value,
        } = event.target;


        let newNutrients: INutrients | null  = { ...(editRecipeState.nutrients ?? {}) };

        if(value === "") {
            delete newNutrients[name as keyof INutrients];

            if(Object.keys(newNutrients).length === 0) newNutrients = null;

        } else {
            newNutrients[name as keyof INutrients] = parseFloat(value);
        }

        onChangeEditRecipeState({
            nutrients: newNutrients,
        });

    };

    const handleSaveChanges = useCallback(() => {

        // If can't save changes
        if(!canSave) return;

        // If is already saving => return
        if(isEditingRecipe) return;

        // Edit recipe.
        editRecipe(changes as IUpdateRecipe);

    }, [changes]);

    const handleChangeRecipeVisibility = useCallback(() => {

        if(isEditingRecipe) return;

        editRecipe({
            id: recipe?.id!,
            isPublic: !recipe?.isPublic,
        });
    }, []);

    ////////////////////////////////////////////////////////
    // AS SOON AS RECIPE CHANGES => UPDATE EDIT STATE //////
    ////////////////////////////////////////////////////////

    useEffect(() => {
        if (recipe) {
            onChangeEditRecipeState(getEditRecipeInitialState(recipe));
        }
    }, [onChangeEditRecipeState, recipe])

    ///////////////////////////////////
    // RETURN /////////////////////////
    ///////////////////////////////////

    if (isLoadingRecipe) {
        //TODO
        return <div>Loading...</div>;
    }

    if (!recipe) return null;

    return (
        <div className="flex justify-start items-start flex-col gap-4 h-full w-full overflow-auto px-2">
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
                    },

                    // INSTRUCTIONS - Array of strings that can be dragged and dropped to change order.
                    {
                        title: 'Instructions',
                        titleTooltipText: 'Manage the instructions for this recipe. You can order, add, edit and delete them.',
                        inputElement: (
                            <EditRecipeInstructions
                                instructions={editRecipeState.instructions}
                                onChangeEditRecipeState={onChangeEditRecipeState}
                            />
                        )
                    },

                    // NOTES - area
                    {
                        title: 'Notes',
                        titleTooltipText: 'Add any extra notes for this recipe',
                        inputElement: (
                            <textarea
                                className="textarea flex-1 p-2 bg-base-300 focus:outline-app-green"
                                placeholder="Add any extra notes for this recipe"
                                value={editRecipeState.notes}
                                onChange={handleOnChange}
                                name='notes'
                            />
                        )
                    },

                    // PREPARATION TIME - number input (mins)
                    {
                        title: 'Preparation Time',
                        titleTooltipText: 'Enter the preparation time in minutes',
                        inputElement: (
                            <div className="flex flex-1 justify-center items-center gap-4">
                                <input
                                    type="number"
                                    className="input flex-1 py-2 bg-base-300 focus:outline-app-green h-10"
                                    placeholder="Preparation Time"
                                    value={editRecipeState.prepTime}
                                    onChange={handleOnChange}
                                    name='preparationTime'
                                    min={1}
                                />

                                <p className="text-white">
                                    Minutes
                                </p>
                            </div>
                        )
                    },

                    // COOKTIME - number input (mins)
                    {
                        title: 'Cook Time',
                        titleTooltipText: 'Enter the cook time in minutes',
                        inputElement: (
                            <div className="flex flex-1 justify-center items-center gap-4">
                                <input
                                    type="number"
                                    className="input flex-1 py-2 bg-base-300 focus:outline-app-green h-10"
                                    placeholder="Cook Time"
                                    value={editRecipeState.cookTime}
                                    onChange={handleOnChange}
                                    name='cookTime'
                                    min={1}
                                />

                                <p className="text-white">
                                    Minutes
                                </p>
                            </div>
                        )
                    }

                ]}
            />


            {/* NUTRIENTS */}
            <EditRecipeSection
                title="Nutrients"
                labelText="Enhance the recipe with nutritional information."
                sectionInputs={[
                    // CALORIES
                    {
                        title: 'Calories',
                        titleTooltipText: 'Enter the total calories for this recipe',
                        inputElement: (
                            <div className="flex flex-1 justify-center items-center gap-4">
                                <input
                                    type="number"
                                    className="input flex-1 py-2 bg-base-300 focus:outline-app-green h-10"
                                    placeholder="Calories"
                                    value={editRecipeState.nutrients?.calories}
                                    onChange={handleOnChangeNutrients}
                                    name='calories'
                                    min={1}
                                />

                                <p className="text-white">
                                    Kcal
                                </p>
                            </div>
                        )
                    },

                    // CARBOHYDRATES
                    {
                        title: 'Carbohydrates',
                        titleTooltipText: 'Enter the total carbohydrates for this recipe',
                        inputElement: (
                            <div className="flex flex-1 justify-center items-center gap-4">
                                <input
                                    type="number"
                                    className="input flex-1 py-2 bg-base-300 focus:outline-app-green h-10"
                                    placeholder="Carbohydrates"
                                    value={editRecipeState.nutrients?.carbohydrates}
                                    onChange={handleOnChangeNutrients}
                                    name='carbohydrates'
                                    min={1}
                                />

                                <p className="text-white">
                                    g
                                </p>
                            </div>
                        )
                    },

                    // PROTEIN
                    {
                        title: 'Protein',
                        titleTooltipText: 'Enter the total protein for this recipe',
                        inputElement: (
                            <div className="flex flex-1 justify-center items-center gap-4">
                                <input
                                    type="number"
                                    className="input flex-1 py-2 bg-base-300 focus:outline-app-green h-10"
                                    placeholder="Protein"
                                    value={editRecipeState.nutrients?.protein}
                                    onChange={handleOnChangeNutrients}
                                    name='protein'
                                    min={1}
                                />

                                <p className="text-white">
                                    g
                                </p>
                            </div>
                        )
                    },

                    // FAT
                    {
                        title: 'Fat',
                        titleTooltipText: 'Enter the total fat for this recipe',
                        inputElement: (
                            <div className="flex flex-1 justify-center items-center gap-4">
                                <input
                                    type="number"
                                    className="input flex-1 py-2 bg-base-300 focus:outline-app-green h-10"
                                    placeholder="Fat"
                                    value={editRecipeState.nutrients?.fat}
                                    onChange={handleOnChangeNutrients}
                                    name='fat'
                                    min={1}
                                />

                                <p className="text-white">
                                    g
                                </p>
                            </div>
                        )
                    }

                ]}
            />

            {/* EXTRA */}
            <EditRecipeSection
                title="Extra"
                labelText="Add extra information to your recipe."
                sectionInputs={[
                    // CUISINE
                    {
                        title: 'Cuisine',
                        titleTooltipText: 'Enter the cuisine for this recipe',
                        inputElement: (
                            <select
                                className="select bg-base-300 focus:outline-app-green h-10 flex-1"
                                onChange={handleOnChange}
                                value={editRecipeState.cuisine}
                                name='cuisine'
                            >
                                <option value="" selected>Select a cuisine</option>
                                {CUISINE_TYPES.map((cuisine, index) => (
                                    <option key={index} value={cuisine}>
                                        {cuisine}
                                    </option>
                                ))}
                            </select>
                        )
                    },

                    // DIFFICULTY
                    {
                        title: 'Difficulty',
                        titleTooltipText: 'Enter the difficulty for this recipe',
                        inputElement: (
                            <select
                                className="select bg-base-300 focus:outline-app-green h-10 flex-1"
                                onChange={handleOnChange}
                                value={editRecipeState.difficulty}
                                name='difficulty'
                            >
                                <option value="" selected>Select a difficulty</option>
                                {RECIPE_DIFFICULTY.map((difficulty, index) => (
                                    <option key={index} value={difficulty}>
                                        {difficulty}
                                    </option>
                                ))}
                            </select>
                        )
                    }
                ]}
            />


            {/* // DELETE / SAVE BUTTONS */}
            <div className="w-full flex px-4 justify-between items-center">

                {/* DELETE */}
                <label
                    className="btn btn-error  hover:bg-red-500 text-white"
                    htmlFor={RECIPE_ACTION_MODAL_IDS.DELETE}
                >
                    <DeleteIcon style={{ height: "20px" }} />
                    Delete
                </label>

                {/* EDIT VISIBILITY */}
                <EditRecipeVisibilityInput 
                    isEditingRecipe={isEditingRecipe}
                    recipe={recipe}
                    handleChangeRecipeVisibility={handleChangeRecipeVisibility}
                    dropdownDirection="right"
                />

                {/* SAVE CHANGES */}
                <button
                    className={`btn btn-success text-white ${!canSave && 'btn-disabled'}`}
                    onClick={!canSave || isEditingRecipe ? () => {} : handleSaveChanges}
                >
                    {
                        isEditingRecipe ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <SaveIcon />
                        )
                    }

                    Save Changes
                </button>
            </div>

            {/* MODALS */}

            {/* EDIT RECIPE IMAGE MODAL */}
            <input
                type="checkbox"
                id={RECIPE_ACTION_MODAL_IDS.EDIT_IMAGE}
                className="modal-toggle"
            />
            
            <EditRecipeImageModal recipe={recipe} />


            {/* Delete recipe modal */}
            <input
                type="checkbox"
                id={RECIPE_ACTION_MODAL_IDS.DELETE}
                className="modal-toggle"
            />
            <DeleteRecipeModal
                key={`recipe_delete_modal_${recipe.id}`}
                recipe={recipe}
                onSuccessCallback={() => {
                    navigate(ROUTE_PATHS.RECIPES);
                }}
            />
        </div>
    );
};

export default DetailedRecipeEditPage;
