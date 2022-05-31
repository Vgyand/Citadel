import { Auth } from 'src/auth/decorators/auth.decorator';
import { FileService } from './file.service';
import { Controller, Post, UsePipes, ValidationPipe, HttpCode, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileController {
    constructor(private readonly FileService: FileService) {

    }

    @Post()
    @HttpCode(200)
    @Auth('admin')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Query('folder') folder?: string) {
        return this.FileService.saveFiles([file], folder)
    }

}
