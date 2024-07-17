import useGetUserRecipes from "../../../hooks/recipes/useGetUserRecipes.hook";
import RecipeGrid from "./grid/RecipeGrid";
import RecipesTable from "./row/RecipesTable";

type IProps = {
    isGrid: boolean;
};

const RecipesList: React.FC<IProps> = ({ isGrid }) => {
    
    const { 
        recipes, 
        isLoadingRecipes,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useGetUserRecipes();

    return (
        <div className="flex justify-start items-start w-full flex-1 gap-4 max-h-[80%]">
            {!isGrid ? (
                <RecipesTable
                    recipes={recipes}
                    isLoadingRecipes={isLoadingRecipes}
                    isFetchingNextPage={isFetchingNextPage}
                />
            ) : (
                <RecipeGrid 
                    recipes={recipes}
                    isLoadingRecipes={isLoadingRecipes}
                    isFetchingNextPage={isFetchingNextPage}
                />
            )}

            <button onClick={() => fetchNextPage()}>Fetch more</button>
        </div>
    );
};

export default RecipesList;
