import useGetRecipe from "@/hooks/recipes/useGetRecipe.hook";
import { useParams } from "react-router-dom";
import EditRecipeSection from "./edit/EditRecipeSection";

const DetailedRecipeEditPage = () => {
    const { recipeId } = useParams();

    const { isLoadingRecipe, recipe } = useGetRecipe(recipeId);

    if (isLoadingRecipe) {
        //TODO
        return <div>Loading...</div>;
    }

    if (!recipe) return null;

    return (
        <div className="flex justify-start items-start flex-col gap-4 bg-base-300 h-full w-full">
            {/* TITLE */}
            <h3 className="font-medium text-white text-2xl">Edit Recipe</h3>

            {/* GENERAL */}

            <EditRecipeSection
                title="General"
                labelText="Only the title is required. You can edit the recipe at
                        any time."
            >
                {/* TITLE */}
                <div className="flex justify-start items-center gap-4 w-full">
                    <p className="w-[30%] font-medium text-gray-200">Title</p>
                    <input
                        type="text"
                        className="input flex-1 p-2 bg-base-300 focus:outline-app-green h-10"
                        placeholder="Give your recipe a name..."
                        value={recipe.title}
                    />
                </div>

                {/*  */}
            </EditRecipeSection>

            {/* CONTENT */}

            {/* NUTRIENTS */}

            {/* EXTRA */}

            {/* DELETE / SAVE BUTTONS */}
        </div>
    );
};

export default DetailedRecipeEditPage;
