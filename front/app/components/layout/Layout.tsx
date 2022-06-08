import { FC } from 'react'
import style from './Layout.module.scss'
import Navigation from './Navigation/Navigation'
import Sidebar from './Sidebar/Sidebar'

interface ILayout {
    children?: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
    return <div className={style.layout}>
        <Navigation />
        <div className={style.center}>{children}</div>
        <Sidebar />
    </div>
}

export default Layout