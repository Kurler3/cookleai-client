import { useState } from "react";
import useGetUserRecipes from "../../../hooks/recipes/useGetUserRecipes.hook";
import RecipeGrid from "./grid/RecipeGrid";
import RecipesTable from "./row/RecipesTable";
import { IRecipe } from "@/types";
import DeleteRecipeModal from "./modal/DeleteRecipeModal";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants";
import AddToCookbookModal from "./modal/AddToCookbookModal";

type IProps = {
    isGrid: boolean;
};

const RecipesList: React.FC<IProps> = ({ isGrid }) => {
    const { recipes, isLoadingRecipes, isFetchingNextPage, lastElementRef } =
        useGetUserRecipes();

    const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | undefined>();
    console.log(selectedRecipe)
    return (
        <div className="flex justify-start items-start w-full flex-1 gap-4 max-h-[80%]">
            {!isGrid ? (
                <RecipesTable
                    recipes={recipes}
                    isLoadingRecipes={isLoadingRecipes}
                    isFetchingNextPage={isFetchingNextPage}
                    lastElementRef={lastElementRef}
                    setSelectedRecipe={setSelectedRecipe}
                />
            ) : (
                <RecipeGrid
                    recipes={recipes}
                    isLoadingRecipes={isLoadingRecipes}
                    isFetchingNextPage={isFetchingNextPage}
                    lastElementRef={lastElementRef}
                />
            )}

            {/* MODALS */}
            {selectedRecipe && (
                <>
                    {/* ADD TO COOKBOOK MODAL */}
                    <input
                        type="checkbox"
                        id={RECIPE_ACTION_MODAL_IDS.ADD_TO_ADD_COOKBOOK}
                        className="modal-toggle"
                    />

                    <AddToCookbookModal recipe={selectedRecipe} />

                    {/* DELETE RECIPE MODAL */}
                    <input
                        type="checkbox"
                        id={
                            RECIPE_ACTION_MODAL_IDS.DELETE
                        }
                        className="modal-toggle"
                    />
                    <DeleteRecipeModal
                        key={`recipe_delete_modal_${selectedRecipe?.id}`}
                        recipe={selectedRecipe}
                    />
                </>
            )}
        </div>
    );
};

export default RecipesList;
