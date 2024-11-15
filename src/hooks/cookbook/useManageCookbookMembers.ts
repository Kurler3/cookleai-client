import { useMutation } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import useGetCookbook from "./useGetCookbook";
import axiosNetworkErrorHandler from "../../utils/functions/axiosNetworkErrorHandler";
import { IEditCookbookMember } from "../../types";
import toast from "react-hot-toast";


type IUseManageCookbookMembersHookArgs = {
    cookbookId?: string;
    onSuccessFn?: () => void;
};

type IManageCookbookMembersInput = {
    editedMembers: IEditCookbookMember[];
    removeMembers: number[]; // Array of user ids
}

const useManageCookbookMembers = ({
    cookbookId,
    onSuccessFn,
}: IUseManageCookbookMembersHookArgs={}) => {

    const axios = useAxios();

    const {
        handleManageCookbookMembers
    } = useGetCookbook(cookbookId);

    const {
        mutate: manageCookbookMembers,
        isPending: isManagingCookbookMembers,
    } = useMutation({
        mutationKey: ["manage.cookbook.members", cookbookId],
        mutationFn: async ({
            editedMembers,
            removeMembers,
        }: IManageCookbookMembersInput) => {

            if(editedMembers.length > 0) {

                await axios.post(`/cookbooks/${cookbookId}/edit-members`, {
                    members: editedMembers,
                });

            }

            if(removeMembers.length > 0) {

                await axios.delete(`/cookbooks/${cookbookId}/remove-members`, {
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

            handleManageCookbookMembers(
                editedMembers,
                removeMembers
            );

            onSuccessFn?.();

            toast.success('Cookbook members managed successfully!')

        },
        onError: axiosNetworkErrorHandler('An error as occurred while managing the members of this cookbook'),
    })

    return {
        manageCookbookMembers,
        isManagingCookbookMembers,
    };

};

export default useManageCookbookMembers;
