import Layout from "@/components/layout/Layout"
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
    return <QueryClientProvider client={queryClient}>
        <Layout>
            {props.children}
        </Layout>
    </QueryClientProvider>
}

export default MainProvider