import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './../../user/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly ConfigService: ConfigService, @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: ConfigService.get('JWT_SECRET')
        })
    }
    async validate({ _id }: Pick<UserModel, '_id'>) {
        return this.UserModel.findById(_id).exec()
    }
}