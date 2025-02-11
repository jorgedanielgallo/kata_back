import { Project } from '../entities/project.entity';

export interface ProjectRepository {
  create(project: Project): Promise<Project>;
  findById(id: number): Promise<Project | null>;
  findAll(): Promise<Project[]>;
  update(id: number, project: Partial<Project>): Promise<Project | null>;
  delete(id: number): Promise<void>;
}
