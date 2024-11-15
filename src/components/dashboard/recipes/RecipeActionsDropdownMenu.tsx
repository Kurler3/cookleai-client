import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import { IRecipe } from "../../../types";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants";
import { ROUTE_PATHS } from "@/utils/constants";
import { Link } from "react-router-dom";

type IProps = {
    recipe: IRecipe;
};

const RecipeActionsDropdownMenu: React.FC<IProps> = ({ recipe }) => {

    //////////////////////////////////
    // RENDER ////////////////////////
    //////////////////////////////////

    return (
        <ul
            tabIndex={0}
            className={`dropdown-content menu bg-base-100 rounded-box w-52 z-[1000000] shadow gap-2 p-4 font-medium text-white`}
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
            <label
                className="menuActionClass"
                htmlFor={RECIPE_ACTION_MODAL_IDS.SHARE_RECIPE}
            >
                <ShareIcon style={{ height: "20px" }} />
                Share
            </label>

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

    );
};

export default RecipeActionsDropdownMenu;