import { UpdatetaskDto } from './dto/update-task.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreatetaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
// @UseGuards(AuthGuard())
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    // @Get()
    // getAuth(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    //     return this.taskService.getTask(filterDto)
    // }

    @Get()
    async index() {
        return await this.taskService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.taskService.findOne(id);
    }

    @Post()
    async create(@Body() createTaskDto: CreatetaskDto) {
        return await this.taskService.create(createTaskDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateTaskDto: UpdatetaskDto) {
        return await this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.taskService.delete(id);
    }
}
