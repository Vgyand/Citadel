import Layout from "@/components/layout/Layout"
import { store } from "@/store/store"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import HeadProvider from "./HeadProvider"
import ReduxToast from "./ReduxToast"


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
    return (
        <HeadProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ReduxToast />
                    <Layout>
                        {props.children}
                    </Layout>
                </QueryClientProvider>
            </Provider>
        </HeadProvider>

    )
}

export default MainProvider