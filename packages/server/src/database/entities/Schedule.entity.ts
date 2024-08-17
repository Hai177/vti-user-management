import { Entity, ManyToOne, BeforeInsert, ManyToMany, JoinTable, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { EntityHelper } from 'src/common/entities';
import { generateEntityId } from 'src/common/utils';
import { UserEntity } from './User.entity';
import { BooleanField, DateField, StringField, StringFieldOptional } from '~/decorators';

@Entity()
export class ScheduleEntity extends EntityHelper {
  @ApiProperty({ type: () => UserEntity, isArray: true })
  @ManyToMany(() => UserEntity)
  @JoinTable()
  members: UserEntity[];

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;

  @StringField()
  @Column()
  title: string;

  @StringFieldOptional()
  @Column({ type: String, nullable: true })
  description?: string;

  @StringField()
  @Column()
  category: string;

  @DateField()
  @Column({ name: 'start_date', type: 'timestamptz' })
  startDate: Date;

  @DateField()
  @Column({ name: 'end_date', type: 'timestamptz' })
  endDate: Date;

  @BooleanField()
  @Column({ type: 'boolean', name: 'is_all_day', default: false })
  isAllDay: boolean;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'sch');
  }
}
