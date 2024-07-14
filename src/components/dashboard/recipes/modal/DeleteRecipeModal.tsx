import { IRecipe } from "../../../../types";
import { RECIPE_ACTION_MODAL_IDS } from "../../../../utils/constants/recipes.constants";

type IProps = {
    recipe: IRecipe;
}

const DeleteRecipeModal: React.FC<IProps> = () => {

    return (
        <div className="modal" role="dialog">
            <div className="modal-box flex flex-col gap-2"></div>

            <label className="modal-backdrop" htmlFor={RECIPE_ACTION_MODAL_IDS.DELETE}>Close</label>
        </div>
    )
};

export default DeleteRecipeModal;