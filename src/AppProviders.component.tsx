import { QueryClient, QueryClientProvider } from "react-query"
import { AuthProvider } from "./context/AuthProvider.context"
import { ReactNode } from "react"
import ErrorCatcher from "./components/utils/ErrorCatcher"

const queryClient = new QueryClient()

const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <ErrorCatcher>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </QueryClientProvider>
        </ErrorCatcher>
    )
}

export default AppProviders;