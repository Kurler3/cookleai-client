import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "./context/AuthProvider.context"
import { ReactNode } from "react"
import ErrorCatcher from "./components/utils/ErrorCatcher"
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <ErrorCatcher>
            <QueryClientProvider client={queryClient}>

                {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}

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