import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import Searchbar from '../../utils/Searchbar';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';


type IProps = {
    isGrid: boolean;
    setIsGrid: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecipesPageHeader: React.FC<IProps> = ({
    isGrid,
    setIsGrid,
}) => {

    return (
        <>
            {/* TITLE AND DISCOVER AND ADD BUTTON */}
            <div className="flex justify-between items-center w-full">

                <div className="text-lg md:text-2xl font-bold text-white">
                    Recipes
                </div>

                <div className="flex justify-center items-center gap-2 flex-col md:flex-row">
                    <button
                        className="btn btn-sm md:btn-md text-white flex justify-center items-center"
                    >
                        <ExploreIcon />
                        <div>Explore</div>
                    </button>
                    <button className="btn btn-sm md:btn-md flex justify-center items-center common_btn">
                        <AddIcon />
                        <div>Add</div>
                    </button>
                </div>

            </div>

            {/* SEARCH BAR + FILTERS + GRID VIEW / ROW VIEW */}
            <div className='flex justify-start items-center gap-2'>

                {/* SEARCH BAR */}
                <Searchbar />

                {/* FILTER BUTTON */}
                <button
                    className='btn flex justify-center items-center common_btn'
                >

                    <FilterAltIcon />

                    <div>Filter</div>

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
        </>
    )
};

export default RecipesPageHeader;