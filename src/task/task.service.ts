import { Injectable } from "@nestjs/common";
import { Task } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

// In Service we have the code that interacts with the database
@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {

    }

    async create(task: Task): Promise<Task> {
        return this.prisma.task.create({
            data: task
        });
    }

    async findAll(): Promise<Task[]> {
        return this.prisma.task.findMany(); 
    }

    async findOne(id: number): Promise<Task> {
        return this.prisma.task.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: number, task: Task): Promise<Task> {
        return this.prisma.task.update({
            where: {
                id
            },
            data: task
        });
    }

    async delete(id: number): Promise<Task> {
        return this.prisma.task.delete({
            where: {
                id
            }
        });
    }
}
