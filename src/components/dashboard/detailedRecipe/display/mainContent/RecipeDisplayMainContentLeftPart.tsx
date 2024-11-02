import recipePlaceholderImg from '@/assets/images/recipe_placeholder.png';
import { IRecipe } from '@/types';
import { FC } from 'react';
import IngredientDisplayRow from '../IngredientDisplayRow';
import ImageWithLoader from '../../../../utils/ImageWithLoader';

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
                <ImageWithLoader 
                    imgClassName='w-80 h-80 object-cover rounded'
                    imageUrl={recipe?.imageUrl ?? recipePlaceholderImg}
                    altTxt={recipe?.title ?? ''}
                    loader={
                        <div className='h-80 w-80 flex justify-center items-center'>
                            <div className="w-20 h-20 loading loading-spinner"></div>
                        </div>
                    }
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