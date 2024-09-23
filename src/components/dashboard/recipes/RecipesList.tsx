import { useState } from "react";
import useGetUserRecipes from "../../../hooks/recipes/useGetUserRecipes.hook";
import RecipeGrid from "./grid/RecipeGrid";
import RecipesTable from "./row/RecipesTable";
import { IRecipe, IRecipeFilters } from "@/types";
import DeleteRecipeModal from "./modal/DeleteRecipeModal";
import { RECIPE_ACTION_MODAL_IDS, RECIPE_CARD_DIMENSIONS, RECIPE_ROW_DIMENSIONS } from "@/utils/constants/recipes.constants";
import AddToCookbookModal from "./modal/AddToCookbookModal";
import ShareRecipeModal from "./modal/ShareRecipeModal";
import AddYourFirstRecipe from "./AddYourFirstRecipe";
import useVirtualization from "@/hooks/common/useVirtualization.hook";


type IProps = {
    isGrid: boolean;
    filters: IRecipeFilters;
};

const RecipesList: React.FC<IProps> = ({
    isGrid,
    filters,
}) => {

    const {
        recipes,
        isLoadingRecipes,
        isFetchingNextPage,
        lastElementRef,
    } = useGetUserRecipes({
        filters,
    });

    // Virtualization
    const {
        scrollParentRef,
        totalListHeight,
        virtualRows,
        virtualColumns,
        totalListWidth,
    } = useVirtualization<IRecipe>({
        itemHeight: !isGrid ? RECIPE_ROW_DIMENSIONS.HEIGHT : RECIPE_CARD_DIMENSIONS.HEIGHT,
        itemWidth: RECIPE_CARD_DIMENSIONS.WIDTH,
        items: recipes,
        isGrid,
    });

    const [
        selectedRecipe,
        setSelectedRecipe
    ] = useState<IRecipe | undefined>();

    ////////////////////////////////
    // RETURN //////////////////////
    ////////////////////////////////

    return (
        <div className="flex justify-start items-start w-full flex-1 gap-4 max-h-[80%]">
            {
                !isLoadingRecipes && recipes?.length === 0 ? (
                    <AddYourFirstRecipe />
                ) :
                    !isGrid ? (
                        <RecipesTable
                            recipes={recipes}
                            isLoadingRecipes={isLoadingRecipes}
                            isFetchingNextPage={isFetchingNextPage}
                            lastElementRef={lastElementRef}
                            setSelectedRecipe={setSelectedRecipe}
                            totalListHeight={totalListHeight}
                            virtualItems={virtualRows}
                            scrollParentRef={scrollParentRef}
                        />
                    ) : (
                        <RecipeGrid
                            recipes={recipes}
                            isLoadingRecipes={isLoadingRecipes}
                            isFetchingNextPage={isFetchingNextPage}
                            lastElementRef={lastElementRef}
                            totalListHeight={totalListHeight}
                            virtualRows={virtualRows}
                            virtualColumns={virtualColumns}
                            scrollParentRef={scrollParentRef}
                            totalListWidth={totalListWidth}
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
                        id={RECIPE_ACTION_MODAL_IDS.DELETE}
                        className="modal-toggle"
                    />
                    <DeleteRecipeModal
                        key={`recipe_delete_modal_${selectedRecipe?.id}`}
                        recipe={selectedRecipe}
                        filters={filters}
                    />

                    {/* SHARE RECIPE MODAL */}
                    <input
                        type="checkbox"
                        id={RECIPE_ACTION_MODAL_IDS.SHARE_RECIPE}
                        className="modal-toggle"
                    />

                    <ShareRecipeModal
                        recipe={selectedRecipe}
                        setSelectedRecipe={setSelectedRecipe}
                    />
                </>
            )}
        </div>
    );
};

export default RecipesList;
