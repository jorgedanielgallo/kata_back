import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/domain/entities/project.entity';
import { ProjectRepositoryImpl } from '../persistence/project.repository.impl';
import { ProjectController } from '../controllers/project.controller';
import { CreateProjectUseCase } from 'src/application/use-cases/project/create-project.use-case';
import { AuthModule } from '../security/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), AuthModule],
  providers: [ProjectRepositoryImpl, CreateProjectUseCase],
  controllers: [ProjectController],
})
export class ProjectModule {}
