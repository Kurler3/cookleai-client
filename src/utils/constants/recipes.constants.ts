import { IIngredientKeys } from "@/types"

// ACTION MODAL IDS
export const RECIPE_ACTION_MODAL_IDS = {
    DELETE: 'delete_recipe_modal',
    ADD_TO_ADD_COOKBOOK: 'add_recipe_to_cookbook_modal',
    CREATE: 'create_recipe_modal',
    GENERATE_WITH_AI: 'generate_recipe_with_ai_modal',
    CREATE_MANUALLY: 'create_recipe_manually_modal',
    SHARE_RECIPE: 'share_recipe_modal',
    EDIT_IMAGE: 'edit_recipe_image_modal',
    ADD_MEMBERS: 'add_members_to_recipe_modal',
    MANAGE_MEMBERS: 'manage_recipe_members_modal',
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


// CUISINE TYPES
export const CUISINE_TYPES = [
    "Italian",
    "Chinese",
    "Indian",
    "Mexican",
    "Thai",
    "Japanese",
    "French",
    "Greek",
    "Spanish",
    "Lebanese",
    "Turkish",
    "Vietnamese",
    "Korean",
    "American",
    "Caribbean",
    "Brazilian",
    "Ethiopian",
    "Moroccan",
    "German",
    "British"
];

// RECIPE DIFFICULTY
export const RECIPE_DIFFICULTY = [
    "Easy",
    "Medium",
    "Hard",
    "Michelin Star Chef"
];

export const RECIPE_CARD_DIMENSIONS = {
    HEIGHT: 240,
    WIDTH: 192,
};


export const RECIPE_ROW_DIMENSIONS = {
    HEIGHT: 112,
}