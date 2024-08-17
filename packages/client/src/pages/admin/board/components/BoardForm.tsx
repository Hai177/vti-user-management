import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';

import { BoardSchemaType, boardSchema } from '~/helpers';
import { ProjectAutocomplete } from '~/components';

type BoardFormConditionProps =
  | {
      type: 'create';
      data?: never;
    }
  | {
      type: 'edit';
      data: BoardSchemaType;
    };

interface BoardFormProps {
  onSubmit: (data: BoardSchemaType) => void;
  onClose?: () => void;
  isLoading?: boolean;
}

const BoardForm = ({ type, data, isLoading = false, onSubmit, onClose }: BoardFormProps & BoardFormConditionProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BoardSchemaType>({
    resolver: yupResolver(boardSchema),
    values: data,
    mode: 'onChange',
  });

  const submitBtnLabel = type === 'create' ? 'Create' : 'Save';

  return (
    <Form onSubmit={handleSubmit(onSubmit)} id='board-form'>
      <Form.Group className='mb-3'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' {...register('name')} />
        {errors.name?.message && (
          <Form.Control.Feedback type='invalid' className='d-block'>
            {errors.name?.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Description</Form.Label>
        <Form.Control as='textarea' rows={3} {...register('description')} />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Project</Form.Label>
        <Controller
          control={control}
          name='projectOption'
          render={({ field: { onChange, onBlur, value } }) => (
            <ProjectAutocomplete<false> isMulti={false} onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </Form.Group>
      <Form.Group className='mb-3 d-flex justify-content-end gap-2'>
        <Button type='submit' form='board-form' variant='primary' disabled={isLoading || !isValid}>
          {submitBtnLabel}
        </Button>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
      </Form.Group>
    </Form>
  );
};

export default BoardForm;
