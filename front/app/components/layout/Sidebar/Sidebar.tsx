import { FC } from 'react'
import MoviesContainer from './MoviesContainer/MoviesContainer'
import Search from './Search/Search'
import style from './Sidebar.module.scss'

const Sidebar: FC = () => {
    return (
        <div className={style.sidebar}>
            <Search />
            <MoviesContainer />
        </div>
    )
}

export default Sidebar