import { ICookbook } from "./cookbook.types";
import { IUser } from "./user.types";

export enum RECIPE_ROLES {
    OWNER = "OWNER",
    EDITOR = "EDITOR",
    VIEWER = "VIEWER",
}

export type IRecipeRole = keyof typeof RECIPE_ROLES;

export type IRecipeMember = {
    role: IRecipeRole; 
    user: IUser
}

export type INutrients = {
    calories?: number;
    carbohydrates?: number;
    protein?: number;
    fat?: number;
}

export type IRecipe = {
    id: number;
    title: string;
    description?: string;
    isPublic: boolean;
    imageUrl?: string | null;
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
    users?: IRecipeMember[];
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

export type IRecipeFilters = {
    title: string | null;
    cuisine: string | null;
    difficulty: string | null;
}

export type IAddMembersToRecipeFn = ({
    members,
    onSuccessFn,
}: {
    members: IRecipeMember[];
    onSuccessFn?: () => void;
}) => void;

export type IEditRecipeMember = {
    userId: number;
    role: IRecipeRole;
}

export type IManageRecipeMembersFn = ({
    editedMembers,
    removeMembers,
}: {
    editedMembers: IEditRecipeMember[];
    removeMembers: number[];
}) => void;