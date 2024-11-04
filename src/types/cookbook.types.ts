import { IRecipe } from "./recipe.types";
import { IUser } from "./user.types";


export enum COOKBOOK_ROLES {
    OWNER = 'OWNER',
    EDITOR = 'EDITOR',
    VIEWER = 'VIEWER'
}

export type COOKBOOK_ROLE_TYPE = keyof typeof COOKBOOK_ROLES;

export type ICookbookMember = {
    role: COOKBOOK_ROLE_TYPE; 
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
    role?: COOKBOOK_ROLE_TYPE;
};


export type IGetCookbooksQueryParams = {
    search?: string;
    selection?: string;
    pageSize?: number;
    excludedRecipeId?: number,
}