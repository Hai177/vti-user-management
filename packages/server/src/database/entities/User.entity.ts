import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractEntity } from '~/common/entities';
import { RoleEnum, StatusEnum } from '~/common/enums';
import { generateEntityId } from '~/common/utils';
import { ProjectEntity } from './Project.entity';
import { TeamEntity } from './Team.entity';
import { EnumField, StringField, StringFieldOptional } from '~/decorators';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {
  @StringField()
  @Column()
  username: string;

  @StringFieldOptional()
  @Column({ nullable: true })
  name?: string;

  @EnumField(() => RoleEnum, { each: true })
  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: [RoleEnum.ANONYMOUS],
    array: true,
  })
  roles: RoleEnum[];

  @EnumField(() => StatusEnum, { default: StatusEnum.ACTIVE })
  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: StatusEnum;

  @StringFieldOptional()
  @Column({ unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email?: string;

  @StringField()
  @Column({ select: false })
  password: string;

  @StringFieldOptional()
  @Column({ nullable: true })
  phone?: string;

  @StringFieldOptional()
  @Column({ nullable: true })
  avatar?: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @StringFieldOptional()
  @Index()
  @Column({ type: String, nullable: true, name: 'first_name' })
  firstName?: string;

  @StringFieldOptional()
  @Index()
  @Column({ type: String, nullable: true, name: 'last_name' })
  lastName?: string;

  @ManyToMany(() => ProjectEntity, (project) => project.members, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => ProjectEntity, isArray: true })
  @JoinTable()
  projects: ProjectEntity[];

  @ManyToOne(() => TeamEntity, (team) => team.members)
  @ApiProperty({ type: () => TeamEntity, nullable: true })
  team?: TeamEntity;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'usr');
  }

  @BeforeInsert()
  @BeforeUpdate()
  updateName() {
    this.name = [this.firstName, this.lastName].filter(Boolean).join(' ');
  }
}
