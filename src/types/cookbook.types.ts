import { IRecipe } from "./recipe.types";
import { IUser } from "./user.types";


enum COOKBOOK_ROLES {
    OWNER,
    EDITOR,
    VIEWER,
}

export type ICookbookMember = {
    role: COOKBOOK_ROLES; 
    user: IUser
}

export type ICookbook = {
    id: number;
    title: string;
    isPrivate: boolean;
    image: string;
    users?: ICookbookMember[];
    recipes?: { recipe: IRecipe }[];
    createdAt: Date;
    updatedAt: Date;
    updatedBy: number;
    createdBy: number;
    updatedByUser?: IUser;
    createdByUser?: IUser;
    _count?: {
        recipes: number;
    };
    role?: ICookbookRole;
};


export type IGetCookbooksQueryParams = {
    search?: string;
    selection?: string;
    pageSize?: number;
    excludedRecipeId?: number,
}

export enum ICookbookRole {
    OWNER = "OWNER",
    EDITOR = "EDITOR",
    VIEWER = "VIEWER",
}