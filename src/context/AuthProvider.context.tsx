import { createContext, ReactNode, useState } from "react";
import { useGetUser } from "../hooks/user";


const AuthContext = createContext(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [token, setToken] = useState<string | null>(null);

    const {
        isLoadingUser,
        isErrorWhileGettingUser,
        user,
        isFetchedUserSuccessfully,
    } = useGetUser(token);

    return (
        <AuthContext.Provider value={{
            token,
            setToken,
            isLoadingUser,
            isErrorWhileGettingUser,
            user,
            isFetchedUserSuccessfully,
            isLoggedIn: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;