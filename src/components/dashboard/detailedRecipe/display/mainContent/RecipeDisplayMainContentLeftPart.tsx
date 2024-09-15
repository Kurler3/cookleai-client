import recipePlaceholderImg from '@/assets/images/recipe_placeholder.png';
import { IRecipe } from '@/types';
import { FC } from 'react';
import IngredientDisplayRow from '../IngredientDisplayRow';

type IProps = {
    recipe?: IRecipe;
}

const RecipeDisplayMainContentLeftPart: FC<IProps> = ({
    recipe,
}) => {
    return (
        <div className="flex flex-1 flex-col justify-start items-center gap-4">

            {/* IMAGE */}
            <div className="w-full border flex justify-center items-center rounded border-gray-600">
                <img
                    src={recipe?.image ?? recipePlaceholderImg}
                    alt={recipe?.title}
                    className="w-80 h-80 object-cover rounded"
                />
            </div>

            {/* INGREDIENTS */}
            <div className="flex justify-start items-start flex-col gap-4 w-full p-4">

                {/* TITLE */}
                <h3 className="text-white text-xl font-medium">
                    Ingredients
                </h3>

                {/* SERVINGS */}
                <div className="text-base">
                    <span className="text-white">Servings:</span> {recipe?.servings ? `${recipe?.servings} servings` : 'No servings specified'}
                </div>

                {/* LIST OF INGREDIENTS */}
                {
                    recipe?.ingredients && recipe?.ingredients.length ? (
                        recipe?.ingredients?.map((ingredient, index) => (
                            <IngredientDisplayRow
                                key={`recipe_${recipe?.id}_ingredient_${index}`}
                                ingredient={ingredient}
                            />
                        ))
                    ) : (
                        <div>
                            No ingredients found!
                        </div>
                    )

                }

            </div>

        </div>
    )
}

export default RecipeDisplayMainContentLeftPart