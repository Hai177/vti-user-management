import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Repository } from 'typeorm';

import { RoleEnum, StatusEnum } from 'src/common/enums';
import { UserEntity } from 'src/database/entities';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        username: 'admin',
        roles: ArrayContains([RoleEnum.ADMIN]),
      },
    });

    if (!countAdmin) {
      const newAdmin = this.repository.create({
        name: 'Admin',
        username: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        roles: [RoleEnum.ADMIN],
        status: StatusEnum.ACTIVE,
      });
      await this.repository.save(newAdmin);
    }
  }
}
