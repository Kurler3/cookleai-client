import { useMutation } from "@tanstack/react-query";
import { ICookbook, ICookbookMember } from "../../types";
import useAxios from "../axios/useAxios.hook";
import toast from "react-hot-toast";
import axiosNetworkErrorHandler from "../../utils/functions/axiosNetworkErrorHandler";
import useGetCookbook from "./useGetCookbook";


type IAddMembersToCookbookInputArgs = {
    members: ICookbookMember[];
    onSuccessFn?: () => void;
}

type IUseAddMembersToCookbookArgs = {
    cookbook: ICookbook;
}

const useAddMembersToCookbook = ({
    cookbook,
}: IUseAddMembersToCookbookArgs) => {

    const {
        handleEditCookbook
    } = useGetCookbook(cookbook.id.toString());

    const axios = useAxios();

    const {
        isPending: isAddingMembersToCookbook,
        mutate: addMembersToCookbook,
    } = useMutation({
        mutationKey: ["add.members.to.cookbook"],
        mutationFn: async ({
            members,
            onSuccessFn,
        }: IAddMembersToCookbookInputArgs) => {

            const body = {
                members: members.map((member) => {
                    return {
                        userId: member.user.id,
                        role: member.role,
                    }
                }),
            }

            await axios.post(`/cookbooks/add-members/${cookbook.id}`, body);

            return {
                onSuccessFn,
                members,
            }
        },
        onSuccess: ({
            onSuccessFn,
            members,
        }) => {

            // Add members to cache?
            handleEditCookbook({
                users: [
                    ...(cookbook.users ?? []),
                    ...members,
                ]
            });

            toast.success(`Member${members.length > 1 ? 's' : ''} added to cookbook successfully!`);
            onSuccessFn?.();
        },
        onError: axiosNetworkErrorHandler(
            'An error ocurred while adding members to this cookbook'
        ),
        retry: false,
    })

    return {
        isAddingMembersToCookbook,
        addMembersToCookbook
    }
};

export default useAddMembersToCookbook;