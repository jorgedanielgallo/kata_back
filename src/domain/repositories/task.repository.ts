import { Task } from '../entities/task.entity';

export interface TaskRepository {
  create(task: Task): Promise<Task>;
  findById(id: number): Promise<Task | null>;
  findByProjectId(projectId: number): Promise<Task[]>;
  update(id: number, task: Partial<Task>): Promise<Task | null>;
  delete(id: number): Promise<void>;
}
