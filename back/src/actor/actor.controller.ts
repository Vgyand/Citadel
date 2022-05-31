import { ActorDto } from './dto/actor.dto';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Controller, Get, Param, Put, Query, HttpCode, UsePipes, ValidationPipe, Body, Post, Delete } from '@nestjs/common';
import { ActorService } from './actor.service';

@Controller('actors')
export class ActorController {

    constructor(private readonly ActorService: ActorService) {
    }

    @Get('by-slug/:slug')
    async bySlug(@Param('slug') slug: string) {
        return this.ActorService.bySlug(slug)
    }


    @Get()
    async getAll(@Query('searchTerm') searchTerm?: string) {
        return this.ActorService.getAll(searchTerm)
    }

    @Get(':id')
    @Auth('admin')
    async get(@Param('id', IdValidationPipe) id: string) {
        return this.ActorService.byId(id)
    }

    @UsePipes(new ValidationPipe())
    @Put(':id')
    @HttpCode(200)
    @Auth('admin')
    async update(@Param('id', IdValidationPipe) id: string, @Body() dto: ActorDto) {
        return this.ActorService.update(id, dto)
    }


    @UsePipes(new ValidationPipe())
    @Post()
    @HttpCode(200)
    @Auth('admin')
    async create() {
        return this.ActorService.create()
    }


    @UsePipes(new ValidationPipe())
    @Delete(':id')
    @HttpCode(200)
    @Auth('admin')
    async delete(@Param('id', IdValidationPipe) id: string) {
        return this.ActorService.delete(id)
    }
}
