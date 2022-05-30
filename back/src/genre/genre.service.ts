import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreModel } from './genre.model';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class GenreService {
    constructor(@InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>) { }

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
                        email: new RegExp(searchTerm, 'i')
                    },
                    {
                        slug: new RegExp(searchTerm, 'i')
                    },
                    {
                        description: new RegExp(searchTerm, 'i')
                    }
                ]
            }
        }
        return this.GenreModel.find(options).select('-updatedAt -__v').sort({
            createdAt: 'desc'
        }).exec()
    }

    async getCollections() {
        const genres = await this.getAll()
        const collections = genres

        return collections
    }

    /* Admin */
    async byId(_id: string) {
        const genre = await this.GenreModel.findById(_id)
        if (!genre) throw new NotFoundException('Genre Not Found')
        return genre
    }

    async update(_id: string, dto: CreateGenreDto) {
        return this.GenreModel.findByIdAndUpdate(_id, dto, {
            new: true
        }).exec()
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
        return this.GenreModel.findByIdAndDelete(id).exec()
    }
}
