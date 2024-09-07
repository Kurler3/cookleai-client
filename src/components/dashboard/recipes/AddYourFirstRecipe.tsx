import { RECIPE_ACTION_MODAL_IDS } from '@/utils/constants';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const AddYourFirstRecipe = () => {
    return (
        <div className="flex justify-start items-center flex-col gap-4 w-full py-20">

            <RocketLaunchIcon 
                style={{
                    fontSize: 70,
                }}
                className='bg-gray-800 rounded-lg p-1'
            />

            
            <div
                className="text-xl text-white font-bold"
            >
                Add your first Recipe   
            </div>

            <div className='text-sm'>
                Add your first recipe and start your recipe collection
            </div>


            <label htmlFor={RECIPE_ACTION_MODAL_IDS.CREATE} className='common_btn'>
                Add first recipe
            </label>
            
            <button className='btn'>
                Explore
            </button>

        </div>
    )
};

export default AddYourFirstRecipe;
