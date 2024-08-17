import clsx from 'clsx';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { useToggle } from '~/hooks';

interface AddNewActionProps {
  label: string;
  className?: string;
  onSubmit: (data: { name: string }) => void;
}

const AddNewAction = ({ label, className, onSubmit }: AddNewActionProps) => {
  const [isOpen, , show, hide] = useToggle();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<{ name: string }>({ defaultValues: { name: '' } });

  const onCancel = () => {
    hide();
    reset();
  };

  return (
    <>
      {!isOpen && (
        <Button variant='light' className={clsx('column__actions--add', className)} onClick={show}>
          <i className='fa-regular fa-plus'></i>
          {label}
        </Button>
      )}
      {isOpen && (
        <Form className='d-flex flex-column w-100' onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-2' controlId='formBasicEmail'>
            <Form.Control type='text' placeholder='Name' {...register('name')} />
          </Form.Group>
          <Form.Group className='d-flex gap-2'>
            <Button
              variant='primary'
              type='submit'
              size='sm'
              disabled={!isDirty}
              className='d-flex gap-1 justify-content-center align-items-center'>
              <i className='fa-regular fa-plus'></i>Add
            </Button>
            <Button variant='light' onClick={onCancel} size='sm'>
              <i className='fa-regular fa-xmark'></i>
            </Button>
          </Form.Group>
        </Form>
      )}
    </>
  );
};

export default AddNewAction;
