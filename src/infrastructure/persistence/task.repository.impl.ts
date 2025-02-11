import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  async create(task: Task): Promise<Task> {
    return this.repository.save(task);
  }

  async findById(id: number): Promise<Task | null> {
    return this.repository.findOne({ where: { id }, relations: ['project'] });
  }

  async findByProjectId(projectId: number): Promise<Task[]> {
    return this.repository.find({ where: { project: { id: projectId } } });
  }

  async update(id: number, task: Partial<Task>): Promise<Task | null> {
    await this.repository.update(id, task);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
