import { DateField, StringField } from '~/decorators';

export class AbstractDto {
  @StringField()
  id!: string;

  @DateField()
  createdAt!: Date;

  @DateField()
  updatedAt!: Date;

  @DateField()
  deletedAt: Date;
}
