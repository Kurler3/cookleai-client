import useGetUserRecipes from "../../../hooks/recipes/useGetUserRecipes.hook";
import RecipeCard from "./grid/RecipeCard";
import RecipeCardSkeleton from "./grid/RecipeCardSkeleton";
import RecipesTable from "./row/RecipesTable";

type IProps = {
    isGrid: boolean;
};

const RecipesList: React.FC<IProps> = ({ isGrid }) => {
    const { recipes, isLoadingRecipes } = useGetUserRecipes();

    console.log(recipes)

    return (
        <div className="flex justify-start items-start w-full flex-1 gap-4 max-h-[80%]">
            {!isGrid ? (
                <RecipesTable
                    recipes={recipes}
                    isLoadingRecipes={isLoadingRecipes}
                />
            ) : isLoadingRecipes ? (
                Array.from({ length: 5 }).map((_, idx) => (
                    <RecipeCardSkeleton key={`recipe_list_card_${idx}`} />
                ))
            ) : (
                recipes?.map((recipe, idx) => {
                    const key = `recipe_card_${idx}_${recipe.id}`;

                    return <RecipeCard key={key} recipe={recipe} />;
                })
            )}
        </div>
    );
};

export default RecipesList;
