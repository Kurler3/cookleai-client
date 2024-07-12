import { IRecipe } from "../../../../types/recipe.types";
import RecipeRow from "./RecipeRow";
import RecipeRowSkeleton from "./RecipeRowSkeleton";



type IProps = {
    recipes: IRecipe[];
    isLoadingRecipes: boolean;
}


const RecipesTable: React.FC<IProps> = ({
    recipes,
    isLoadingRecipes,
}) => {


    return (
        // min-w-96 
        <div className="w-full overflow-x-auto overflow-y-hidden">

            {/* HEADERS */}
            <div className="w-full flex justify-between min-w-[644px] items-center gap-4 px-4 overflow-x-auto overflow-y-hidden border h-12 rounded border-gray-600 text-app-white">

                {/* IMAGE */}
                <div className="w-24 text-app-white font-medium text-center">
                    Image
                </div>

                {/* TITLE */}
                <div className="text-center flex-1 font-medium text-app-white">
                    Title
                </div>

                {/* AUTHOR */}
                <div className="text-app-white flex-1 min-w-44 font-medium text-center">
                    Author
                </div>

                {/* ACTIONS */}
                <div className="text-app-white font-medium text-center">
                    Actions
                </div>

            </div>

            {/* BODY */}
            <div className="w-full table min-w-[644px] ">

                {
                    recipes.map((recipe, idx) => {

                        const key = `recipe_card_${idx}_${recipe.id}`
                        return (
                            isLoadingRecipes ? (
                                <RecipeRowSkeleton key={key}/>
                            )
                                : (<RecipeRow
                                    key={key}
                                    recipe={recipe}
                                />)
                        )
                    })
                }

            </div>

        </div>
    )
};


export default RecipesTable;