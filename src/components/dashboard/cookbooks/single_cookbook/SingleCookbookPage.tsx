import { useParams } from "react-router-dom";
import useGetCookbook from "../../../../hooks/cookbook/useGetCookbook";
import LoadingScreen from "../../../utils/LoadingScreen";
import ErrorScreen from "../../../utils/ErrorScreen";


const SingleCookbookPage = () => {

    const { cookbookId } = useParams();

    // Get the cookbook!
    const {
        cookbook,
        error,
        isLoadingCookbook,
    } = useGetCookbook(cookbookId);

    if(isLoadingCookbook) {
        return (
            <LoadingScreen 
                message="Getting the cookbook's information..."
            />
        )
    }

    if(error || !cookbook) {
        return (
            <ErrorScreen />
        )
    }

    return (    
        <div className="flex justify-start items-center flex-col gap-4 h-full w-full overflow-auto px-2">
            
            {/* TITLE + ACTIONS */}
            <div className="w-full flex flex-row justify-between items-center">

                <h1 className="text-lg font-bold text-white">
                    {cookbook.title}
                </h1>

            </div>     

            {/* RECIPES LIST */}


        </div>
    )
}

export default SingleCookbookPage;