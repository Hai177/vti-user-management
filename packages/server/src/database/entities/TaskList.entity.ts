import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractEntity } from '~/common/entities';
import { StatusEnum } from '~/common/enums';
import { generateEntityId } from '~/common/utils';
import { EnumField, NumberField, StringField, StringFieldOptional } from '~/decorators';
import { BoardEntity } from './Board.entity';
import { TaskEntity } from './Task.entity';

@Entity({ name: 'task-list' })
export class TaskListEntity extends AbstractEntity {
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
  @Column({ type: String, nullable: true })
  description?: string;

  @NumberField()
  @Column({ type: 'numeric', default: 0 })
  order: number;

  @ManyToOne(() => BoardEntity, (board) => board.taskList)
  @ApiProperty({ type: () => BoardEntity })
  board: BoardEntity;

  @OneToMany(() => TaskEntity, (task) => task.taskList)
  @ApiProperty({ type: () => TaskEntity, isArray: true })
  tasks: TaskEntity[];

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'tl');
  }
}
