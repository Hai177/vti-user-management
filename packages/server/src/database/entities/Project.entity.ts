import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractEntity } from '~/common/entities';
import { StatusEnum } from '~/common/enums';
import { generateEntityId } from '~/common/utils';
import { UserEntity } from './User.entity';
import { EnumField, StringField, StringFieldOptional } from '~/decorators';
import { ProjectPermissionEntity } from './ProjectPermission.entity';
import { BoardEntity } from './Board.entity';

@Entity({ name: 'project' })
export class ProjectEntity extends AbstractEntity {
  @StringField()
  @Column()
  name: string;

  @EnumField(() => StatusEnum, { default: StatusEnum.ACTIVE })
  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: StatusEnum;

  @StringFieldOptional()
  @Column({ nullable: true })
  avatar?: string;

  @StringFieldOptional()
  @Column({ type: String, nullable: true })
  description?: string;

  @ManyToMany(() => UserEntity, (user) => user.projects, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => UserEntity, isArray: true })
  members: UserEntity[];

  @OneToMany(() => ProjectPermissionEntity, (per) => per.project, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => ProjectPermissionEntity, isArray: true })
  permissions: ProjectPermissionEntity[];

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity)
  owner: UserEntity;

  @OneToMany(() => BoardEntity, (board) => board.project, { onDelete: 'CASCADE' })
  @JoinTable()
  @ApiProperty({ type: () => BoardEntity, isArray: true })
  boards: BoardEntity[];

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'pj');
  }
}
