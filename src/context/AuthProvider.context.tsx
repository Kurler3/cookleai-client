import { createContext, ReactNode, useState } from "react";
import { useGetUser } from "../hooks/user";
import { IUser } from "../types";


type IAuthContext = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    isLoadingUser: boolean;
    isErrorWhileGettingUser: boolean;
    user: IUser | undefined;
    isFetchedUserSuccessfully: boolean;
    isLoggedIn: boolean;
}   

const AuthContext = createContext<IAuthContext | undefined>(undefined);


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