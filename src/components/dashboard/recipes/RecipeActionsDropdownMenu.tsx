import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import { IRecipe } from "../../../types";
import AddToCookbookModal from "./modal/AddToCookbookModal";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants";
import DeleteRecipeModal from "./modal/DeleteRecipeModal";
import { ROUTE_PATHS } from "@/utils/constants";
import { Link } from "react-router-dom";

type IProps = {
    recipe: IRecipe;
};

const RecipeActionsDropdownMenu: React.FC<IProps> = ({ recipe }) => {
    //////////////////////////////////
    // GET COOKBOOKS /////////////////
    //////////////////////////////////

    //////////////////////////////////
    // FUNCTIONS /////////////////////
    //////////////////////////////////

    //////////////////////////////////
    // RENDER ////////////////////////
    //////////////////////////////////

    return (
        <>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow gap-2 p-4 font-medium text-white"
            >
                {/* TITLE */}
                <li className="font-bold">Actions</li>

                {/* ADD TO COOKBOOK */}
                <label
                    htmlFor={RECIPE_ACTION_MODAL_IDS.ADD_TO_ADD_COOKBOOK}
                    className="menuActionClass"
                >
                    <AddIcon style={{ height: "20px" }} />
                    Add to cookbook
                </label>

                {/* EDIT */}
                <Link to={`${ROUTE_PATHS.RECIPES}/${recipe.id}/edit`} className="menuActionClass">
                    <EditIcon style={{ height: "20px" }} />
                    Edit
                </Link>

                {/* SHARE */}
                <div className="menuActionClass">
                    <ShareIcon style={{ height: "20px" }} />
                    Share
                </div>

                <div className="divider h-2 my-1"></div>

                {/* DELETE */}
                <label
                    className="menuActionClass text-red-600 hover:bg-red-500 hover:text-white"
                    htmlFor={RECIPE_ACTION_MODAL_IDS.DELETE}
                >
                    <DeleteIcon style={{ height: "20px" }} />
                    Delete
                </label>
            </ul>

            {/* ADD TO COOKBOOK MODAL */}
            <input
                type="checkbox"
                id={RECIPE_ACTION_MODAL_IDS.ADD_TO_ADD_COOKBOOK}
                className="modal-toggle"
            />

            <AddToCookbookModal recipe={recipe} />

            {/* DELETE RECIPE MODAL */}
            <input
                type="checkbox"
                id={RECIPE_ACTION_MODAL_IDS.DELETE}
                className="modal-toggle"
            />
            <DeleteRecipeModal recipe={recipe} />
        </>
    );
};

export default RecipeActionsDropdownMenu;
