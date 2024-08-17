import { array, object, string } from 'yup';
import { Option } from '~/types';

export const teamSchema = object({
  name: string().required('Name is required'),
  description: string(),
  memberOptions: array()
    .of(
      object().shape({
        label: string().required(),
        value: string().required(),
      })
    )
    .default([]),
});

export type TeamSchemaType = {
  name: string;
  description?: string;
  memberOptions?: Option[];
};
