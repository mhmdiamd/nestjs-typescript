import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { randomUUID } from 'crypto';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // Get All Tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // Get Tasks with Filter
  getTasksWithFilter(filterDto: getTasksFilterDto): Task[] {
    const { search, status } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status == status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }

    return tasks;
  }

  // Get task by iD
  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} is not found!`);
    }

    return found;
  }

  // Create Task
  createTask(createTask: CreateTasksDto): Task {
    const { title, description } = createTask;
    const task: Task = {
      id: randomUUID(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  // Delete Task
  deleteTaskById(id: string): Task | undefined {
    const found = this.getTaskById(id);
    const deletedTask = this.tasks.find((task) => {
      return task.id === found.id;
    });

    const newTask = this.tasks.filter((task) => {
      return task.id != id;
    });

    this.tasks = newTask;
    return deletedTask;
  }

  // Update Task
  updateTaskById(id: string, status: TaskStatus): Task {
    const found = this.getTaskById(id);
    const newTask = { ...found, status };

    const getTasks: any = this.tasks.filter((task) => task.id != id);

    getTasks.push(newTask);
    this.tasks = getTasks;
    return newTask;
  }
}
