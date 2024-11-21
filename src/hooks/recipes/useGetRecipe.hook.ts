import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import { useNavigate } from "react-router-dom";
import { RECIPE_ROLES, ROUTE_PATHS } from "@/utils/constants";
import toast from "react-hot-toast";
import { IEditRecipeMember, IRecipe, IRecipeMember } from "@/types";
import { useEffect } from "react";
import useIsInEditPage from "../common/useIsInEditPage";
import { getMinutesInMs } from "@/utils/functions";
import useHandleFetchError from "../common/useHandleFetchError";

const useGetRecipe = (recipeId?: string) => {
    
    const navigate = useNavigate();
    const axios = useAxios();

    const queryClient = useQueryClient();

    const isInEditPage = useIsInEditPage();

    const queryKey = ["recipe", recipeId];

    const {
        isLoading,
        isFetching,
        error: errorWhileGettingRecipe,
        data: recipe,
    } = useQuery({
        // Set the query key
        queryKey,

        // Set the query function
        queryFn: async (): Promise<IRecipe> => {
            const { data } = await axios.get(`/recipes/${recipeId}`);
            return data;
        },
        // Only launch request if there is a recipeId
        enabled: !!recipeId,
        retry: false,
        staleTime: getMinutesInMs(3),
        
    });

    useHandleFetchError({
        unAuthorizedMsg: "You are not authorized to view this recipe",
        errMsg: "An error occurred while getting the recipe",
        fnc: () => {
            navigate(ROUTE_PATHS.RECIPES);
        },
        error: errorWhileGettingRecipe,
    })

    // If role is viewer, and trying to edit => redirect back
    useEffect(() => {

        if(recipe?.role === RECIPE_ROLES.VIEWER && isInEditPage) {
            toast.error('You are not authorized to edit this recipe');
            navigate(ROUTE_PATHS.RECIPES);
        }

    }, [isInEditPage, navigate, recipe?.role])

    ///////////////////////////////////
    // FUNCTIONS //////////////////////
    ///////////////////////////////////

    const handleAddMembersToRecipeCache = (
        members: IRecipeMember[]
    ) => {

        queryClient.setQueryData(
            queryKey,
            (oldRecipe?: IRecipe) => {

                if(!oldRecipe) return null;

                return {
                    ...oldRecipe,
                    users: [
                        ...(oldRecipe.users ?? []),
                        ...members,
                    ],
                }
            }
        )

    }

    // Handle manage members on recipe.
    const handleManageRecipeMembers = (
        editedMembers: IEditRecipeMember[],
        removedMembers: number[]
    ) => {

        queryClient.setQueryData(
            queryKey,
            (oldRecipe: IRecipe) => {

                if(!oldRecipe) return null;

                // Get new members arr
                let members = [...(oldRecipe.users || [])];

                // If removed members => filter them out.
                // If edited, update it at the correct place.

                members = members.map((member) => {

                    if(removedMembers.includes(member.user.id)) {
                        return null;
                    }

                    const editedIdx = editedMembers.findIndex((editedMember) => editedMember.userId === member.user.id);

                    if(editedIdx > -1) {
                        return {
                            ...member,
                            role: editedMembers[editedIdx].role,
                        } 
                    }
                    
                    return member;
                    
                }).filter(Boolean) as IRecipeMember[];

                return {
                    ...oldRecipe,
                    users: members,
                };

            }
        )

    }

    ///////////////////////////////////
    // RETURN /////////////////////////
    ///////////////////////////////////

    return {
        isLoadingRecipe: isLoading || isFetching,
        errorWhileGettingRecipe,
        recipe,


        ////////////////
        // FUNCTIONS ///
        ////////////////

        handleAddMembersToRecipeCache,
        handleManageRecipeMembers,
        
    };
};

export default useGetRecipe;
