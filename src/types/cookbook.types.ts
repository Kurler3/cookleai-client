import { IRecipe } from "./recipe.types";
import { IUser } from "./user.types";


export type ICookbook = {
    id: number;
    title: string;
    isPrivate: boolean;
    image: string;
    users?: IUser[];
    recipes?: IRecipe[];
    createdAt: Date;
    updatedAt: Date;
    updatedBy: number;
    createdBy: number;
    updatedByUser?: IUser;
    createdByUser?: IUser;
};


export type IGetCookbooksQueryParams = {
    search?: string;
    selection?: string;
    pageSize?: number;
    excludedRecipeId?: number,
}