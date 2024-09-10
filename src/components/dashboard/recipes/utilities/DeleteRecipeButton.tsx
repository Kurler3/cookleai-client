import { RECIPE_ACTION_MODAL_IDS, ROUTE_PATHS } from "@/utils/constants";
import { DeleteIcon } from "@chakra-ui/icons";
import { FC } from "react";
import DeleteRecipeModal from "../modal/DeleteRecipeModal";
import { IRecipe } from "@/types";
import { useNavigate } from "react-router-dom";


type IProps = {
    recipe?: IRecipe;
}

const DeleteRecipeButton: FC<IProps> = ({
    recipe,
}) => {

    const navigate = useNavigate();

    return (
        <>
            <label
                className="btn btn-error  hover:bg-red-500 text-white"
                htmlFor={RECIPE_ACTION_MODAL_IDS.DELETE}
            >
                <DeleteIcon style={{ height: "20px" }} />
                Delete
            </label>

            <input
                type="checkbox"
                id={RECIPE_ACTION_MODAL_IDS.DELETE}
                className="modal-toggle"
            />
            <DeleteRecipeModal
                key={`recipe_delete_modal_${recipe?.id}`}
                recipe={recipe}
                onSuccessCallback={() => {
                    navigate(ROUTE_PATHS.RECIPES);
                }}
            />

        </>
    )

}

export default DeleteRecipeButton;