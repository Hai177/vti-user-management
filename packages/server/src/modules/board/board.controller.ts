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
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { Roles } from '~/decorators/roles.decorator';
import { RoleEnum } from '~/common/enums';
import { RolesGuard } from '~/guards';
import { BoardService } from './board.service';
import { ApiPageOkResponse } from '~/decorators';
import { BoardEntity } from '~/database/entities';
import { BoardPageOptionsDto, CreateBoardDto, UpdateBoardDto } from './dtos';

@ApiBearerAuth()
@Roles(RoleEnum.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Board')
@Controller({
  path: 'board',
  version: '1',
})
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiPageOkResponse({ type: BoardEntity })
  getBoards(@Query() options: BoardPageOptionsDto) {
    return this.boardService.getBoards(options);
  }

  @Put(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  updateBoard(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.updateBoard(id, updateBoardDto);
  }

  @Delete(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  deleteBoard(@Param('id') id: string) {
    return this.boardService.softDelete(id);
  }

  @Post()
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: BoardEntity })
  createBoard(@Body() createBoardDto: CreateBoardDto, @Req() request: Request) {
    return this.boardService.createBoard(createBoardDto, request.user);
  }
}
