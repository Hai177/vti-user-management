import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Like, Repository } from 'typeorm';

import { PaginationService } from '~/common/services';
import { BoardEntity, ProjectEntity, UserEntity } from '~/database/entities';
import { BoardPageOptionsDto, CreateBoardDto, UpdateBoardDto } from './dtos';

@Injectable()
export class BoardService extends PaginationService<BoardEntity> {
  constructor(
    @InjectRepository(BoardEntity) private readonly boardRepository: Repository<BoardEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>
  ) {
    super(boardRepository);
  }

  getBoards(options: BoardPageOptionsDto) {
    return this.paginate(options, {
      where: {
        ...(options.q && { name: Like(`%${options.q}%`) }),
      },
      relations: {
        project: true,
      },
    });
  }

  async updateBoard(id: BoardEntity['id'], payload: UpdateBoardDto) {
    const newData: DeepPartial<BoardEntity> = { ...payload, id };
    if (payload?.projectId) {
      const project = await this.projectRepository.findOne({ where: { id: payload.projectId } });
      newData.project = project;
    }

    return this.boardRepository.save(
      this.boardRepository.create({
        ...newData,
        id,
      })
    );
  }

  async softDelete(id: BoardEntity['id']): Promise<void> {
    await this.boardRepository.softDelete(id);
  }

  async createBoard(createBoardDto: CreateBoardDto, user: UserEntity) {
    const newData: DeepPartial<BoardEntity> = { ...createBoardDto, owner: user };

    const project = await this.projectRepository.findOne({ where: { id: createBoardDto.projectId } });
    newData.project = project;

    return await this.boardRepository.save(this.boardRepository.create(newData));
  }
}
