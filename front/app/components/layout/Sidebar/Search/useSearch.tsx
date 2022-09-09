import { ChangeEvent, useState } from "react"
import { useDebounce } from '@/hooks/useDebounce'
import { useQuery } from "react-query"
import { MoviesService } from "@/services/movie.service"

export const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSerch = useDebounce(searchTerm, 500)

    const { isSuccess, data } = useQuery(['search movie list', debouncedSerch], () => MoviesService.getAll(debouncedSerch), {
        select: ({ data }) => data,
        enabled: !!debouncedSerch
    })

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return { isSuccess, handleSearch, data, searchTerm }
}