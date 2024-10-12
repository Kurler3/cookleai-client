import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useParams } from "react-router-dom";
import useGetCookbook from "../../../../hooks/cookbook/useGetCookbook";
import LoadingScreen from "../../../utils/LoadingScreen";
import ErrorScreen from "../../../utils/ErrorScreen";
import CookbookActionsDropdown from './dropdown/CookbookActionsDropdown';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { COOKBOOK_ROLES } from '../../../../utils/constants';
import { useGetUser } from '../../../../hooks/user';

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
            <div className="w-full flex flex-row justify-between items-center">

                {/* TITLE */}
                <h1 className="text-lg font-bold text-white">
                    {cookbook.title}
                </h1>

                {/* ACTIONS */}
                <div className="flex flex-row gap-2">

                    {/* ACTIONS DROPDOWN */}
                    <CookbookActionsDropdown
                        cookbook={cookbook}
                    />

                    {/* INVITE */}
                    <div className='dropdown'>

                        <div
                            tabIndex={0}
                            role="button"
                            className='btn gap-2 btn-neutral'
                        >
                            <PersonAddAltIcon />
                            Invite
                        </div>

                    </div>

                    {/* ADD RECIPES */}
                    {
                        cookbook.role !== COOKBOOK_ROLES.VIEWER && (
                            <button className='common_btn gap-2'>
                                <AddIcon />
                                Add Recipes
                            </button>
                        )
                    }

                </div>

            </div>

            {/* MEMBERS */}
            <div className='flex flex-row gap-2 justify-start items-center w-full'>

                {
                    cookbook.users!.map(({ role, user }, index) => {
                        return (
                            <div
                                className="tooltip tooltip-right" data-tip={`${user.firstName}${currentUser?.id === user.id ? ' (you)' : ''} is a ${role.toLowerCase()} in this cookbook`}
                                key={`cookbook_user_${user.id}_${index}`}
                            >
                                <Link to={`/dashboard/profiles/${user.id}`}>
                                    <div
                                        className="avatar cursor-pointer relative"
                                    >
                                        <div className="w-10 rounded-full bg-red-500">
                                            <img src={user.avatar} alt={user.email} />
                                        </div>


                                        {
                                            role === COOKBOOK_ROLES.OWNER ? (
                                                <AdminPanelSettingsIcon 
                                                className="absolute bottom-[-10px] right-[-10px] z-2 text-red-600 rounded bg-neutral"
                                            />
                                            ) : 
                                            role === COOKBOOK_ROLES.EDITOR ? (
                                                <EditIcon 
                                                    className="absolute bottom-[-10px] right-[-10px] z-2 text-green-600 bg-neutral rounded"
                                                />
                                            ) : (
                                                <VisibilityIcon 
                                                    className="absolute bottom-[-10px] right-[-10px] z-2 text-gray-800 bg-gray-100 rounded"
                                                />
                                            )
                                        }
                                       
                                    </div>
                                </Link>

                            </div>

                        )
                    })
                }

            </div>

            {/* RECIPES LIST */}

        </div>
    )
}

export default SingleCookbookPage;