import { useState } from 'react';
import RecipesPageHeader from './RecipesPageHeader';
import RecipesList from './RecipesList';

const RecipesPage = () => {

    const [
        isGrid,
        setIsGrid
    ] = useState(false);

    return (
        <div className="w-full flex flex-col justify-start items-start gap-4 h-full">

            <RecipesPageHeader
                isGrid={isGrid}
                setIsGrid={setIsGrid} 
            />

            <RecipesList isGrid={isGrid}/>
        </div>
    )
}

export default RecipesPage;