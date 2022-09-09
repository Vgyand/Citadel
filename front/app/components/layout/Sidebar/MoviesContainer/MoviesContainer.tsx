import { FC } from "react"
import FavoriteMovies from "./FavoriteMovies/FavoriteMovies"
import style from './MovieContainer.module.scss'
import PopularMovies from "./PopularMovies"

const MoviesContainer: FC = () => {
    return (
        <div>
            <PopularMovies />
            <FavoriteMovies />
        </div>
    )
}

export default MoviesContainer