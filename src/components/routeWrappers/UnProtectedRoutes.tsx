import { Outlet, useNavigate } from "react-router-dom"
import { useGetUser } from "../../hooks/user";
import { useEffect } from "react";


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
        return <div>Loading...</div>;
    }

    // If user exists => navigate to homepage
    if (user || error) {
        return null;
    }
    return (
        <Outlet />
    )
};

export default UnProtectedRoutes;