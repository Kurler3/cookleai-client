import { IRecipe, IRecipeEditState } from "@/types";


const getEditRecipeInitialState = (
    recipe?: IRecipe,
): IRecipeEditState => {

    return (recipe as IRecipeEditState) ?? {
        title: undefined,
        servings: undefined,
        notes: undefined,
        prepTime: undefined,
        cookTime: undefined,
        nutrients: {
            calories: undefined,
            carbohydrates: undefined,
            protein: undefined,
            fat: undefined,
        },
        cuisine: undefined,
        language: undefined,
        difficulty: undefined,
        ingredients: [],
        instructions: [],
    }
}

export default getEditRecipeInitialState;