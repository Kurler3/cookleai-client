import { useSearchParams } from "react-router-dom";
import { useGetUser } from "../../../hooks/user";


const OAuthSuccess = () => {

    const [ searchParams ] = useSearchParams();

    // Get user info
    const {
        isLoadingUser,
        isErrorWhileGettingUser,
        user,
        isFetchedUserSuccessfully,
        error,
    } = useGetUser(searchParams.get('token'))

    if(isLoadingUser) {
        return <div>Loading user...</div>
    }
 
    if(isErrorWhileGettingUser)  {
        return <div>
            Something went wrong...{error!.message as string}
        </div>
    }

    return (
        <div>
            Welcome {user?.fullName}
        </div>
    )
};

export default OAuthSuccess;