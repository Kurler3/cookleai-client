import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import axiosNetworkErrorHandler from "@/utils/functions/axiosNetworkErrorHandler";
import { IRecipe } from "@/types";
import toast from "react-hot-toast";


type IUploadRecipeImageInput = {
    img: File;
    recipe: IRecipe;
}


const useUploadRecipeImage = () => {

    const axios = useAxios();

    const queryClient = useQueryClient();

    const {
        isPending: isUploadingImage,
        error: uploadImageError,
        mutate: uploadImage,
    } = useMutation({
        mutationKey: ["uploadRecipeImage"],
        mutationFn: async ({
            img,
            recipe,
        }: IUploadRecipeImageInput) => {

            const formData = new FormData();
            formData.append("img", img);

            const uploadedImgUrl = await axios.post(`/recipes/${recipe.id}/upload-image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return {
                recipe,
                uploadedImgUrl: uploadedImgUrl.data.data
            };
        },
        onSuccess: ({
            recipe,
            uploadedImgUrl
        }) => {

            console.log({
                recipe,
                uploadedImgUrl
            })

            // Only set the new image url if it didn't have one previously
            // If it had an image before, the new url is going to be the same
            // Because the image is replaced.

            queryClient.setQueryData(
                ["recipe", recipe.id.toString()],
                (oldData: unknown) => {

                    if(!oldData) {
                        console.warn('Cache data not found for recipe: ', recipe.id);
                        return;
                    }

                    console.log('useUploadRecipeImage: ', recipe.id, oldData);

                    // const newData = { ...(oldData as IRecipe) };
                   
                    // newData.image = uploadedImgUrl;

                    // console.log('New recipe: ', newData)

                    return {
                        ...recipe,
                        image: uploadedImgUrl
                    };

                }
            )


            // Success toast
            toast.success('Image uploaded successfully!')


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