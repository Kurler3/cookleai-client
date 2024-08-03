import { IIngredient, IIngredientKeys, IRecipeEditState } from "@/types";
import React, { useMemo } from "react";
import IngredientRow from "./IngredientRow";
import { INGREDIENT_KEYS } from "@/utils/constants";


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

    // Map to know which ingredients need to be completed and the missing attributes.
    // Build map: key: ingredientId => attributes missing
    const incompleteIngredientsMap = useMemo(() => {

        const map = new Map<number, IIngredientKeys>();

        ingredients.forEach((ingredient, index) => {
            let incompleteKeys = [] as IIngredientKeys

            INGREDIENT_KEYS.forEach((key) => {
                if(!ingredient[key]) incompleteKeys.push(key);
            })

            if(incompleteKeys.length > 0) {
                map.set(index, incompleteKeys)
            }
        })

        return map;
    }, [ingredients.length]);

    
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

                    // Incomplete keys
                    const incompleteKeys = incompleteIngredientsMap.get(index) || [];

                    return (
                        <IngredientRow
                            key={`recipe_ingredient_${index}`}
                            ingredient={ingredient}
                            incompleteKeys={incompleteKeys}
                            editIngredient={editIngredient}
                            ingredientIndex={index}
                        />
                    )

                })
            }

        </div>
    )
}

export default EditRecipeIngredients;