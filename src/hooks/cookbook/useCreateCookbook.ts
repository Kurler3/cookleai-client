import { useNavigate } from "react-router-dom";
import useAxios from "../axios/useAxios.hook";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ROUTE_PATHS } from "../../utils/constants";


const useCreateCookbook = () => {

    const navigate = useNavigate();
    const axios = useAxios();


    const {
        data: newCookbook,
        isPending: isCreatingCookbook,
        error: errorCreatingCookbook,
        mutate: createCookbook,
    } = useMutation({
        mutationFn: async (title: string) => {
            const response = await axios.post('/cookbooks/create', { title });
            return response.data;
        },
        onError: () => {
            // Show toast
            toast.error('Error creating cookbook. Please try again');
        },
        onSuccess: (data) => {

            toast.success('Cookbook created successfully');

            navigate(`${ROUTE_PATHS.COOKBOOKS}/${data.id}`);
        },
    });

    return {
        newCookbook,
        isCreatingCookbook,
        errorCreatingCookbook,
        createCookbook,
    }
}


export default useCreateCookbook;