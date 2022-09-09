import { FC } from 'react'
import Search from './Search/Search'
import style from './Sidebar.module.scss'

const Sidebar: FC = () => {
    return (
        <div className={style.sidebar}>
            <Search />

        </div>
    )
}

export default Sidebar