import useGetRecipe from "@/hooks/recipes/useGetRecipe.hook";
import { useParams } from "react-router-dom";
import { RECIPE_ROLES } from "../../../utils/constants/recipes.constants";


const DetailedRecipeEditPage = () => {
    const { recipeId } = useParams();

    const { isLoadingRecipe, errorWhileGettingRecipe, recipe } =
        useGetRecipe(recipeId);

    return (

        <div className="flex justify-start items-start flex-col gap-4">

            {/* TITLE */}
            <h3 className="font-medium text-white text-2xl">
              Edit Recipe
            </h3>

            {/* GENERAL */}
            <div className="bg-base-100 flex justify-start items-start flex-col p-4">

                <h3 className="text-white font-medium text-lg">General</h3>

                <p className="text-base-content text-sm">
                  Only the title is required. You can edit the recipe at any time.
                </p>

            </div>


            {/* CONTENT */}


            {/* NUTRIENTS */}


            {/* EXTRA */}


            {/* DELETE / SAVE BUTTONS */}

        </div>


    );
};

export default DetailedRecipeEditPage;
