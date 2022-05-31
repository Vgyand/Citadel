import { prop } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"

export interface ActorModel extends Base {
}

export class ActorModel extends TimeStamps {
    @prop()
    slug: string

    @prop({ unique: true })
    name: string

    @prop()
    photo: string
}