import { SetRatingDto } from './dto/srt-rationg.dto';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { UserService } from './../user/user.service';
import { User } from './../user/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RatingService } from './rating.service';
import { Controller, Get, HttpCode, Put, Post, UsePipes, ValidationPipe, Param, Body } from '@nestjs/common';
import { Types } from 'mongoose'

@Controller('ratings')
export class RatingController {
    constructor(private readonly RatingService: RatingService) { }


    @Get(':movieId')
    @Auth()
    async getMovieValueByUser(@Param('movieId', IdValidationPipe) movieId: Types.ObjectId, @User('_id') _id: Types.ObjectId) {
        return this.RatingService.getMovieValueByUser(movieId, _id)
    }

    @UsePipes(new ValidationPipe())
    @Post('set-rating')
    @HttpCode(200)
    @Auth()
    async setRating(@User('_id') _id: Types.ObjectId, @Body() dto: SetRatingDto) {
        return this.RatingService.setRating(_id, dto)
    }
}
