import { useContext } from "react"
import UserContext from "../../context/UserProvider.context"




export const useUser = () => {

    const userCtx = useContext(UserContext);

    if(!userCtx) {
        throw new Error('useUser must be used inside UserProvider');
    } 

    return userCtx;
}