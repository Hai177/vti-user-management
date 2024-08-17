import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { ROLE_OPTIONS } from '~/appConstants';

import { ProjectAutocomplete, TeamAutocomplete } from '~/components';
import { UserSchemaType, userSchema, updateUserSchema } from '~/helpers';

type BoardFormConditionProps =
  | {
      type: 'create';
      data?: never;
    }
  | {
      type: 'edit';
      data: UserSchemaType;
    };

interface UserFormProps {
  isLoading?: boolean;
  error?: string;
  onSubmit: (data: UserSchemaType) => void;
  onClose?: () => void;
}

const UserForm = ({
  type,
  data,
  isLoading = false,
  error,
  onSubmit,
  onClose,
}: UserFormProps & BoardFormConditionProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserSchemaType>({
    resolver: yupResolver<UserSchemaType>(type === 'create' ? userSchema : updateUserSchema),
    defaultValues: data,
  });

  const submitBtnLabel = type === 'create' ? 'Create' : 'Save';

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Form.Group className='mb-3'>
          <Form.Control.Feedback type='invalid' className='d-block'>
            {error}
          </Form.Control.Feedback>
        </Form.Group>
      )}
      <Form.Group as={Row} className='mb-3'>
        <Col sm={6}>
          <Form.Label>First name</Form.Label>
          <Form.Control type='text' {...register('firstName')} />
        </Col>
        <Col sm={6}>
          <Form.Label>Last name</Form.Label>
          <Form.Control type='text' {...register('lastName')} />
        </Col>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' {...register('username')} />
      </Form.Group>
      {type === 'create' && (
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' {...register('password')} />
        </Form.Group>
      )}
      <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='text' {...register('email')} />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Roles</Form.Label>
        <Controller
          control={control}
          name='roleOptions'
          render={({ field: { onChange, onBlur, value } }) => (
            <Select isMulti options={ROLE_OPTIONS} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Team</Form.Label>
        <Controller
          control={control}
          name='teamOption'
          render={({ field: { onChange, onBlur, value } }) => (
            <TeamAutocomplete<false> onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Projects</Form.Label>
        <Controller
          control={control}
          name='projectOptions'
          render={({ field: { onChange, onBlur, value } }) => (
            <ProjectAutocomplete<true> isMulti onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </Form.Group>
      <Form.Group className='mb-3 d-flex justify-content-end gap-2'>
        <Button type='submit' variant='primary' disabled={isLoading || !isValid}>
          {submitBtnLabel}
        </Button>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
      </Form.Group>
    </Form>
  );
};

export default UserForm;
