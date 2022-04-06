import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from './task-status';

export type TaskDocument = Task & Document

@Schema()
export class Task{
    @Prop()
    id: string

    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    status: TaskStatus
}

export const TaskSchema = SchemaFactory.createForClass(Task)