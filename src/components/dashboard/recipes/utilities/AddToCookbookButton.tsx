import { FC } from "react";
import { IRecipe } from "../../../../types"
import { RECIPE_ACTION_MODAL_IDS } from "../../../../utils/constants";
import AddIcon from "@mui/icons-material/Add";
import AddToCookbookModal from "../modal/AddToCookbookModal";



type IProps = {
    recipe?: IRecipe;
    buttonClassName?: string
}

const AddToCookbookButton: FC<IProps> = ({
    recipe,
    buttonClassName,
}) => {


    return (
        <>
            <label
                className={buttonClassName ?? "menuActionClass"}
                htmlFor={RECIPE_ACTION_MODAL_IDS.ADD_TO_ADD_COOKBOOK}
            >
                <AddIcon style={{ height: "20px" }} />
                Add to cookbooks
            </label>

            <input
                type="checkbox"
                id={RECIPE_ACTION_MODAL_IDS.ADD_TO_ADD_COOKBOOK}
                className="modal-toggle"
            />
            <AddToCookbookModal recipe={recipe} />
        </>
    )
}

export default AddToCookbookButton;