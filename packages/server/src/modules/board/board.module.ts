import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardEntity, ProjectEntity, UserEntity } from '~/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, UserEntity, ProjectEntity])],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
