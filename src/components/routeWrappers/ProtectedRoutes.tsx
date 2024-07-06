import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetUser } from "../../hooks/user";
import LoadingScreen from "../utils/LoadingScreen";
import ErrorScreen from "../utils/ErrorScreen";


const ProtectedRoutes = () => {

    const navigate = useNavigate();

    const {
        isLoadingUser,
        isErrorWhileGettingUser,
    } = useGetUser();

    useEffect(() => {

        if (
            isErrorWhileGettingUser && !isLoadingUser
        ) {
            navigate('/login')
        }

    }, []);

    // If loading
    if (isLoadingUser) {
        return ( <LoadingScreen /> )
    }

    if (isErrorWhileGettingUser) {
        return (
            <ErrorScreen />
        )
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default ProtectedRoutes;