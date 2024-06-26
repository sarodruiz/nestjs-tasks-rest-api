import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";

// Define the /tasks route
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async getAllTasks() {
        return this.taskService.findAll();
    }

    @Post()
    async createTask(@Body() task: Task) {
        return this.taskService.create(task);
    }

    @Get(':id')
    async getTask(@Param('id') id: string) {
        const task = await this.taskService.findOne(Number(id));
        if (!task) {
            throw new NotFoundException('Task not found')
        }
        return task;
    }

    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() task: Task) {
        try {
            return await this.taskService.update(Number(id), task);
        } catch (error) {
            throw new NotFoundException('Task not found');
        }
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string) {
        try {
            return await this.taskService.delete(Number(id));
        } catch (error) {
            throw new NotFoundException('Task not found');
        }
    }
}
