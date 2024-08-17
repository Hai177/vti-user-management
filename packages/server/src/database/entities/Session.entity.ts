import { Entity, Index, ManyToOne, BeforeInsert } from 'typeorm';

import { EntityHelper } from 'src/common/entities';
import { generateEntityId } from 'src/common/utils';
import { UserEntity } from './User.entity';

@Entity()
export class SessionEntity extends EntityHelper {
  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @Index()
  user: UserEntity;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'ss');
  }
}
