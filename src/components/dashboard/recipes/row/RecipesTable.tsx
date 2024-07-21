import { IRecipe } from "../../../../types/recipe.types";
import RecipeRow from "./RecipeRow";
import RecipeRowSkeleton from "./RecipeRowSkeleton";

type IProps = {
    recipes?: IRecipe[];
    isLoadingRecipes: boolean;
    isFetchingNextPage: boolean;
    lastElementRef: (node: HTMLDivElement) => void;
    setSelectedRecipe: React.Dispatch<React.SetStateAction<IRecipe | undefined>>
};

const RecipesTable: React.FC<IProps> = ({
    recipes,
    isLoadingRecipes,
    isFetchingNextPage,
    lastElementRef,
    setSelectedRecipe,
}) => {
    
    return (
        // min-w-96
        <div className="w-full overflow-x-auto overflow-y-auto no-scrollbar relative h-full">
            {/* HEADERS */}
            <div className="bg-gray-800 z-10 sticky top-0 w-full flex justify-between min-w-[644px] items-center gap-4 px-4 overflow-x-auto overflow-y-hidden border h-12 rounded border-gray-600 text-app-white">
                {/* IMAGE */}
                <div className="w-24 text-app-white font-medium text-center">
                    Image
                </div>

                {/* TITLE */}
                <div className="text-center flex-1 font-medium text-app-white">
                    Title
                </div>

                {/* AUTHOR */}
                <div className="text-app-white flex-1  font-medium text-center">
                    Author
                </div>

                {/* VISIBILITY */}
                <div className="text-app-white font-medium text-center flex-1">
                    Visibility
                </div>

                {/* ACTIONS */}
                <div className="text-app-white font-medium text-center">
                    Actions
                </div>
            </div>

            {/* BODY */}
            <div className="w-full table min-w-[644px] ">
                {isLoadingRecipes
                    ? Array.from({ length: 3 }).map((_, idx) => (
                          <RecipeRowSkeleton key={`recipe_table_card_${idx}`} />
                      ))
                    : recipes?.map((recipe, idx) => {
                          const key = `recipe_card_${idx}_${recipe.id}`;

                          return (
                              <RecipeRow 
                                key={key} 
                                recipe={recipe} 
                                idx={idx} 
                                lastElementRef={idx === recipes.length - 1 ? lastElementRef : undefined}
                                setSelectedRecipe={setSelectedRecipe}
                            />
                          );
                      })}

                {isFetchingNextPage &&
                    Array.from({ length: 3 }).map((_, idx) => (
                        <RecipeRowSkeleton key={`recipe_table_card_${idx}`} />
                    ))}
            </div>
        </div>
    );
};

export default RecipesTable;
