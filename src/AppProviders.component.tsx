import { QueryClient, QueryClientProvider } from "react-query"
import { AuthProvider } from "./context/AuthProvider.context"
import { ReactNode } from "react"
import ErrorCatcher from "./components/utils/ErrorCatcher"
import { Toaster } from 'react-hot-toast';


const queryClient = new QueryClient()

const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <ErrorCatcher>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    {children}
                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                    />
                </AuthProvider>
            </QueryClientProvider>
        </ErrorCatcher>
    )
}

export default AppProviders;