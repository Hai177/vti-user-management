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
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiAcceptedResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '~/decorators/roles.decorator';
import { RolesGuard } from '~/guards';
import { RoleEnum } from '~/common/enums';
import { TaskService } from './task.service';
import { ApiPageOkResponse } from '~/decorators';
import { TaskListEntity } from '~/database/entities';
import { CreateTaskDto, TaskPageOptionsDto, UpdateTaskDto } from './dtos';

@ApiBearerAuth()
@Roles(RoleEnum.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Task')
@Controller({
  path: 'task',
  version: '1',
})
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiPageOkResponse({ type: TaskListEntity })
  getTasks(@Query() options: TaskPageOptionsDto) {
    return this.taskService.getTasks(options);
  }

  @Put(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  deleteTask(@Param('id') id: string) {
    return this.taskService.softDelete(id);
  }

  @Post()
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: TaskListEntity })
  createTask(@Body() createBoardDto: CreateTaskDto) {
    return this.taskService.createTask(createBoardDto);
  }
}
