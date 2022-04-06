import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from 'mongoose';


export type AuthDocument = User & Document

@Schema()
export class User{
    // @Prop()
    // id: string

    @Prop()
    username: string

    @Prop()
    password: string
}
// export const AuthSchema = SchemaFactory.createForClass(User)
export const AuthSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
})

