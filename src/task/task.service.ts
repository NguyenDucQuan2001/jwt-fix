import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose'
import { CreatetaskDto } from './dto/create-task.dto';
import { UpdatetaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';


@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name)
        private readonly model: Model<TaskDocument>
    ) { }

    // async getTask(filterDto: GetTaskFilterDto): Promise<Task[]> {
    //     const { status, search } = filterDto
    //     const query = this.model.find({ $or: [{ status: status == status }, { search: search == search }] })
    //     return query
    // }

    async findAll(): Promise<Task[]> {
        return await this.model.find().exec();
    }

    async findOne(id: string): Promise<Task> {
        const found = await this.model.findById(id).exec();
        if (!found) {
            throw new NotFoundException(`không tìm thấy gì từ id: ${id}`);
        }
        return found
    }

    async create(createTaskDto: CreatetaskDto): Promise<Task> {
        return await new this.model({
            ...createTaskDto,
            status: TaskStatus.OPEN
        }).save();
    }

    async update(id: string, updateTaskDto: UpdatetaskDto): Promise<Task> {
        return await this.model.findByIdAndUpdate(id, updateTaskDto).exec();
    }

    async delete(id: string): Promise<Task> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
