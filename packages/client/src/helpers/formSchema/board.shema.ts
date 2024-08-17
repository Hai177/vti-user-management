import { object, string } from 'yup';

import { Option } from '~/types';

export const boardSchema = object().shape({
  name: string().required('Name is required'),
  description: string().optional(),
  projectOption: object()
    .shape({
      label: string().required(),
      value: string().required(),
    })
    .optional(),
});

export type BoardSchemaType = {
  name: string;
  description?: string;
  projectOption?: Option;
};
