import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/domain/entities/task.entity';
import { TaskRepositoryImpl } from '../persistence/task.repository.impl';
import { TaskController } from '../controllers/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskRepositoryImpl],
  controllers: [TaskController],
})
export class TaskModule {}
