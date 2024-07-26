import Modal from "@/components/utils/Modal";
import { IRecipe } from "@/types";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import recipePlaceholderImg from "@/assets/images/recipe_placeholder.png";
import { useRef } from "react";
import toast from "react-hot-toast";
import useUploadRecipeImage from "@/hooks/recipes/useUploadRecipeImage.hook";

type IProps = {
    recipe: IRecipe;
};

const EditRecipeImageModal: React.FC<IProps> = ({ recipe }) => {
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        uploadImage,
        isUploadingImage,
    } = useUploadRecipeImage();

    // On file change
    const handleOnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Get the picked image
        const file = event.target.files?.[0];

        if (
            file &&
            (file.type === "image/jpeg" ||
                file.type === "image/png" ||
                file.type === "image/webp")
        ) {
            // Create a file reader instance
            const reader = new FileReader();

            // When finished loading the img => store the src of it
            reader.onloadend = () => {

                uploadImage({
                    recipe,
                    img: file,
                });

            };

            // Read the file
            reader.readAsDataURL(file);

            // Not ok!
        } else {
            toast.error("Please select an image file of type jpg, png or webp");
        }
    };

    const handleClickSelectImage = () => {
        if (fileInputRef.current && !isUploadingImage) {
            fileInputRef.current.click();
        }
    };

    //TODO Handle reset image
    const handleResetImage = () => {
        // setSelectedImageSrc(undefined);
    }

    return (
        <Modal
            modalId={RECIPE_ACTION_MODAL_IDS.EDIT_IMAGE}
            extraModalBoxClasses="flex flex-col justify-start items-start gap-2 bg-base-300 max-h-screen"
        >
            {/* TITLE */}
            <div className="text-xl text-white font-bold">Edit Image</div>

            {/* SUB TITLE */}
            <div className="text-sm">
                You can upload your own image for the recipe. Supported image
                formats are JPG, PNG and WebP.
            </div>

            {/* CURRENT IMAGE */}
            <img
                src={recipe.image ?? recipePlaceholderImg}
                alt="Recipe image"
                className="border bg-base-100 rounded-md border-gray-600 h-[450px] w-full"
            />

            {/* SELECT IMAGE BUTTON */}
            <div className="flex justify-center items-center w-full gap-2">

                {/* UPLOAD IMAGE BUTTON */}
                <button
                    className={`
                        btn w-full common_btn text-white flex-1 
                        ${isUploadingImage ? "btn-disabled" : ""}
                    `}
                    onClick={handleClickSelectImage}
                >
                    {
                        isUploadingImage && (
                            <span className="loading loading-spinner"></span>
                        )
                    }
                    <UploadIcon />
                    Select Image
                </button>

                {
                    recipe.image && (
                        <button 
                            onClick={handleResetImage}
                            className="btn border border-red-500 text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white transition"
                        >
                            <DeleteOutlineIcon />
                        </button>
                    )
                }
            </div>

            <input
                ref={fileInputRef}
                type="file"
                id="editImgInput"
                className="hidden"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleOnFileChange}
                readOnly
                disabled={isUploadingImage}
            />

            {/* SMALL DISCLAIMER */}
            <div className="text-xs text-gray-400">
                By uploading an image, you agree that you have the right to
                publish the image and allow Mr. Cook to store and distribute the
                image.
            </div>
        </Modal>
    );
};

export default EditRecipeImageModal;
