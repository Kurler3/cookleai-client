import useGetUserRecipes from "../../../hooks/recipes/useGetUserRecipes.hook";
import { useGetUser } from "../../../hooks/user";
import RecipeCard from "./grid/RecipeCard";
import RecipeRow from "./RecipeRow";
import RecipesListRowHeaders from "./RecipesListRowHeaders";


type IProps = {
    isGrid: boolean;
}

const RecipesList: React.FC<IProps> = ({ isGrid }) => {

    const {
        recipes
    } = useGetUserRecipes();

    const {
        user
    } = useGetUser();

    console.log(user);

    return (
        <div className="flex justify-start items-start w-full flex-wrap gap-4">

            {
                !isGrid && (
                    <RecipesListRowHeaders />
                )
            }

            {
                recipes.map((recipe, idx) => {

                    const key = `recipe_card_${idx}_${recipe.id}`

                    return (
                        isGrid ?
                            (<RecipeCard
                                key={key}
                                recipe={recipe}
                            />)
                            : (
                                <RecipeRow
                                    key={key}
                                    recipe={recipe}
                                />
                            )
                    )
                })
            }
        </div>
    )
}

export default RecipesList;