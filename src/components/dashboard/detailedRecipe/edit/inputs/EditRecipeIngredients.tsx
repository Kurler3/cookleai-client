import { IIngredient, IRecipeEditState } from "@/types";
import React from "react";


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

    return (
        <div className="flex-1 flex justify-start items-start flex-col">

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
                        <div
                            key={`recipe_ingredient_${index}`}
                        >
                            INGREDIENT {index}
                        </div>
                    )

                })
            }

        </div>
    )
}

export default EditRecipeIngredients;