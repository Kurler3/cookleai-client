import SearchIcon from '@mui/icons-material/Search';
import { FC } from 'react';


type IProps = {
    placeholder?: string;
    fullWidth?: boolean;
    textSize?: 'xs' | 'sm' | 'md'
    value?: string;
    setValue?: (newValue?: string) => void;
}

const Searchbar: FC<IProps> = ({
    placeholder = "Search my recipes...",
    fullWidth=false,
    textSize='sm', 
    value,
    setValue,
}) => {

    const widthsClass = fullWidth ? 'w-full' : 'w-20 md:w-56 lg:w-80'

    return (
        <div className='relative'>

            <SearchIcon className={`text-${textSize} left-2 absolute top-3`} />

            <input
                type="text"
                value={value}
                onChange={({target: { value }}) => {setValue?.(value)}}
                placeholder={placeholder}
                className={` ${widthsClass} input input-md input-bordered text-${textSize} pl-10 focus:outline-app-green`}
            />

        </div>

    )
}

export default Searchbar;