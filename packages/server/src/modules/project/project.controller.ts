import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiAcceptedResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { ProjectService } from './project.service';
import { CreateProjectDto, ProjectPageOptionsDto, UpdateProjectDto } from './dtos';
import { ApiPageOkResponse } from '~/decorators';
import { ProjectEntity } from '~/database/entities';
import { RoleEnum } from '~/common/enums';
import { Roles } from '~/decorators/roles.decorator';
import { RolesGuard } from '~/guards';

@ApiBearerAuth()
@Roles(RoleEnum.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Project')
@Controller({
  path: 'project',
  version: '1',
})
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiPageOkResponse({ type: ProjectEntity })
  getProjects(@Query() options: ProjectPageOptionsDto) {
    return this.projectService.getProjects(options);
  }

  @Put(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  deleteProject(@Param('id') id: string) {
    return this.projectService.softDelete(id);
  }

  @Post()
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ProjectEntity })
  createProject(@Body() createProjectDto: CreateProjectDto, @Req() request: Request) {
    return this.projectService.createProject(createProjectDto, request.user);
  }
}
