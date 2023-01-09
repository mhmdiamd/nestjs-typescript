import { CreateTasksDto } from './dto/create-tasks.dto';
import { TaskRepository } from './task.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status-enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  // Get Task by Id
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} is not found!`);
    }

    return found;
  }

  // Create Task
  async createTask(createTaskDto: CreateTasksDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // Delete Task
  async deleteTaskById(id: number) {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} is not found!`);
    }
  }

  // Update Task
  async updateTaskById(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();

    return task;
  }
}
