import { useMutation } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook"
import toast from "react-hot-toast";
import axiosNetworkErrorHandler from "@/utils/functions/axiosNetworkErrorHandler";


type ILeaveCookbookInput = {
    cookbookId: number,
}

type IUseLeaveCookbookHookArgs = {
    onSuccessFn?: () => void;
}

const useLeaveCookbook = ({
    onSuccessFn,
}: IUseLeaveCookbookHookArgs) => {

    const axios = useAxios();

    const {
        mutate: leaveCookbook,
        isPending: isLeavingCookbook,
    } = useMutation({
        mutationKey: ["leave.cookbook"],
        mutationFn:  async ({
            cookbookId,
        }: ILeaveCookbookInput) => {
            await axios.post(`/cookbooks/leave/${cookbookId}`);
        },
        onSuccess: () => {
            // Call optional onSuccess func.
            onSuccessFn?.();
            toast.success('You\'ve left the cookbook successfully!')
        },
        onError: axiosNetworkErrorHandler('An error as occurred while leaving this cookbook'),
    });

    return {
        leaveCookbook,
        isLeavingCookbook,
    }

}

export default useLeaveCookbook;