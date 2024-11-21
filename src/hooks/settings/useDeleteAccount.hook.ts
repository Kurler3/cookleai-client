import { useMutation } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import toast from "react-hot-toast";
import axiosNetworkErrorHandler from "../../utils/functions/axiosNetworkErrorHandler";
import { handleCloseModal } from "../../utils/functions/closeModal";
import { SETTINGS_MODAL_IDS } from "../../utils/constants/settings.constants";
import { useNavigate } from "react-router-dom";

const useDeleteAccount = () => {

    const axios = useAxios();
    const navigate = useNavigate();

    const {
        isPending: isDeletingAccount,
        mutate: deleteAccount,
    } = useMutation({
        mutationKey: ['user.delete.account'],
        mutationFn: async () => {
            await axios.delete('/users/delete-account');
        },
        onSuccess: () => {
            toast.success('Your account has been deleted');

            handleCloseModal(SETTINGS_MODAL_IDS.DELETE_ACCOUNT);

            navigate('/');
        },
        onError: axiosNetworkErrorHandler('Your account was not closed successfully. Please try again later'),
        retry: false,
    });

    return {
        isDeletingAccount,
        deleteAccount,
    };
};      

export default useDeleteAccount;