import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

export interface LayoutProps {
    children: React.ReactNode
}


const MainProvider = (props: LayoutProps) => {
    return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
}

export default MainProvider