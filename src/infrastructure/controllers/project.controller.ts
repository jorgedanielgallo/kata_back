import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProjectRepositoryImpl } from '../persistence/project.repository.impl';
import { Project } from 'src/domain/entities/project.entity';
import { CreateProjectUseCase } from 'src/application/use-cases/project/create-project.use-case';
import { AuthGuard } from '../security/auth.guard';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectRepository: ProjectRepositoryImpl,
    private readonly createProjectUseCase: CreateProjectUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() projectData: Project, @Request() req): Promise<Project> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(`Usuario ${req.user} autenticado`);
    return this.createProjectUseCase.execute(projectData);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: number): Promise<Project | null> {
    return this.projectRepository.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: number,
    @Body() projectData: Partial<Project>,
  ): Promise<Project | null> {
    return this.projectRepository.update(id, projectData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.projectRepository.delete(id);
  }
}
