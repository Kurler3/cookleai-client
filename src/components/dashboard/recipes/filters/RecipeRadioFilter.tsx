


import { CUISINE_TYPES } from '@/utils/constants';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import { useState } from 'react';

//TODO Icon + Name - Value selected.

const RecipeRadioFilter = () => {

    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    return (
        <div className="flex justify-center items-center">

            {/* ICON + NAME */}
            <div className="dropdown dropdown-bottom">

                <div tabIndex={0} role="button" className="btn m-1 p-2 bg-base-300 border-2 border-gray-500">

                    <SoupKitchenIcon style={{ fontSize: '20px' }} />

                    <div className='text-xs'>
                        Cuisine
                    </div>

                    {
                        selectedOption && (
                            <div className='text-xs'>

                                | 
                                <span className='text-app-green'>
                                    {selectedOption}
                                </span>

                            </div>
                        )
                    }

                </div>

                {/* DROPDOWN */}
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-20 w-52 p-2 shadow max-h-[300px] flex-nowrap overflow-y-auto overflow-x-hidden gap-4">

                    {/* SEARCH BAR */}



                    {/* ITEMS */}
                    {
                        CUISINE_TYPES.map((option) => {
                            return (
                                <div
                                    key={`recipe_radio_filter_${option}`}
                                    className='flex justify-start items-center flex-row gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded-md'
                                    onClick={() => {
                                        setSelectedOption(option);
                                    }}
                                >

                                    {/* RADIO BUTTON */}
                                    <div
                                        className={`
                                            radio checked:bg-blue-500 h-4 w-4
                                            border border-app-green
                                            transition
                                            ${selectedOption === option && 'bg-app-green'}
                                        `}
                                    ></div>

                                    <div className='flex-1'>
                                        {option}
                                    </div>
                                </div>
                            )
                        })
                    }


                </ul>
            </div>


        </div>
    )

};


export default RecipeRadioFilter;







