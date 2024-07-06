import { Outlet, useNavigate } from "react-router-dom"
import { useGetUser } from "../../hooks/user";
import { useEffect } from "react";
import LoadingScreen from "../utils/LoadingScreen";
import ErrorScreen from "../utils/ErrorScreen";


const UnProtectedRoutes = () => {

    const navigate = useNavigate();

    // Check if user is logged in
    const { user, isLoadingUser, error } = useGetUser();

    useEffect(() => {

        if(user || error) {
            navigate('/')
        }

    }, [user, error]);

    if (isLoadingUser) {
        return <LoadingScreen />;
    }

    // If user exists => navigate to homepage
    if (user || error) {
        return <ErrorScreen />;
    }
    return (
        <Outlet />
    )
};

export default UnProtectedRoutes;