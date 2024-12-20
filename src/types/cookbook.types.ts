import { IRecipe } from "./recipe.types";
import { IUser } from "./user.types";


export enum COOKBOOK_ROLES {
    OWNER = 'OWNER',
    EDITOR = 'EDITOR',
    VIEWER = 'VIEWER'
}

export type ICookbookRole = keyof typeof COOKBOOK_ROLES;

export type ICookbookMember = {
    role: ICookbookRole; 
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

export type IEditCookbookMember = {
    userId: number;
    role: ICookbookRole;
}

export type IAddCookbookMembersFunc = ({
    members,
    onSuccessFn,
}: {
    members: ICookbookMember[],
    onSuccessFn?: () => void;
}) => void;

export type IManageCookbookMembersFunc = ({
    editedMembers,
    removeMembers,
}: {
    editedMembers: IEditCookbookMember[],
    removeMembers: number[],
}) => {
    editedMembers: IEditCookbookMember[];
    removeMembers: number[];
};