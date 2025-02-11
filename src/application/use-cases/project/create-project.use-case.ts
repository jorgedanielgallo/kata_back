import { Injectable } from '@nestjs/common';
import { Project } from 'src/domain/entities/project.entity';
import { ProjectRepositoryImpl } from 'src/infrastructure/persistence/project.repository.impl';

@Injectable()
export class CreateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepositoryImpl) {}

  async execute(data: {
    name: string;
    description: string;
    ownerId: number;
  }): Promise<Project> {
    const project = new Project();
    project.name = data.name;
    project.description = data.description;
    project.ownerId = data.ownerId;
    project.createdAt = new Date();
    project.updatedAt = new Date();

    return await this.projectRepository.create(project);
  }
}
