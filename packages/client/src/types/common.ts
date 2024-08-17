export interface IBase {
  id: string;
  createAt: Date;
  updateAt: Date;
}

export type Option<T extends string = string> = {
  label: string;
  value: T;
};

export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
