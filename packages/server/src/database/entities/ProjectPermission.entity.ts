import { BeforeInsert, Column, Entity, ManyToOne, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractEntity } from '~/common/entities';
import { PermissionRoleEnum } from '~/common/enums';
import { generateEntityId } from '~/common/utils';
import { UserEntity } from './User.entity';
import { EnumField } from '~/decorators';
import { ProjectEntity } from './Project.entity';

@Entity({ name: 'project_permission' })
@Unique(['role', 'user', 'project'])
export class ProjectPermissionEntity extends AbstractEntity {
  @EnumField(() => PermissionRoleEnum, { default: PermissionRoleEnum.MEMBER })
  @Column({
    type: 'enum',
    enum: PermissionRoleEnum,
    default: PermissionRoleEnum.MEMBER,
  })
  role: PermissionRoleEnum;

  @ManyToOne(() => UserEntity)
  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (pro) => pro.permissions)
  @ApiProperty({ type: () => ProjectEntity })
  project: ProjectEntity;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'pr-per');
  }
}
