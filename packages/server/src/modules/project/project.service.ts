import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Like, Repository } from 'typeorm';

import { PaginationService } from '~/common/services';
import { ProjectEntity, ProjectPermissionEntity, UserEntity } from '~/database/entities';
import { ProjectPageOptionsDto } from './dtos/project-page-options.dto';
import { CreateProjectDto, UpdateProjectDto } from './dtos';
import { PermissionRoleEnum } from '~/common/enums';

@Injectable()
export class ProjectService extends PaginationService<ProjectEntity> {
  constructor(
    @InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(ProjectPermissionEntity)
    private readonly projectPermissionRepository: Repository<ProjectPermissionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    super(projectRepository);
  }

  getProjects(options: ProjectPageOptionsDto) {
    return this.paginate(options, {
      where: {
        ...(options.q && { name: Like(`%${options.q}%`) }),
      },
      relations: ['members'],
    });
  }

  async updateProject(id: ProjectEntity['id'], payload: UpdateProjectDto) {
    const updateData: DeepPartial<ProjectEntity> = { ...payload };
    if (payload.memberIds) {
      const users = await this.userRepository.find({ where: { id: In(payload.memberIds) } });
      updateData.members = users;
    }

    return this.projectRepository.save(
      this.projectRepository.create({
        ...updateData,
        id,
      })
    );
  }

  async softDelete(id: ProjectEntity['id']): Promise<void> {
    await this.projectRepository.softDelete(id);
  }

  async createProject(createProjectDto: CreateProjectDto, user: UserEntity) {
    const newData: DeepPartial<ProjectEntity> = { ...createProjectDto, owner: user };
    if (createProjectDto.memberIds) {
      const users = await this.userRepository.find({ where: { id: In(createProjectDto.memberIds) } });
      newData.members = users;
    }
    const project = this.projectRepository.create(newData);
    const newProject = await this.projectRepository.save(project);
    const permission = this.projectPermissionRepository.create({
      role: PermissionRoleEnum.OWNER,
      project,
      user,
    });
    await this.projectPermissionRepository.save(permission);

    return newProject;
  }
}
