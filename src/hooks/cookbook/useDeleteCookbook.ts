import { useMutation } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import toast from "react-hot-toast";
import axiosNetworkErrorHandler from "../../utils/functions/axiosNetworkErrorHandler";


type IUseDeleteCookbookHookArgs = {
    onSuccessFn?: () => void;
    cookbookId: string;
}

const useDeleteCookbook = ({
    onSuccessFn,
    cookbookId,
}: IUseDeleteCookbookHookArgs) => {

    const axios = useAxios();

    const {
        mutate: deleteCookbook,
        isPending: isDeletingCookbook,
    } = useMutation({
        mutationKey: ["delete.cookbook"],
        mutationFn: async () => {
            await axios.delete(`/cookbooks/${cookbookId}`)
        },
        onSuccess: () => {

            // // Update cache.
            // handleEditCookbook(updatedCookbook);

            // Call optional onSuccess func.
            onSuccessFn?.();

            toast.success('Cookbook deleted successfully!')
        },
        onError: axiosNetworkErrorHandler('An error as occurred while deleting this cookbook'),
    });

    return {
        deleteCookbook,
        isDeletingCookbook,
    }

}

export default useDeleteCookbook;