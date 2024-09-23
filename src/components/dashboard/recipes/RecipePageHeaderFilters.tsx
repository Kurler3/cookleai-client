import Searchbar from "@/components/utils/Searchbar";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FC, useState } from "react";
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import { CUISINE_TYPES, RECIPE_DIFFICULTY } from "@/utils/constants";
import RecipeRadioFilter from "./filters/RecipeRadioFilter";
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import { IRecipeFilters } from "@/types";


type IProps = {
    setIsGrid: (value: React.SetStateAction<boolean>) => void;
    isGrid: boolean;
    updateFilter: (filterKey: string, newValue: string | null) => void;
    recipeFilters: IRecipeFilters;
}

const RecipePageHeaderFilters: FC<IProps> = ({
    setIsGrid,
    isGrid,
    updateFilter,
    recipeFilters,
}) => {

    const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);

    return (
        <>

            <div className='flex justify-start items-center gap-2'>

                {/* SEARCH BAR */}
                <Searchbar
                    placeholder="Search for a recipe title"
                    value={recipeFilters.title ?? ''}
                    setValue={(newValue?: string) => {
                        updateFilter('title', newValue ?? null)
                    }}
                />

                {/* DISPLAY/HIDE FILTERs BUTTON */}
                <button
                    className='btn flex justify-center items-center common_btn'
                    onClick={() => { setIsShowingFilters(!isShowingFilters) }}
                >

                    <FilterAltIcon />

                    <div className='hidden lg:block'>Filter</div>

                    <KeyboardArrowDownIcon 
                        style={{
                            transition: 'transform 0.2s ease-in-out', // Smooth rotation transition
                            transform: `rotate(${isShowingFilters ? 180 : 0}deg)` // Apply dynamic rotation
                        }} 
                    />

                </button>

                {/* GRID / ROW VIEW */}
                <button className='btn btn-neutral' onClick={() => { setIsGrid(!isGrid) }}>
                    {
                        isGrid ? (
                            <ViewListIcon />
                        ) : (
                            <GridViewIcon />
                        )
                    }
                </button>


            </div>

            {/* FILTERS */}
            {
                isShowingFilters && (
                    <div className="flex justify-start items-center gap-2">

                        {/* CUISINE */}
                        <RecipeRadioFilter
                            title="Cuisine"
                            options={CUISINE_TYPES}
                            Icon={SoupKitchenIcon}
                            onChangeSelected={(newCuisine) => {
                                updateFilter('cuisine', newCuisine)
                            }}
                            selectedOption={recipeFilters.cuisine}
                        />

                        {/* DIFFICULTY */}
                        <RecipeRadioFilter
                            title="Difficulty"
                            options={RECIPE_DIFFICULTY}
                            Icon={SoupKitchenIcon}
                            onChangeSelected={(newDifficulty) => {
                                updateFilter('difficulty', newDifficulty)
                            }}
                            selectedOption={recipeFilters.difficulty}
                        />

                    </div>
                )
            }

        </>
    )

};

export default RecipePageHeaderFilters;