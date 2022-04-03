import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectService } from './projectServices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects, Joins, Users } from './project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projects, Joins, Users])],
  controllers: [ProjectsController],
  providers: [ProjectService],
})
export class ProjectModule {}
