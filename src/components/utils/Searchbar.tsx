import SearchIcon from '@mui/icons-material/Search';


const Searchbar = () => {
    return (
        <div className='relative'>

            <SearchIcon className='text-sm left-2 absolute top-3'/>

            <input
                type="text"
                placeholder="Search my recipes..."
                className="w-20 md:w-56 lg:w-80 input input-md input-bordered text-sm pl-10 focus:outline-app-green" 
            />
            
        </div>

    )
}

export default Searchbar;