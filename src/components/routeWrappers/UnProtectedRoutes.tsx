import { Outlet, useNavigate } from "react-router-dom"
import { useGetUser } from "../../hooks/user";
import { useEffect } from "react";
import LoadingScreen from "../utils/LoadingScreen";

const UnProtectedRoutes = () => {

    const navigate = useNavigate();

    // Check if user is logged in
    const { user, isLoadingUser } = useGetUser();

    useEffect(() => {
        if(user) {
            navigate('/')
        }
    }, [user]);

    if (isLoadingUser) {
        return <LoadingScreen />;
    }

    // If user exists => navigate to homepage
    if (user) {
        return null;
    }

    return (
        <Outlet />
    );
};

export default UnProtectedRoutes;