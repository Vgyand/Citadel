import { FC } from 'react'
import GenreMenu from './genres/GenreMenu'
import Menu from './Menu'
import { firstMenu, userMenu } from './menu.data'

const MenuContainer: FC = () => {
    return (
        <div>
            <Menu menu={firstMenu} />
            <GenreMenu />
            <Menu menu={userMenu} />
        </div>

    )
}

export default MenuContainer