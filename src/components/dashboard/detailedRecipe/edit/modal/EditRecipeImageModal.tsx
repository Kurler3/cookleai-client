import Modal from "@/components/utils/Modal";
import { IRecipe } from "@/types";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants";
import recipePlaceholderImg from "@/assets/images/recipe_placeholder.png";

type IProps = {
    recipe: IRecipe;
};

const EditRecipeImageModal: React.FC<IProps> = ({ recipe }) => {
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
                className="border bg-base-100 rounded-md border-gray-600"
            />

            {/* SELECT IMAGE BUTTON */}
            <button className="btn w-full common_btn">
                Upload Image
            </button>

            {/* SMALL DISCLAIMER */}
        </Modal>
    );
};

export default EditRecipeImageModal;
