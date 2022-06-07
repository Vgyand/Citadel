import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateMovieDto } from './dto/movie.dto';
import { MovieModel } from './movie.model';

@Injectable()
export class MovieService {

    constructor(@InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>) { }

    /* User */
    async getAll(searchTerm?: string) {
        let options = {}

        if (searchTerm) {
            options = {
                $or: [
                    {
                        title: new RegExp(searchTerm, 'i'),
                    },
                ],
            }
        }

        return this.MovieModel
            .find(options)
            .select('-updatedAt -__v')
            .sort({ createdAt: 'desc' })
            .populate('actors genres')
            .exec()
    }

    async bySlug(slug: string) {
        const doc = await this.MovieModel.findOne(({ slug })).populate('actors genres').exec()
        if (!doc) throw new NotFoundException('movie not found')
        return doc
    }

    async byActor(actorId: Types.ObjectId) {
        const doc = await this.MovieModel.find(({ actors: actorId })).exec()
        if (!doc) throw new NotFoundException('movie not found')
        return doc
    }

    async byGenres(genreIds: Types.ObjectId[]) {
        const doc = await this.MovieModel.find(({ genre: { $in: genreIds } })).exec()
        if (!doc) throw new NotFoundException('movie not found')
        return doc
    }

    async getMostPopular() {
        return this.MovieModel.find(({ countOpened: { $gt: 0 } })).sort({ countOpened: -1 }).populate('genres').exec()
    }

    async updateCountOpened(slug: string) {
        const updateDoc = await this.MovieModel.findOneAndUpdate({ slug }, { $inc: { countOpened: 1 } }, {
            new: true
        }).exec()

        if (!updateDoc) throw new NotFoundException('movie not found')
        return updateDoc
    }

    async updateRating(id: Types.ObjectId, newRating: number) {
        return this.MovieModel.findByIdAndUpdate(id, {
            rating: newRating
        }, {
            new: true
        }).exec()
    }

    /* Admin */
    async byId(_id: string) {
        const movie = await this.MovieModel.findById(_id)
        if (!movie) throw new NotFoundException('movie Not Found')
        return movie
    }

    async update(_id: string, dto: CreateMovieDto) {
        const updateDoc = await this.MovieModel.findByIdAndUpdate(_id, dto, {
            new: true
        }).exec()

        if (!updateDoc) throw new NotFoundException('movie not found')
        return updateDoc
    }

    async create() {
        const defaultValue: CreateMovieDto = {
            bigPoster: '',
            actors: [],
            genres: [],
            description: '',
            poster: '',
            title: '',
            videoUrl: '',
            slug: ''
        }
        const movie = await this.MovieModel.create(defaultValue)
        return movie._id
    }

    async delete(id: string) {
        const deleteDoc = await this.MovieModel.findByIdAndDelete(id).exec()
        if (!deleteDoc) throw new NotFoundException('movie not found')
        return deleteDoc
    }


}

