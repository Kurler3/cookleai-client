import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/auth/useAuth.hook";


const OAuthSuccess = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const urlToken = searchParams.get('token');

    const {
        setToken,
        isLoadingUser,
        isErrorWhileGettingUser,
        user,
        isFetchedUserSuccessfully,
    } = useAuth();

    console.log({
        isLoadingUser,
        isErrorWhileGettingUser,
        user,
        isFetchedUserSuccessfully,
    })

    useEffect(() => {
        // If there is a token!
        if (urlToken) {
            setToken(urlToken)
            // If no token found
        } else {
            navigate('/login');
        }
    }, [urlToken])

    useEffect(() => {

        // After getting user data, redirect to /dashboard
        if (user) {

            console.log('Navigating to dashboard')
            navigate('/dashboard');
        }

    }, [user])

    if (isErrorWhileGettingUser) {
        return <div>
            Something went wrong...{error!.message as string}
        </div>
    }

    if (isLoadingUser) {
        return <div>Loading user...</div>
    }


    return <h1>Logged!</h1>;
};

export default OAuthSuccess;