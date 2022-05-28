import { Auth } from './../auth/decorators/auth.decorator';
import { UserService } from './user.service';
import { Controller, Get } from '@nestjs/common';
import { User } from './decorators/user.decorator';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Get('profile')
    @Auth()
    async getProfile(@User('_id') _id: string) {
        return this.userService.byId(_id)
    }
}
