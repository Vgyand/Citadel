import { FC } from "react"
import ProgressBar from 'nextjs-progressbar'
import { accentColor } from "@/config/constants"
import Head from "next/head"

export interface IHP {
    children: React.ReactNode
}

const HeadProvider: FC<IHP> = (props) => {
    return (
        <>
            <ProgressBar color={accentColor}
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
            />
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1.0"
                />


                <meta name="theme-color" content={'#181B1E'} />
                <meta name="msapplication-navbutton-color" content={'#181B1E'} />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content={'#181B1E'} />
            </Head>
            {props.children}
        </>
    )
}

export default HeadProvider