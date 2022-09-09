import Link from 'next/link'
import { FC } from 'react'
import MovieItem from './MovieItem'
import { IMovieList } from './movieList.interface'

import styles from './MovieList.module.scss'

const MovieList: FC<IMovieList> = ({ link, title, movies }) => {
    console.log(movies)
    return <div>
        <div>
            {title}
        </div>
        {movies.map(movie => <div key={movie._id}>{movie.title}</div>)}
    </div>
}



export default MovieList