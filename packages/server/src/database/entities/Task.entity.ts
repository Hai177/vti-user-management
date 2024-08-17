import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractEntity } from '~/common/entities';
import { StatusEnum } from '~/common/enums';
import { generateEntityId } from '~/common/utils';
import { EnumField, NumberField, StringField, StringFieldOptional } from '~/decorators';
import { TaskListEntity } from './TaskList.entity';
import { UserEntity } from './User.entity';

@Entity({ name: 'task' })
export class TaskEntity extends AbstractEntity {
  @StringField()
  @Column()
  name: string;

  @NumberField()
  @Column({ type: 'numeric', default: 0 })
  order: number;

  @EnumField(() => StatusEnum, { default: StatusEnum.ACTIVE })
  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: StatusEnum;

  @StringFieldOptional()
  @Column({ type: String, nullable: true })
  description?: string;

  @ManyToOne(() => TaskListEntity, (taskList) => taskList.tasks)
  @ApiProperty({ type: () => TaskListEntity })
  taskList: TaskListEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  members: UserEntity[];

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'ta');
  }
}
