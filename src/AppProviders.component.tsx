import { QueryClient, QueryClientProvider } from "react-query"
import { AuthProvider } from "./context/AuthProvider.context"
import { ReactNode } from "react"


const queryClient = new QueryClient()
  
const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default AppProviders;