import { useMutation } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import useGetRecipe from "./useGetRecipe.hook";
import axiosNetworkErrorHandler from "../../utils/functions/axiosNetworkErrorHandler";
import { IEditRecipeMember } from "../../types";
import toast from "react-hot-toast";


type IManageRecipeMembersInput = {
    editedMembers: IEditRecipeMember[];
    removeMembers: number[]; // Array of user ids
}

type IUseManageRecipeMembersHookArgs = {
    recipeId?: string;
    onSuccessFn?: () => void;
};


const useManageRecipeMembers = ({
    recipeId,
    onSuccessFn,
}: IUseManageRecipeMembersHookArgs={}) => {

    const axios = useAxios();

    const {
        handleManageRecipeMembers
    } = useGetRecipe(recipeId);

    const {
        mutate: manageRecipeMembers,
        isPending: isManagingRecipeMembers,
    } = useMutation({
        mutationKey: ["manage.recipe.members", recipeId],
        mutationFn: async ({
            editedMembers,
            removeMembers,
        }: IManageRecipeMembersInput) => {

            if(editedMembers.length > 0) {

                await axios.post(`/recipes/${recipeId}/edit-members`, {
                    members: editedMembers,
                });

            }

            if(removeMembers.length > 0) {

                await axios.delete(`/recipes/${recipeId}/remove-members`, {
                    data: {
                        userIds: removeMembers,
                    }
                })

            }

            return {
                editedMembers,
                removeMembers,
            };

        },
        onSuccess: ({
            editedMembers,
            removeMembers,
        }) => {

            handleManageRecipeMembers(
                editedMembers,
                removeMembers
            );

            onSuccessFn?.();

            toast.success('Cookbook members managed successfully!')

        },


        onError: axiosNetworkErrorHandler('An error as occurred while managing the members of this recipe'),
    });

    return {
        manageRecipeMembers,
        isManagingRecipeMembers,
    };

}

export default useManageRecipeMembers;