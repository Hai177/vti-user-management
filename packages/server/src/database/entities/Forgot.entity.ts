import { Column, Entity, Index, ManyToOne, BeforeInsert } from 'typeorm';
import { Allow } from 'class-validator';

import { EntityHelper } from 'src/common/entities';
import { UserEntity } from './User.entity';
import { generateEntityId } from 'src/common/utils';

@Entity()
export class ForgotEntity extends EntityHelper {
  @Allow()
  @Column()
  @Index()
  hash: string;

  @Allow()
  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  user: UserEntity;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'fg');
  }
}
