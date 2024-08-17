import { instanceToPlain } from 'class-transformer';
import { AfterLoad } from 'typeorm';

import { AbstractEntity } from './AbstractEntity';

export class EntityHelper extends AbstractEntity {
  __entity?: string;

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
