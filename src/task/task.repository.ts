import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./task.schema";
import { FilterQuery, Model } from 'mongoose'

@Injectable()
export class  TaskRepository{
    constructor(@InjectModel(Task.name) private TaskModel: Model<TaskDocument>) { }

    async findAll(TaskFilterQuery: FilterQuery<Task>): Promise<Task[]> {
        return this.TaskModel.find(TaskFilterQuery).exec();
    }

    async findOne(TaskFilterQuery: FilterQuery<Task>): Promise<Task>{
        return this.TaskModel.findOne(TaskFilterQuery)
    }
    
    async create(Task: Task): Promise<Task> {
        const newTask = new this.TaskModel(Task);
        return newTask.save();
    }

    async update(TaskFilterQuery: FilterQuery<Task>, Task: Partial<Task>): Promise<Task> {
        return this.TaskModel.findOneAndUpdate(TaskFilterQuery, Task)
    }
}