import { QueryClient, QueryClientProvider } from "react-query"
import { AuthProvider } from "./context/AuthProvider.context"
import { ReactNode } from "react"
import { UserProvider } from "./context/UserProvider.context"

const queryClient = new QueryClient()

const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default AppProviders;