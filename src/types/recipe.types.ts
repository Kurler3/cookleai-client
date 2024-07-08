import { ICookbook } from "./cookbook.types";
import { IUser } from "./user.types";


export type IRecipe = {
    id: number;
    title: string;
    description: string;
    isPublic: boolean;
    image: string;
    ingredients: IIngredient[];
    instructions: string[];
    likedBy?: IUser[];
    cookbooks?: ICookbook[];
    users?: IUsersOnRecipes[];
    createdAt: string;
    updatedAt: string;
    updatedBy: number;
    updatedByUser?: IUser;
    createdBy: number;
    createdByUser?: IUser;
};

type IIngredient = {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    recipeId: number;
    recipe?: IRecipe;
}

type IUsersOnRecipes = {
    recipeId: number;
    recipe?: IRecipe;
    userId: number;
    user?: IUser;
    role: string;
    addedAt: string;
    addedBy: number;
}