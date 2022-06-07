import { MovieModule } from 'src/movie/movie.module';
import { MovieModel } from './../movie/movie.model';
import { MovieService } from './../movie/movie.service';
import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { GenreModel } from './genre.model';

@Module({
  imports: [TypegooseModule.forFeature([
    {
      typegooseClass: GenreModel,
      schemaOptions: {
        collection: 'Genre',
      },
    },
  ]),
    MovieModule
  ],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule { }
