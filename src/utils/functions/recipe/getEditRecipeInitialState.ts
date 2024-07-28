import { IRecipe } from "@/types";




const getEditRecipeInitialState = (
    recipe?: IRecipe,
) => {

    return recipe ?? {
        title: undefined,
        servings: undefined,
        notes: undefined,
        preTime: undefined,
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