import Searchbar from '@/components/utils/Searchbar';
import { CSSProperties, FC, useMemo, useState } from 'react';

type IProps = {
    Icon: FC<{ style: CSSProperties }>;
    title: string;
    options: string[];
    onChangeSelected: (newValue: string | null) => void;
    selectedOption: string | null
}


const RecipeRadioFilter: FC<IProps> = ({
    Icon,
    title,
    options,
    onChangeSelected,
    selectedOption
}) => {

    const [filterSearch, setFilterSearch] = useState<string>('');

    const filteredOptions = useMemo(() => {
        return options.filter((option) => {
            return option.toLowerCase().includes(filterSearch.toLowerCase());
        })
    }, [filterSearch, options]);

    return (
        <div className="flex justify-center items-center transition">

            {/* ICON + NAME */}
            <div className="dropdown dropdown-bottom">

                <div tabIndex={0} role="button" className="btn m-1 p-2 bg-base-300 border-2 border-gray-500">

                    <Icon style={{ fontSize: '20px' }} />

                    <div className='text-xs'>
                        {title}
                    </div>

                    {
                        selectedOption && (
                            <div className='text-xs'>

                                |
                                <span className='text-app-green ml-2'>
                                    {selectedOption}
                                </span>

                            </div>
                        )
                    }

                </div>

                {/* DROPDOWN */}
                <ul
                    onBlur={() => {
                        setFilterSearch('')
                    }}
                    tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-20 w-52 p-2 shadow max-h-[300px] flex-nowrap overflow-y-auto overflow-x-hidden gap-4"
                >

                    {/* SEARCH BAR */}
                    <Searchbar
                        placeholder='Search for an option'
                        fullWidth
                        textSize='xs'
                        value={filterSearch}
                        setValue={(newValue?: string) => setFilterSearch(newValue ?? '')}
                    />


                    {/* ITEMS */}
                    {
                        filteredOptions.map((option) => {
                            return (
                                <div
                                    key={`recipe_radio_filter_${option}`}
                                    className='flex justify-start items-center flex-row gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded-md'
                                    onClick={() => {
                                        onChangeSelected(option === selectedOption ? null : option);
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







