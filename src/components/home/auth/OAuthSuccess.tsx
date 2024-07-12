import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/auth/useAuth.hook";
import { useGetUser } from "../../../hooks/user";
import ErrorScreen from "../../utils/ErrorScreen";
import LoadingScreen from "../../utils/LoadingScreen";
import { ROUTE_PATHS } from "../../../utils/constants";


const OAuthSuccess = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const urlToken = searchParams.get('token');

    const {
        setToken
    } = useAuth()

    const {
        isLoadingUser,
        isErrorWhileGettingUser,
        user,
    } = useGetUser();

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
            navigate(ROUTE_PATHS.DASHBOARD);
        }

    }, [user])

    if (isErrorWhileGettingUser) {
        return <ErrorScreen />
    }

    if (isLoadingUser) {
        return <LoadingScreen />
    }


    return <h1>Logged!</h1>;
};

export default OAuthSuccess;