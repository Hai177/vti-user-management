import { object, string, array } from 'yup';
import { Option } from '~/types';

export const projectSchema = object({
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

export type ProjectSchemaType = {
  name: string;
  description?: string;
  memberOptions?: Option[];
};
