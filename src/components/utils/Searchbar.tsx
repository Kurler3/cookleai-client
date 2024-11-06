import SearchIcon from '@mui/icons-material/Search';
import { FC, useEffect, useState } from 'react';


type IProps = {
    placeholder?: string;
    fullWidth?: boolean;
    textSize?: 'xs' | 'sm' | 'md'
    value: string | null;
    setValue?: (newValue?: string) => void;
}

const Searchbar: FC<IProps> = ({
    placeholder = "Search my recipes...",
    fullWidth = false,
    textSize = 'sm',
    value,
    setValue,
}) => {

    const [debouncerValue, setDebouncerValue] = useState(value ?? null);

    useEffect(() => {

        if (debouncerValue) {
            const t = setTimeout(() => {

                setValue?.(debouncerValue);

            }, 500);

            return () => {
                clearTimeout(t);
            }   
        }


    }, [debouncerValue, setValue])

    const widthsClass = fullWidth ? 'w-full' : 'w-20 md:w-56 lg:w-80'

    return (
        <div className='relative'>

            <SearchIcon className={`text-${textSize} left-2 absolute top-3`} />

            <input
                type="text"
                value={debouncerValue ?? ''}
                onChange={(e) => { setDebouncerValue(e.target.value) }}
                placeholder={placeholder}
                className={` ${widthsClass} input input-md input-bordered text-${textSize} pl-10 focus:outline-app-green`}
            />

        </div>

    )
}

export default Searchbar;