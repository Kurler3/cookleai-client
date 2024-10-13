import { useMutation } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import axiosNetworkErrorHandler from "../../utils/functions/axiosNetworkErrorHandler";
import { ICookbook } from "../../types";
import toast from "react-hot-toast";
import useGetCookbook from "./useGetCookbook";


type IUpdateCookbookInput = {
    newTitle: string;
}

type IUseUpdateCookbookArgs = {
    cookbookId: number;
    onSuccessFn?: () => void;
}

const useUpdateCookbook = ({
    cookbookId,
    onSuccessFn,
}: IUseUpdateCookbookArgs) => {
 
    const axios = useAxios();

    const {
        handleEditCookbook
    } = useGetCookbook(cookbookId.toString());

    const {
        mutate: updateCookbook,
        isPending: isUpdatingCookbook,
    } = useMutation({
        mutationKey: ["edit.cookbook", cookbookId],
        mutationFn: async ({
            newTitle
        }: IUpdateCookbookInput) => {
            const { data } = await axios.patch(`/cookbooks/${cookbookId}`, {
                title: newTitle,
            });

            return data;
        },
        onSuccess: (
            updatedCookbook: ICookbook
        ) => {

            // Update cache.
            handleEditCookbook(updatedCookbook);

            // Call optional onSuccess func.
            onSuccessFn?.();

            toast.success('Cookbook title edited successfully!')
        },
        onError: axiosNetworkErrorHandler('An error as occurred while editing the title of this cookbook'),

    })

    return {
        updateCookbook,
        isUpdatingCookbook,
    }

}

export default useUpdateCookbook;