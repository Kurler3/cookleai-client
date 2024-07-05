
import { createContext, ReactNode } from 'react';
import { IUser } from '../types';
import { useGetUser } from '../hooks/user';

type IUserContext = {
    isLoadingUser: boolean;
    isErrorWhileGettingUser: boolean;
    user: IUser | undefined;
    isFetchedUserSuccessfully: boolean;
    isLoggedIn: boolean;
    error: Error;
}


const UserContext = createContext<IUserContext | undefined>(undefined);


export const UserProvider = ({ children }: { children: ReactNode }) => {

    const {
        isLoadingUser,
        isErrorWhileGettingUser,
        user,
        isFetchedUserSuccessfully,
        isLoggedIn,
        error
    } = useGetUser();

    return (
        <UserContext.Provider value={{
            isLoadingUser,
            isErrorWhileGettingUser,
            user,
            isFetchedUserSuccessfully,
            isLoggedIn,
            error,
        }}>
            {children}
        </UserContext.Provider>
    )


}

export default UserContext;




