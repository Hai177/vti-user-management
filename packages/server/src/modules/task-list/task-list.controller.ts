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
import { TaskListService } from './task-list.service';
import { ApiPageOkResponse } from '~/decorators';
import { TaskListEntity } from '~/database/entities';
import { CreateTaskListDto, TaskListPageOptionsDto, UpdateTaskListDto } from './dtos';

@ApiBearerAuth()
@Roles(RoleEnum.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Task List')
@Controller({
  path: 'task-list',
  version: '1',
})
@Controller('task-list')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Get()
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiPageOkResponse({ type: TaskListEntity })
  getTaskList(@Query() options: TaskListPageOptionsDto) {
    return this.taskListService.getTaskList(options);
  }

  @Put(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  updateTaskList(@Param('id') id: string, @Body() updateBoardDto: UpdateTaskListDto) {
    return this.taskListService.updateTaskList(id, updateBoardDto);
  }

  @Delete(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  deleteTaskList(@Param('id') id: string) {
    return this.taskListService.softDelete(id);
  }

  @Post()
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: TaskListEntity })
  createTaskList(@Body() createBoardDto: CreateTaskListDto) {
    return this.taskListService.createTaskList(createBoardDto);
  }
}
