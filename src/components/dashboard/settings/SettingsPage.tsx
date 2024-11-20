import { useGetUser } from "../../../hooks/user"
import ErrorScreen from "../../utils/ErrorScreen";
import LoadingScreen from "../../utils/LoadingScreen";
import DeleteAccountButton from "./utilities/DeleteAccountButton";

const SettingsPage = () => {

    const {
        user,
        isLoadingUser,
        isErrorWhileGettingUser,
    } = useGetUser();

    if (isLoadingUser) {
        return <LoadingScreen />
    }

    if (!user) {
        return <ErrorScreen
            message="You need to be logged in for this route :/"
        />
    }

    if (isErrorWhileGettingUser) {
        return <ErrorScreen
        />
    }

    return (
        <div 
            className="w-full h-full flex justify-start items-start gap-4 p-4 flex-col"
        >

            <h1 className="text-2xl text-white font-medium">
                Settings
            </h1>

            {/* BUTTON TO DELETE ACCOUNT */}
            <DeleteAccountButton />

        </div>
    )
}

export default SettingsPage