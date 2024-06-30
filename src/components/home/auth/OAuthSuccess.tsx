import { useSearchParams } from "react-router-dom";
import { useGetUser } from "../../../hooks/user";
import { useEffect } from "react";


const OAuthSuccess = () => {

    const [ searchParams ] = useSearchParams();

    // Get user info
    const {
        isLoadingUser,
        isErrorWhileGettingUser,
        user,
        error,
    } = useGetUser(searchParams.get('token'));
    
    useEffect(() => {
        
        // After getting user data, redirect to /dashboard
        if(user) {
            window.location.href = '/dashboard';
        }

    }, [user])


    if(isErrorWhileGettingUser)  {
        return <div>
            Something went wrong...{error!.message as string}
        </div>
    }

    if(isLoadingUser) {
        return <div>Loading user...</div>
    }
};

export default OAuthSuccess;