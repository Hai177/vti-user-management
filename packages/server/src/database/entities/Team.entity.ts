import { BeforeInsert, Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractEntity } from '~/common/entities';
import { StatusEnum } from '~/common/enums';
import { generateEntityId } from '~/common/utils';
import { UserEntity } from './User.entity';
import { EnumField, StringField, StringFieldOptional } from '~/decorators';

@Entity({ name: 'team' })
export class TeamEntity extends AbstractEntity {
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

  @OneToMany(() => UserEntity, (user) => user.team, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @ApiProperty({ type: () => UserEntity, isArray: true })
  members: UserEntity[];

  @OneToOne(() => UserEntity)
  @ApiProperty({ type: () => UserEntity })
  owner: UserEntity;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'te');
  }
}
