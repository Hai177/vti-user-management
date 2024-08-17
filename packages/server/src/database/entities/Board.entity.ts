import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractEntity } from '~/common/entities';
import { StatusEnum } from '~/common/enums';
import { generateEntityId } from '~/common/utils';
import { UserEntity } from './User.entity';
import { EnumField, StringField, StringFieldOptional } from '~/decorators';
import { ProjectEntity } from './Project.entity';
import { TaskListEntity } from './TaskList.entity';

@Entity({ name: 'board' })
export class BoardEntity extends AbstractEntity {
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

  @OneToOne(() => UserEntity)
  @ApiProperty({ type: () => UserEntity })
  owner: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.boards, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  @ApiProperty({ type: () => ProjectEntity })
  project: ProjectEntity;

  @OneToMany(() => TaskListEntity, (taskList) => taskList.board)
  @ApiProperty({ type: () => TaskListEntity, isArray: true })
  taskList: TaskListEntity[];

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'bo');
  }
}
