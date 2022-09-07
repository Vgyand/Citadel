
import Meta from "@/utils/meta/Meta"
import { FC } from "react"
import { IHome } from "./home.interface"
import Heading from "@/components/ui/heading/Heading"

const Home: FC<IHome> = () => {
    return (
        <Meta title='Citadel' description='online cinema'>
            <Heading title="Home page" />
        </Meta>
    )
}

export default Home