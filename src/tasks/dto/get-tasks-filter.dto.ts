import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task-status-enum';
export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRES, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
