import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/domain/entities/project.entity';
import { ProjectRepository } from 'src/domain/repositories/project.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectRepositoryImpl implements ProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly repository: Repository<Project>,
  ) {}

  async create(project: Project): Promise<Project> {
    return this.repository.save(project);
  }

  async findById(id: number): Promise<Project | null> {
    return this.repository.findOne({ where: { id }, relations: ['tasks'] });
  }

  async findAll(): Promise<Project[]> {
    return this.repository.find({ relations: ['tasks'] });
  }

  async update(id: number, project: Partial<Project>): Promise<Project | null> {
    await this.repository.update(id, project);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
