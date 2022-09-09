import { MoviesService } from "@/services/movie.service"
import { FC } from "react"
import { useQuery } from "react-query"
import MovieList from "./MovieList"

const PopularMovies: FC = () => {
    const { isLoading, data } = useQuery('Most Popular Movies', () => (MoviesService.getMostPopularMovies()))
    return (
        <div>{isLoading ? <div className='mt-11'>
            loading...
        </div> : <MovieList movies={data || []} link="/trending" title="Popular Movies" />
        }
        </div>
    )
}

export default PopularMovies