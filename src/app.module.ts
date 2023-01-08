import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { TypeOrmConfig } from './tasks/config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    /*Configuration Database using postgress*/ TypeOrmModule.forRoot(
      TypeOrmConfig,
    ),
    TasksModule,
  ],
})
export class AppModule {}
