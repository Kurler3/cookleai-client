import { IRecipe } from "@/types"
import { FC } from "react";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import ShareRecipeButton from "../../recipes/utilities/ShareRecipeButton";
import DeleteRecipeButton from "../../recipes/utilities/DeleteRecipeButton";

type IProps = {
    recipe?: IRecipe;
    canEditRecipe?: boolean;
}

const RecipeDisplayPageHeader: FC<IProps> = ({
    recipe,
    canEditRecipe,
}) => {



    if (!canEditRecipe) return null;

    return (
        <div className="flex justify-center items-center gap-4 w-full">

            {/* EDIT */}
            <Link to={`/dashboard/recipes/${recipe?.id}/edit`}>
                <button className="btn text-white border border-gray-400 hover:border-gray-400">
                    <EditIcon />
                    Edit
                </button>
            </Link>

            {/* SHARE */}
            <ShareRecipeButton
                recipe={recipe}
                buttonClassName="btn border border-gray-400 hover:border-gray-400 text-white"
            />

            {/* DELETE */}
            <DeleteRecipeButton
                recipe={recipe}
            />

        </div>
    )
}

export default RecipeDisplayPageHeader