import { FC } from 'react'
import Logo from './Logo'
import MenuContainer from './MenuContainer/MenuContainer'
import style from './Navigation.module.scss'

const Navigation: FC = () => {
    return (
        <div className={style.navigation}>
            <Logo />
            <MenuContainer />

        </div>
    )
}

export default Navigation