import { useState } from 'react';
import RecipesPageHeader from './RecipesPageHeader';
import RecipesList from './RecipesList';

const RecipesPage = () => {

    const [
        isGrid,
        setIsGrid
    ] = useState(false);

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2">

            <RecipesPageHeader
                isGrid={isGrid}
                setIsGrid={setIsGrid} 
            />

            <RecipesList />
        </div>
    )
}

export default RecipesPage;