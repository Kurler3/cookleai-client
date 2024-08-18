import useGetRecipe from "@/hooks/recipes/useGetRecipe.hook";
import { useNavigate, useParams } from "react-router-dom";
import EditRecipeSection from "./edit/EditRecipeSection";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { CUISINE_TYPES, RECIPE_ACTION_MODAL_IDS, RECIPE_DIFFICULTY, ROUTE_PATHS } from "@/utils/constants";
import EditRecipeImageModal from "./edit/modal/EditRecipeImageModal";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import getEditRecipeInitialState from "@/utils/functions/recipe/getEditRecipeInitialState";
import { IRecipeEditState } from "@/types";
import EditRecipeIngredients from "./edit/inputs/ingredients/EditRecipeIngredients";
import EditRecipeInstructions from "./edit/inputs/instructions/EditRecipeInstructions";
import DeleteRecipeModal from "../recipes/modal/DeleteRecipeModal";
import { DeleteIcon } from "@chakra-ui/icons";

const DetailedRecipeEditPage = () => {

    const navigate = useNavigate();

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

        onChangeEditRecipeState({
            nutrients: {
                ...(editRecipeState.nutrients ?? {}),
                [name]: value,
            }
        });

    };

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

    console.log(editRecipeState.difficulty)

    return (
        <div className="flex justify-start items-start flex-col gap-4 h-full w-full overflow-auto px-2" >
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

            {/* //TODO EXTRA */}
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


            {/* //TODO DELETE / SAVE BUTTONS */}
            <div className="w-full flex flex-between items-center">

                {/* DELETE */}
                <label
                    className="btn btn-error  hover:bg-red-500"
                    htmlFor={RECIPE_ACTION_MODAL_IDS.DELETE}
                >
                    <DeleteIcon style={{ height: "20px" }} />
                    Delete
                </label>

                {/* SAVE CHANGES */}
                
            </div>

            {/* MODALS */}

            {/* EDIT RECIPE IMAGE MODAL */}
            <input
                type="checkbox"
                id={RECIPE_ACTION_MODAL_IDS.EDIT_IMAGE}
                className="modal-toggle"

            />

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

            <EditRecipeImageModal recipe={recipe} />
        </div>
    );
};

export default DetailedRecipeEditPage;
