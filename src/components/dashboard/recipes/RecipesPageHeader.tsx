import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/utils/constants';
import { RECIPE_ACTION_MODAL_IDS } from '@/utils/constants/recipes.constants';
import CreateRecipeModal from './modal/CreateRecipeModal';
import RecipePageHeaderFilters from './RecipePageHeaderFilters';
import { IRecipeFilters } from '@/types';


type IProps = {
    isGrid: boolean;
    setIsGrid: React.Dispatch<React.SetStateAction<boolean>>;
    updateFilter: (filterKey: string, newValue: string | null) => void;
    recipeFilters: IRecipeFilters;
}

const RecipesPageHeader: React.FC<IProps> = ({
    isGrid,
    setIsGrid,
    updateFilter,
    recipeFilters
}) => {

    return (
        <>
            {/* TITLE AND DISCOVER AND ADD BUTTON */}
            <div className="flex justify-between items-center w-full">

                <div className="text-lg md:text-2xl font-bold text-white">
                    Recipes
                </div>

                <div className="flex justify-center items-center gap-2 flex-col md:flex-row">
                    <Link
                        to={ROUTE_PATHS.EXPLORE}
                        className="btn btn-sm md:btn-md text-white flex justify-center items-center"
                    >
                        <ExploreIcon />
                        <div>Explore</div>
                    </Link>
                    <label 
                        htmlFor={RECIPE_ACTION_MODAL_IDS.CREATE}
                        className="btn btn-sm md:btn-md flex justify-center items-center common_btn"
                    >
                        <AddIcon />
                        <div>Add</div>
                    </label>
                </div>

            </div>

            {/* SEARCH BAR + FILTERS + GRID VIEW / ROW VIEW */}
            <RecipePageHeaderFilters 
                isGrid={isGrid}
                setIsGrid={setIsGrid}
                updateFilter={updateFilter}
                recipeFilters={recipeFilters}
            />

            {/* CREATE RECIPE MODAL */}
            <input type="checkbox" id={RECIPE_ACTION_MODAL_IDS.CREATE} className='modal-toggle' />
            <CreateRecipeModal />
                
        </>
    )
};

export default RecipesPageHeader;