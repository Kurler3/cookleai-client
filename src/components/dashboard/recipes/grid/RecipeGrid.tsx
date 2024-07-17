import { IRecipe } from "@/types";
import RecipeCard from "./RecipeCard";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

type IProps = {
    recipes?: IRecipe[];
    isLoadingRecipes: boolean;
    isFetchingNextPage: boolean;    
}

const RecipeGrid: React.FC<IProps> = ({
    isLoadingRecipes,
    recipes,
    isFetchingNextPage,
}) => {

    return (
        <div className="w-full overflow-x-auto overflow-y-auto relative h-full flex justify-start items-start flex-wrap">
            {
                isLoadingRecipes ? (
                    Array.from({ length: 5 }).map((_, idx) => (
                        <RecipeCardSkeleton key={`recipe_list_card_${idx}`} />
                    ))
                ) : (
                    recipes?.map((recipe, idx) => {
                        const key = `recipe_card_${idx}_${recipe.id}`;
    
                        return <RecipeCard key={key} recipe={recipe} />;
                    })
                )
            }

            {
                isFetchingNextPage && (
                    Array.from({ length: 5 }).map((_, idx) => (
                        <RecipeCardSkeleton key={`recipe_list_card_${idx}`} />
                    ))
                )
            }
        </div>
    )
}

export default RecipeGrid;