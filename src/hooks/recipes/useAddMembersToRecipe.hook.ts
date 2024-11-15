import { useMutation } from "@tanstack/react-query"
import useAxios from "../axios/useAxios.hook";
import { IRecipeMember } from "@/types";
import axiosNetworkErrorHandler from "../../utils/functions/axiosNetworkErrorHandler";
import toast from "react-hot-toast";
import useGetRecipe from "./useGetRecipe.hook";

type IAddMembersToRecipeInput = {
    members: IRecipeMember[];
    onSuccessFn?: () => void;
};

type IUseAddMembersToRecipeHookArgs = {
    recipeId?: number;
}

const useAddMembersToRecipe = ({
    recipeId,
}: IUseAddMembersToRecipeHookArgs) => {

    const {
        handleAddMembersToRecipeCache,        
    } = useGetRecipe(recipeId?.toString());

    const axios = useAxios();

    const {
        mutate: addMembersToRecipe,
        isPending: isAddingMembersToRecipe,
    } = useMutation({
        mutationKey: ["add.members.to.recipe", recipeId],
        mutationFn: async ({
            members,
            onSuccessFn,
        }: IAddMembersToRecipeInput) => {

            if(!recipeId) throw new Error("Recipe ID is required.");

            const body = {
                members: members.map((member) => {
                    return {
                        userId: member.user.id,
                        role: member.role,
                    }
                }),
            }

            await axios.post(`/recipes/${recipeId}/add-members`, body);

            return {
                members,
                onSuccessFn,
            };
        },
        onSuccess: ({ 
            members,
            onSuccessFn,
        }) => {

            // Update cache.
            handleAddMembersToRecipeCache(members)

            // Call onSuccessFn.
            onSuccessFn?.();

            toast.success('Added members to recipe successfully!');
        },
        onError: axiosNetworkErrorHandler('Error while adding members to recipe'),
    });

    return {
        addMembersToRecipe,
        isAddingMembersToRecipe,
    };
}

export default useAddMembersToRecipe;