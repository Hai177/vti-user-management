import { string, object, mixed, array } from 'yup';

import { RoleEnum } from '~/redux/admin/user';
import { Option } from '~/types';

export const updateUserSchema = object().shape({
  username: string().required('Username is required'),
  email: string().email().optional(),
  firstName: string().optional(),
  lastName: string().optional(),
  password: string().optional(),
  roleOptions: array()
    .of(
      object().shape({
        label: string().required(),
        value: mixed<RoleEnum>().oneOf(Object.values(RoleEnum)).required(),
      })
    )
    .default([]),
  teamOption: object({
    label: string().required(),
    value: string().required(),
  }).optional(),
  projectOptions: array()
    .of(
      object().shape({
        label: string().required(),
        value: string().required(),
      })
    )
    .default([]),
});

export const userSchema = updateUserSchema.shape({
  password: string().min(6).required('Password is required'),
});

export type UserSchemaType = {
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  teamOption?: Option;
  roleOptions?: Option<RoleEnum>[];
  projectOptions?: Option[];
};
