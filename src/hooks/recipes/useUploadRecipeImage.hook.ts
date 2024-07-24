import { useMutation } from "react-query";
import useAxios from "../axios/useAxios.hook";
import axiosNetworkErrorHandler from "@/utils/functions/axiosNetworkErrorHandler";


type IUploadRecipeImageInput = {
    img: File;
    recipeId: number;
}


const useUploadRecipeImage = () => {

    const axios = useAxios();

    const {
        isLoading: isUploadingImage,
        error: uploadImageError,
        mutate: uploadImage,
    } = useMutation({
        mutationKey: ["uploadRecipeImage"],
        mutationFn: ({
            img,
            recipeId,
        }: IUploadRecipeImageInput) => {
            
            const formData = new FormData();
            formData.append("img", img);
            
            return axios.post(`/recipes/${recipeId}/upload-image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
        onSuccess: (data) => {
            console.log({UploadImgData: data});
        },
        onError: axiosNetworkErrorHandler(),
    });

    return {
        isUploadingImage,
        uploadImageError,
        uploadImage,
    }

};

export default useUploadRecipeImage;