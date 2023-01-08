import { PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly taskStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRES,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  isValidStatus(status: any) {
    const idx = this.taskStatus.indexOf(status);
    return idx !== -1;
  }
}
