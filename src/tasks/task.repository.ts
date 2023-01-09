import { DataSource, EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './task-status-enum';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  // Update Task
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    const tasks = await query.getMany();

    return tasks;
  }

  // Create Task
  async createTask(createTaskDto: CreateTasksDto) {
    const { title, description } = createTaskDto;

    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
}
