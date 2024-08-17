import { IIngredient, IRecipeEditState } from "@/types";
import React from "react";
import IngredientRow from "./IngredientRow";


type IProps = {
    ingredients?: IIngredient[];
    onChangeEditRecipeState: (
        updateStateObj: Partial<IRecipeEditState>
    ) => void;
}

const EditRecipeIngredients: React.FC<IProps> = ({
    ingredients=[],
    onChangeEditRecipeState,
}) => {

    //////////////////////////////////////
    // MEMO //////////////////////////////
    //////////////////////////////////////

    
    //////////////////////////////////////
    // FUNCTIONS /////////////////////////
    //////////////////////////////////////

    const addIngredient = () => {

        const newIngredient = {
            name: undefined,
            quantity: undefined,
            unit: undefined,
        };

        onChangeEditRecipeState({
            ingredients: [
                newIngredient,
                ...ingredients,
            ]
        });
    }

    const editIngredient = (
        ingredientIndex: number,
        key: keyof IIngredient,
        value: string | number,
    ) => {


        // Change the ingredient
        const newIngredients = ingredients.map((ingredient, index) => {

            return index === ingredientIndex ? {...ingredient, [key]: value} : ingredient;
        })

        // Update state
        onChangeEditRecipeState({ ingredients: newIngredients })

    }

    //////////////////////////////////////
    // RETURN ////////////////////////////
    //////////////////////////////////////

    return (
        <div className="flex-1 flex justify-start items-start flex-col gap-4">

            {/* ADD INGREDIENT BUTTON */}
            <button 
                className="btn common_btn"
                onClick={addIngredient}
            >
                Add ingredient
            </button>

            {/* INGREDIENTS */}
            {
                ingredients.map((ingredient, index) => {

                    return (
                        <IngredientRow
                            key={`recipe_ingredient_${index}`}
                            ingredient={ingredient}
                            editIngredient={editIngredient}
                            ingredientIndex={index}

                            //TODO: Pass func to remove ingredient
                        />
                    )

                })
            }

        </div>
    )
}

export default EditRecipeIngredients;