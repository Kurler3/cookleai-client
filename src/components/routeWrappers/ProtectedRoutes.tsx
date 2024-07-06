import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetUser } from "../../hooks/user";


const ProtectedRoutes = () => {

    const navigate = useNavigate();

    const {
        isLoadingUser,
        isErrorWhileGettingUser,
        user,
    } = useGetUser();

    console.log({
        isLoadingUser,
        isErrorWhileGettingUser,
        user
    })

    useEffect(() => {

        if (
            isErrorWhileGettingUser && !isLoadingUser
        ) {
            navigate('/login')
        }

    }, []);

    // If loading
    if (isLoadingUser) {
        return <div>
            Loading...
        </div>
    }

    if (isErrorWhileGettingUser) {
        return (<div>Error</div>)
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default ProtectedRoutes;