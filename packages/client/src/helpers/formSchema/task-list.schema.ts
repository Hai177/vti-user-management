import { object, string } from 'yup';

export const tasklistSchema = object({
  name: string().required('Name is required'),
  description: string().optional(),
});

export type TaskListSchemaType = {
  name: string;
  description?: string;
};
