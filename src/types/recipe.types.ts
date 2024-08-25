import { ICookbook } from "./cookbook.types";
import { IUser } from "./user.types";

enum IRecipeRole {
    OWNER = "OWNER",
    EDITOR = "EDITOR",
    VIEWER = "VIEWER",
}

export type INutrients = {
    calories?: number;
    carbohydrates?: number;
    protein?: number;
    fat?: number;
}

type IRecipeUser = IUser & { role: IRecipeRole };

export type IRecipe = {
    id: number;
    title: string;
    description?: string;
    isPublic: boolean;
    image?: string;
    servings?: string;
    notes?: string;
    prepTime?: number;
    cookTime?: number;
    nutrients?: INutrients;
    cuisine?: string;
    language?: string;
    difficulty?: string;
    rating?: number;
    ingredients: IIngredient[];
    instructions: string[];
    likedBy?: IUser[];
    cookbooks?: ICookbook[];
    users?: IRecipeUser[];
    role?: IRecipeRole;
    createdAt: string;
    updatedAt: string;
    updatedBy: number;
    updatedByUser?: IUser;
    createdBy: number;
    createdByUser?: IUser;
};

export type IIngredient = {
    name?: string;
    quantity?: number;
    unit?: string;
}

export type IIngredientKeys = (keyof IIngredient)[];

// type IUsersOnRecipes = {
//     recipeId: number;
//     recipe?: IRecipe;
//     userId: number;
//     user?: IUser;
//     role: string;
//     addedAt: string;
//     addedBy: number;
// }

export type IGetUserRecipesData = {
    // pageParams: unknown[];
    pages: IRecipe[][]
}

export type IUpdateRecipe = Partial<IRecipe> & {
    id: number;
}

export type IRecipeEditState = {
    title?: string;
    servings?: string;
    notes?: string;
    prepTime?: number;
    cookTime?: number;
    nutrients?: INutrients | null;
    cuisine?: string;
    language?: string;
    difficulty?: string;
    ingredients?: IIngredient[];
    instructions?: string[];
}