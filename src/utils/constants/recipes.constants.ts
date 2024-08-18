import { IIngredientKeys } from "@/types"

// ACTION MODAL IDS
export const RECIPE_ACTION_MODAL_IDS = {
    DELETE: 'delete_recipe_modal',
    ADD_TO_ADD_COOKBOOK: 'add_recipe_to_cookbook_modal',
    CREATE: 'create_recipe_modal',
    GENERATE_WITH_AI: 'generate_recipe_with_ai_modal',
    CREATE_MANUALLY: 'create_recipe_manually_modal',
    SHARE_RECIPE: 'share_recipe_modal',
    EDIT_IMAGE: 'edit_recipe_image_modal'
}

export const RECIPE_ROLES = {
    OWNER: 'OWNER',
    EDITOR: 'EDITOR',
    VIEWER: 'VIEWER'
}

export const EDIT_RECIPE_ATTRIBUTES = [
    'title', 'servings',
    'notes', 'prepTime',
    'cookTime', 'nutrients',
    'cuisine', 'language',
    'difficulty', 'ingredients',
    'instructions'
]

export const INGREDIENT_KEYS = ['name', 'quantity', 'unit'] as IIngredientKeys;