import { object, string } from 'yup';

export const taskSchema = object({
  name: string().required('Name is required'),
  description: string(),
});

export type TaskSchemaType = {
  name: string;
  description?: string;
};
