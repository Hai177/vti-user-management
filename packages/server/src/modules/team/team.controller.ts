import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { ApiPageOkResponse } from '~/decorators';
import { TeamEntity } from '~/database/entities';
import { CreateTeamDto, TeamPageOptionsDto, UpdateTeamDto } from './dtos';
import { TeamService } from './team.service';

@ApiTags('Team')
@Controller({
  path: 'team',
  version: '1',
})
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ApiPageOkResponse({ type: TeamEntity })
  getTeams(@Query() options: TeamPageOptionsDto) {
    return this.teamService.getTeams(options);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  updateTeam(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.updateTeam(id, updateTeamDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  deleteTeam(@Param('id') id: string) {
    return this.teamService.softDelete(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: TeamEntity })
  createTeam(@Body() createTeamDto: CreateTeamDto, @Req() req: Request) {
    return this.teamService.createTeam(createTeamDto, req.user);
  }
}
