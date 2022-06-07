import { ICollection } from './genre.interface';
import { MovieService } from './../movie/movie.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreModel } from './genre.model';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class GenreService {
    constructor(@InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>,
        private readonly MovieService: MovieService) { }

    /* User */
    async bySlug(slug: string) {
        return this.GenreModel.findOne(({ slug })).exec()
    }

    async getAll(searchTerm?: string) {
        let options = {}

        if (searchTerm) {
            options = {
                $or: [
                    {
                        name: new RegExp(searchTerm, 'i'),
                    },
                    {
                        slug: new RegExp(searchTerm, 'i'),
                    },
                    {
                        description: new RegExp(searchTerm, 'i'),
                    },
                ],
            }
        }

        return this.GenreModel
            .find(options)
            .select('-updatedAt -__v')
            .sort({ createdAt: 'desc' })
            .exec()
    }


    async getCollections(): Promise<ICollection[]> {
        const genres = await this.getAll()

        const collections = await Promise.all(
            genres.map(async (genre) => {
                const moviesByGenre = await this.MovieService.byGenres([genre._id])

                const result: ICollection = {
                    _id: String(genre._id),
                    title: genre.name,
                    slug: genre.slug,
                    image: moviesByGenre[0].bigPoster,
                }

                return result
            })
        )

        return collections
    }
    /* Admin */
    async byId(_id: string) {
        const genre = await this.GenreModel.findById(_id)
        if (!genre) throw new NotFoundException('Genre Not Found')
        return genre
    }

    async update(_id: string, dto: CreateGenreDto) {
        const updateDoc = await this.GenreModel.findByIdAndUpdate(_id, dto, {
            new: true
        }).exec()

        if (!updateDoc) throw new NotFoundException('Genre not found')
        return updateDoc
    }

    async create() {
        const defaultValue: CreateGenreDto = {
            name: '',
            slug: '',
            description: '',
            icon: ''
        }
        const genre = await this.GenreModel.create(defaultValue)
        return genre._id
    }

    async delete(id: string) {
        const deleteDoc = await this.GenreModel.findByIdAndDelete(id).exec()
        if (!deleteDoc) throw new NotFoundException('Genre not found')
        return deleteDoc
    }
}
