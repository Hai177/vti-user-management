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

import { UserService } from './user.service';
import { ApiPageOkResponse } from '~/decorators';
import { UserEntity } from '~/database/entities';
import { CreateUserDto, UpdateUserDto, UserPageOptionsDto } from './dtos';
import { RolesGuard } from '~/guards';
import { RoleEnum } from '~/common/enums';
import { Roles } from '~/decorators/roles.decorator';

@ApiBearerAuth()
@Roles(RoleEnum.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('User')
@Controller({
  path: 'user',
  version: '1',
})
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiPageOkResponse({ type: UserEntity })
  @SerializeOptions({
    groups: ['admin'],
  })
  getUsers(@Query() options: UserPageOptionsDto) {
    return this.userService.getUsers(options);
  }

  @Put(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  deleteProject(@Param('id') id: string) {
    return this.userService.softDelete(id);
  }

  @Post()
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: UserEntity })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
