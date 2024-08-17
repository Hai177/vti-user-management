import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import { PaginationService } from 'src/common/services';
import { ProjectEntity, TeamEntity, UserEntity } from 'src/database/entities';
import { DeepPartial, In, Like, Not, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, UserPageOptionsDto } from './dtos';

@Injectable()
export class UserService extends PaginationService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>
  ) {
    super(userRepository);
  }

  async softDelete(id: UserEntity['id']): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  async updateUser(id: UserEntity['id'], payload: UpdateUserDto) {
    const newUser: DeepPartial<UserEntity> = { ...payload };

    if (newUser.username) {
      const checkUsername = await this.userRepository.findOne({ where: { id: Not(id), username: payload.username } });
      if (checkUsername) {
        throw new ConflictException('Username is exist');
      }
    }

    if (payload.teamId) {
      const team = await this.teamRepository.findOne({ where: { id: payload.teamId } });
      newUser.team = team;
    }

    if (payload.projectIds) {
      const projects = await this.projectRepository.find({ where: { id: In(payload.projectIds) } });
      newUser.projects = projects;
    }
    return this.userRepository.save(
      this.userRepository.create({
        ...newUser,
        id,
      })
    );
  }

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(randomStringGenerator(), salt);
    const newUser: DeepPartial<UserEntity> = { ...createUserDto, hash };

    if (createUserDto.teamId) {
      const team = await this.teamRepository.findOne({ where: { id: createUserDto.teamId } });
      newUser.team = team;
    }

    if (createUserDto.projectIds) {
      const projects = await this.projectRepository.find({ where: { id: In(createUserDto.projectIds) } });
      newUser.projects = projects;
    }

    return this.userRepository.save(this.userRepository.create(newUser));
  }

  getUsers(options: UserPageOptionsDto) {
    return this.paginate(options, {
      where: {
        ...(options.q && { username: Like(`%${options.q}%`) }),
      },
      relations: {
        team: true,
        projects: true,
      },
    });
  }

  findUserByUsername(username: string) {
    return this.repository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .getOne();
  }

  findUserById(id: string) {
    return this.repository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .addSelect('user.password')
      .getOne();
  }

  findUserByEmail(email: string) {
    return this.repository
      .createQueryBuilder('user')
      .where('user.id = :email', { email })
      .addSelect('user.password')
      .getOne();
  }
}
