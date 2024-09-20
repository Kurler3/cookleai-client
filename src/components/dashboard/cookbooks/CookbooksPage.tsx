import useGetCookbooks from '@/hooks/cookbook/useGetCookbooks';
import AddIcon from '@mui/icons-material/Add';
import CookbookCard from './components/CookbookCard';


const CookbooksPage = () => {

    // Get cookbooks.
    const {
        cookbooks,
        isLoadingCookbooks,
        errorWhileGettingCookbooks,
        lastElementRef,
        isFetchingNextPage,
    } = useGetCookbooks();

    console.log({
        cookbooks,
        isLoadingCookbooks,
        errorWhileGettingCookbooks,
        lastElementRef,
        isFetchingNextPage,
    });

    return (
        <div className="flex justify-start items-center flex-col gap-4 w-full h-full overflow-hidden px-2">

            {/* HEADER */}
            <div className="w-full flex justify-between items-center flex-wrap gap-2">
                {/* TITLE */}
                <h2 className="text-xl font-bold text-white">
                    Cookbooks
                </h2>

                {/* CREATE COOKBOOK BUTTON */}
                <button
                    className="common_btn"
                >
                    {/* ADD ICON */}
                    <AddIcon />

                    Create Cookbook
                </button>
            </div>

            {/* LIST OF COOKBOOKS */}
            {
                isLoadingCookbooks ? (
                    <div className="w-full h-full flex justify-center items-center">
                        {/* //TODO: Loading skeletons */}
                        Loading...
                    </div>  
                ) :
                    <div className='w-full gap-4 flex justif-start items-start flex-wrap overflow-auto no-scrollbar'>
                        {cookbooks?.map((cookbook) => {
                            return (
                                <CookbookCard
                                    key={`cookbook_${cookbook.id}`}
                                    cookbook={cookbook}
                                    lastElementRef={lastElementRef}
                                />
                            )
                        })}
                    </div>

            }

            {/* IF IS FETCHING NEXT PAGE */}
            {
                isFetchingNextPage && (
                    <div className="w-full h-full flex justify-center items-center">
                        Loading MORE...
                    </div>
                )
            }

        </div>
    )
};

export default CookbooksPage;