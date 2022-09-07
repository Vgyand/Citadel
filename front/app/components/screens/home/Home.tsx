
import Meta from "@/utils/meta/Meta"
import { FC } from "react"
import { IHome } from "./home.interface"
import logoImage from '../../../assets/images/heart.svg'
import Image from "next/image"

const Home: FC<IHome> = () => {
    return (
        <Meta title='Citadel' description='online cinema'>
            <h1>Home</h1>
        </Meta>
    )
}

export default Home