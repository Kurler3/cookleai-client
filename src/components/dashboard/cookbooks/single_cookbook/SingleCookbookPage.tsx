import {  useParams } from "react-router-dom";
import useGetCookbook from "../../../../hooks/cookbook/useGetCookbook";
import LoadingScreen from "../../../utils/LoadingScreen";
import ErrorScreen from "../../../utils/ErrorScreen";
import { useGetUser } from '../../../../hooks/user';
import CookbookPageHeader from './components/CookbookPageHeader';
import CookbookMembers from './components/CookbookMembers';
import EditCookbookTitleModal from "./components/modals/EditCookbookTitleModal";
import DeleteCookbookModal from "./components/modals/DeleteCookbookModal";
import LeaveCookbookModal from "./components/modals/LeaveCookbookModal";

const SingleCookbookPage = () => {

    const { cookbookId } = useParams();

    // Get the cookbook!
    const {
        cookbook,
        error,
        isLoadingCookbook,
    } = useGetCookbook(cookbookId);

    const {
		user: currentUser
	} = useGetUser();

    if (isLoadingCookbook) {
        return (
            <LoadingScreen
                message="Getting the cookbook's information..."
            />
        )
    }

    if (error || !cookbook) {
        return (
            <ErrorScreen />
        )
    }

    return (
        <div className="flex justify-start items-center flex-col gap-4 h-full w-full overflow-auto px-2">

            {/* TITLE + ACTIONS */}
            <CookbookPageHeader 
                cookbook={cookbook}
            />

            {/* MEMBERS */}
            <CookbookMembers 
                cookbook={cookbook}
                currentUser={currentUser}
            />

            {/* //TODO: RECIPES LIST */}



            {/* ------------------------------------------------- */}
            {/* --------------- MODALS -------------------------- */}
            {/* ------------------------------------------------- */}

            {/* Edit cookbook title modal */}
            <EditCookbookTitleModal 
                cookbook={cookbook}
            />

            {/* Delete cookbook */}
            <DeleteCookbookModal 
                cookbook={cookbook}
            />

            {/* Leave cookbook */}
            <LeaveCookbookModal 
                cookbook={cookbook}
            />

            {/* //TODO: Add people to cookbook modal */}

        </div>
    )
}

export default SingleCookbookPage;