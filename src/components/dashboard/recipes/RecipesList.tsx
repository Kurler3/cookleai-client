import useGetUserRecipes from "../../../hooks/recipes/useGetUserRecipes.hook";
import RecipeCard from "./RecipeCard";


type IProps = {
    isGrid: boolean;
}

const RecipesList: React.FC<IProps> = ({ isGrid }) => {

    const {
        recipes
    } = useGetUserRecipes();

    return (
        <div className="flex justify-start items-start w-full flex-wrap gap-4">
            {
                recipes.map((recipe, idx) => {
                    return (
                        <RecipeCard 
                            key={`recipe_card_${idx}_${recipe.id}`}
                            recipe={recipe}
                        />
                    )
                })
            }
        </div>
    )
}

export default RecipesList;