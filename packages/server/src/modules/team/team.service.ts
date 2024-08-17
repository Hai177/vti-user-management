import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Like, Repository } from 'typeorm';

import { PaginationService } from '~/common/services';
import { TeamEntity, UserEntity } from '~/database/entities';
import { CreateTeamDto, TeamPageOptionsDto, UpdateTeamDto } from './dtos';

@Injectable()
export class TeamService extends PaginationService<TeamEntity> {
  constructor(
    @InjectRepository(TeamEntity) private readonly teamRepository: Repository<TeamEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {
    super(teamRepository);
  }

  getTeams(options: TeamPageOptionsDto) {
    return this.paginate(options, {
      where: {
        ...(options.q && { name: Like(`%${options.q}%`) }),
      },
      relations: {
        members: true,
      },
    });
  }

  async updateTeam(id: TeamEntity['id'], payload: UpdateTeamDto) {
    const newData: DeepPartial<TeamEntity> = { ...payload };

    if (payload.memberIds) {
      const users = await this.userRepository.find({ where: { id: In(payload.memberIds) } });
      newData.members = users;
    }

    return this.teamRepository.save(
      this.teamRepository.create({
        ...newData,
        id,
      })
    );
  }

  async softDelete(id: TeamEntity['id']): Promise<void> {
    await this.teamRepository.softDelete(id);
  }

  async createTeam(createteamDto: CreateTeamDto, owner: UserEntity) {
    const newData: DeepPartial<TeamEntity> = { ...createteamDto, owner };

    if (createteamDto.memberIds) {
      const users = await this.userRepository.find({ where: { id: In(createteamDto.memberIds) } });
      newData.members = users;
    }

    return this.teamRepository.save(this.teamRepository.create(newData));
  }
}
