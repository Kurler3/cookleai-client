import { createContext, ReactNode, useState } from "react";


const AuthContext = createContext(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [token, setToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{
            token,
            setToken,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;