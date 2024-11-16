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
import RecipesPage from "../../recipes/RecipesPage";
import ManageCookbookMembersModal from "./components/modals/ManageCookbookMembersModal";
import MembersList from "../../../utils/MembersList";
import { COOKBOOK_MODAL_IDS } from "../../../../utils/constants";

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

            <MembersList 
                modalId={COOKBOOK_MODAL_IDS.MANAGE_MEMBERS}
            />

            {/* MEMBERS */}
            <CookbookMembers 
                cookbook={cookbook}
                currentUser={currentUser}
            />

            {/* RECIPES LIST */}
            <RecipesPage />

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

            {/* Manage cookbook members */}
            <ManageCookbookMembersModal 
                cookbook={cookbook}
            />

        </div>
    )
}

export default SingleCookbookPage;