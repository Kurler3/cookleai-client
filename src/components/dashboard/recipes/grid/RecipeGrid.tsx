import { IRecipe } from "@/types";
import RecipeCard from "./RecipeCard";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

type IProps = {
    recipes?: IRecipe[];
    isLoadingRecipes: boolean;
    isFetchingNextPage: boolean;
    lastElementRef: (node: HTMLDivElement) => void;
}

const RecipeGrid: React.FC<IProps> = ({
    isLoadingRecipes,
    recipes,
    isFetchingNextPage,
    lastElementRef
}) => {

    return (
        <div className="w-full overflow-x-auto overflow-y-auto relative h-full flex justify-start items-start flex-wrap no-scrollbar">
            {
                isLoadingRecipes ? (
                    Array.from({ length: 3 }).map((_, idx) => (
                        <RecipeCardSkeleton key={`recipe_list_card_${idx}`} />
                    ))
                ) : (
                    recipes?.map((recipe, idx) => {
                        const key = `recipe_card_${idx}_${recipe.id}`;

                        return (
                            <RecipeCard 
                                key={key} 
                                recipe={recipe} 
                                lastElementRef={idx === recipes.length - 1 ? lastElementRef : undefined} 
                                />
                        );
                    })
                )
            }

            {
                isFetchingNextPage && (
                    Array.from({ length: 3 }).map((_, idx) => (
                        <RecipeCardSkeleton key={`recipe_list_card_${idx}`} />
                    ))
                )
            }
        </div>
    )
}

export default RecipeGrid;