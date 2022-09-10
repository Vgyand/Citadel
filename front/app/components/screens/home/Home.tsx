
import Meta from "@/utils/meta/Meta"
import { FC } from "react"
import { IHome } from "./home.interface"
import Heading from "@/components/ui/heading/Heading"
import { toastr } from "react-redux-toastr"

const Home: FC<IHome> = () => {
    return (
        <Meta title='Citadel' description='online cinema'>
            <Heading title="Home page" />
            <button onClick={() => toastr.success('auth', 'suc')}>suc dic</button>
        </Meta>
    )
}

export default Home