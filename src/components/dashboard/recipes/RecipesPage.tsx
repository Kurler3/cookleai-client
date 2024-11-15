import { useCallback, useState } from 'react';
import RecipesPageHeader from './RecipesPageHeader';
import RecipesList from './RecipesList';
import { RECIPE_ACTION_MODAL_IDS } from '@/utils/constants/recipes.constants';
import GenerateRecipeWithAIModal from './modal/GenerateRecipeWithAIModal';
import CreateRecipeManuallyModal from './modal/CreateRecipeManuallyModal';
import { IRecipeFilters } from '@/types';
import { useParams } from 'react-router-dom';
import useGetCookbook from '../../../hooks/cookbook/useGetCookbook';

const RecipesPage = () => {

    const {
        cookbookId,
    } = useParams();

    const {
        cookbook,
    } = useGetCookbook(cookbookId);

    const [
        isGrid,
        setIsGrid
    ] = useState(false);

    const [
        filters,
        setFilters,
    ] = useState<IRecipeFilters>({
        cuisine: null,
        difficulty: null,
        title: null,
    });

    ///////////////////////////////////
    // FUNCTION TO UPDATE A FILTER ////
    ///////////////////////////////////

    const updateFilter = useCallback((filterKey: string, newValue: string | null) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterKey]: newValue
        }));
    }, []);

    return (
        <div className="w-full flex flex-col justify-start items-start gap-4 h-full">

            <RecipesPageHeader
                isGrid={isGrid}
                setIsGrid={setIsGrid} 
                updateFilter={updateFilter}
                recipeFilters={filters}
                cookbook={cookbook}
            />

            <RecipesList 
                isGrid={isGrid} 
                filters={filters}
                cookbook={cookbook}
            />

            {/* GENERATE WITH AI MODAL */}
            <input type="checkbox" id={RECIPE_ACTION_MODAL_IDS.GENERATE_WITH_AI} className="modal-toggle" />

            <GenerateRecipeWithAIModal 
                cookbookId={cookbookId}
            />

            {/* CREATE MANUALLY MODAL */}
            <input type="checkbox" id={RECIPE_ACTION_MODAL_IDS.CREATE_MANUALLY} className="modal-toggle" />

            <CreateRecipeManuallyModal 
                cookbookId={cookbookId}
            />
        </div>
    )
}

export default RecipesPage;