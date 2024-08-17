import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { ModalProps } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TaskSchemaType, taskSchema } from '~/helpers';
import { useToast } from '~/hooks';
import { ITask, useCreateTaskMutation, useUpdateTaskMutation } from '~/redux/admin/task';

interface TaskModalProps extends ModalProps {
  type: 'create' | 'edit' | 'delete';
  task?: ITask;
}
const TaskModal = ({ type, task, ...props }: TaskModalProps) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TaskSchemaType>({
    resolver: yupResolver<TaskSchemaType>(taskSchema),
    values:
      type === 'edit'
        ? {
            name: task?.name ?? '',
            description: task?.description ?? '',
          }
        : {
            name: '',
            description: '',
          },
  });
  const [createTask, { isLoading: isCreating, isSuccess: isCreatedSuccess }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = useUpdateTaskMutation();
  const isLoading = isCreating || isUpdating;
  useEffect(() => {
    if (isCreatedSuccess) {
      reset();
      props.onHide?.();
      toast('Create task successfully');
    }
  }, [isCreatedSuccess]);
  useEffect(() => {
    if (isUpdateSuccess) {
      reset();
      props.onHide?.();
      toast('Update task successfully');
    }
  }, [isUpdateSuccess]);
  const onSubmit: SubmitHandler<TaskSchemaType> = (data) => {
    if (type === 'create') {
      console.log(data);
      createTask(data);
    }
    if (task && type === 'edit') {
      console.log({ ...task, ...data });
      updateTask({ ...task, ...data });
    }
  };
  return (
    <Modal {...props} show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{type === 'create' ? 'Create new task' : 'Edit this task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} id='task-form'>
          <Form.Group className='mb-3'>
            <Form.Label>Task Name</Form.Label>
            <Form.Control type='text' placeholder='Task 1' autoFocus {...register('name')} />
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>
          Close
        </Button>
        <Button variant='primary' type='submit' form='task-form' disabled={isLoading || !isDirty}>
          {type === 'create' ? 'Create' : 'Update '}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
