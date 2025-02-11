import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskRepositoryImpl } from '../persistence/task.repository.impl';
import { Task } from 'src/domain/entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskRepository: TaskRepositoryImpl) {}

  @Post()
  async create(@Body() taskData: Task): Promise<Task> {
    return this.taskRepository.create(taskData);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  @Get('projects/:projectId')
  async findByProject(@Param('projectId') projectId: number): Promise<Task[]> {
    return this.taskRepository.findByProjectId(projectId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() taskData: Partial<Task>,
  ): Promise<Task | null> {
    return this.taskRepository.update(id, taskData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.taskRepository.delete(id);
  }
}
