import { useContext } from "react";
import AuthContext from "../../context/AuthProvider.context";


export const useAuth = () => {

    const authContext = useContext(AuthContext);

    if(!authContext) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return authContext;
}