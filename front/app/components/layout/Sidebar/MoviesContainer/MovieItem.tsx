import MaterialIcon from '@/components/ui/MaterialIcon'
import { getMoviesUrl } from '@/config/api.config'
import { IMovie } from '@/shared/types/movie.types'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'





import styles from './MovieList.module.scss'


const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
    return (
        <div className={styles.item}>
            <Link href={getMoviesUrl(movie.slug)}>
                <a>
                    <Image
                        alt={movie.title}
                        width={65}
                        height={97}
                        src={`/uploads/${movie.poster}`}
                        draggable={false}
                        priority
                    />
                </a>
            </Link>
            <div className={styles.info}>
                <div>
                    <div className={styles.title}>{movie.title}</div>
                    <div className={styles.genres}>
                    </div>
                </div>
                <div className={styles.rating}>
                    <MaterialIcon name="MdStarRate" />
                    <span>{movie.rating.toFixed(1)}</span>
                </div>
            </div>
        </div>
    )
}

export default MovieItem