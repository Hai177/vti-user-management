import { object, string } from 'yup';

export const loginSchema = object({
  username: string().required('Username is required'),
  password: string().min(5, 'Minimum is 5 characters').required('Username is required'),
});

export type LoginSchemaType = {
  username: string;
  password: string;
};
