import useLogout from "@/hooks/auth/useLogout.hook";
import { useEffect } from "react";




const Logout = () => {

    const {
        logout,
        isLoggingOut,
    } = useLogout();

    useEffect(() => {
        logout();
    }, [logout])

    if(isLoggingOut) {
        return (
            <div>
                <p>Logging out...</p>
            </div>
        )
    }

    return (
        <div>
            Preparing to logout
        </div>
    )
};


export default Logout;