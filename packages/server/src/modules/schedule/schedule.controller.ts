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
import { ApiAcceptedResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { Roles } from '~/decorators/roles.decorator';
import { RolesGuard } from '~/guards';
import { RoleEnum } from '~/common/enums';
import { ApiPageOkResponse } from '~/decorators';
import { ScheduleEntity } from '~/database/entities';
import { GetScheduleByDateDto, SchedulePageOptionsDto, UpdateOrCreateScheduleDto } from './dtos';
import { ScheduleService } from './schedule.service';

@ApiBearerAuth()
@Roles(RoleEnum.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Schedule')
@Controller({
  path: 'schedule',
  version: '1',
})
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiPageOkResponse({ type: ScheduleEntity })
  getSchedules(@Query() options: SchedulePageOptionsDto) {
    return this.scheduleService.getSchedules(options);
  }

  @Get('by-date')
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiOkResponse({ type: [ScheduleEntity] })
  getSchedulesByDate(@Query() options: GetScheduleByDateDto) {
    return this.scheduleService.getScheduleByDate(options);
  }

  @Put(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  updateSchedule(@Param('id') id: string, @Body() updateScheduleDto: UpdateOrCreateScheduleDto, @Req() req: Request) {
    return this.scheduleService.updateSchedule(id, updateScheduleDto, req.user);
  }

  @Delete(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  deleteSchedule(@Param('id') id: string) {
    return this.scheduleService.softDelete(id);
  }

  @Post()
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ScheduleEntity })
  createSchedule(@Body() createBoardDto: UpdateOrCreateScheduleDto, @Req() req: Request) {
    return this.scheduleService.createSchedule(createBoardDto, req.user);
  }
}
