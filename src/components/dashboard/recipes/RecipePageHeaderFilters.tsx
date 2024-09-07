import Searchbar from "@/components/utils/Searchbar";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FC } from "react";
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import { CUISINE_TYPES, RECIPE_DIFFICULTY } from "@/utils/constants";
import RecipeRadioFilter from "./filters/RecipeRadioFilter";


type IProps = {
    setIsGrid: (value: React.SetStateAction<boolean>) => void;
    isGrid: boolean;
}

const RecipePageHeaderFilters: FC<IProps> = ({
    setIsGrid,
    isGrid,
}) => {

    return (
        <>

            <div className='flex justify-start items-center gap-2'>

                {/* SEARCH BAR */}
                <Searchbar />

                {/* DISPLAY/HIDE FILTERs BUTTON */}
                <button
                    className='btn flex justify-center items-center common_btn'
                >

                    <FilterAltIcon />

                    <div className='hidden lg:block'>Filter</div>

                    <KeyboardArrowDownIcon />

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
            <div>
                
                <RecipeRadioFilter />


                {/* CUISINE */}
                {/* <select
                    className="select bg-base-300 focus:outline-app-green h-10 flex-1"
                    // onChange={handleOnChange}
                    // value={editRecipeState.cuisine}
                    name='cuisine'
                >

                    <option value="" selected>Select a cuisine</option>

                    {CUISINE_TYPES.map((cuisine, index) => (
                        <option key={index} value={cuisine}>
                            {cuisine}
                        </option>
                    ))}
                </select> */}

                {/* DIFFICULTY */}
                {/* <select
                    className="select bg-base-300 focus:outline-app-green h-10 flex-1"
                    // onChange={handleOnChange}
                    // value={editRecipeState.difficulty}
                    name='difficulty'
                >
                    <option value="" selected>Select a difficulty</option>
                    {RECIPE_DIFFICULTY.map((difficulty, index) => (
                        <option key={index} value={difficulty}>
                            {difficulty}
                        </option>
                    ))}
                </select> */}

            </div>
        </>
    )

};

export default RecipePageHeaderFilters;