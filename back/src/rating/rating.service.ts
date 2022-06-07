import { SetRatingDto } from './dto/srt-rationg.dto';
import { MovieService } from './../movie/movie.service';
import { RatingModel } from './rating.model';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose'

@Injectable()
export class RatingService {
    constructor(
        @InjectModel(RatingModel)
        private readonly ratingModel: ModelType<RatingModel>,
        private readonly movieService: MovieService
    ) { }


    async averageRatingByMovie(movieId: Types.ObjectId | string) {
        const ratingsMovie: RatingModel[] = await this.ratingModel.aggregate().match({
            movieId: new Types.ObjectId(movieId)
        }).exec()

        return ratingsMovie.reduce((acc, item) => acc + item.value, 0) / ratingsMovie.length
    }

    async getMovieValueByUser(movieId: Types.ObjectId, userId: Types.ObjectId) {
        return this.ratingModel.findOne({ movieId, userId }).select('value').exec().then(data => data ? data.value : 0)
    }

    async setRating(userId: Types.ObjectId, dto: SetRatingDto) {
        const { movieId, value } = dto

        const newRating = await this.ratingModel.findOneAndUpdate({ movieId, userId },
            {
                movieId, userId, value
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }).exec()
        const averageRating = await this.averageRatingByMovie(movieId)

        await this.movieService.updateRating(movieId, averageRating)
        return newRating
    }
}
