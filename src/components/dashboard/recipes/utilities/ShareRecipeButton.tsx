import { IRecipe } from "@/types";
import { FC } from "react";
import ShareRecipeModal from "../modal/ShareRecipeModal";
import ShareIcon from "@mui/icons-material/Share";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants";


type IProps = {
    recipe?: IRecipe;
    buttonClassName?: string
}

const ShareRecipeButton: FC<IProps> = ({
    recipe,
    buttonClassName,
}) => {

    return (
        <>
            <label
                className={buttonClassName ?? "menuActionClass"}
                htmlFor={RECIPE_ACTION_MODAL_IDS.SHARE_RECIPE}
            >
                <ShareIcon style={{ height: "20px" }} />
                Share
            </label>


            <input
                type="checkbox"
                id={RECIPE_ACTION_MODAL_IDS.SHARE_RECIPE}
                className="modal-toggle"
            />
            <ShareRecipeModal
                key={`recipe_delete_modal_${recipe?.id}`}
                recipe={recipe}
            />
        </>
    )
};

export default ShareRecipeButton;
