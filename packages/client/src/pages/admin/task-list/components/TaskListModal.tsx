import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Button, Form, Modal, ModalProps } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { TaskListSchemaType, tasklistSchema } from '~/helpers/formSchema';
import { useToast } from '~/hooks';
import { useCreateTaskListMutation, useUpdateTaskListMutation } from '~/redux/admin/task-list';

interface TaskListModalProps extends ModalProps {
  type: 'create' | 'edit' | 'delete';
}

const TaskListModal = ({ tasklist, type, ...props }: TaskListModalProps) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TaskListSchemaType>({
    resolver: yupResolver<TaskListSchemaType>(tasklistSchema),
    values:
      type === 'edit'
        ? {
            name: tasklist?.name ?? '',
            description: tasklist?.description ?? '',
          }
        : {
            name: '',
            description: '',
          },
  });

  const [createTaskList, { isLoading: isCreating, isSuccess: isCreatedSuccess }] = useCreateTaskListMutation();
  const [updateTaskList, { isLoading: isUpdating, isSuccess: isEditedSuccess }] = useUpdateTaskListMutation();

  const isLoading = isCreating || isUpdating;

  const title = type === 'create' ? 'Create new task list' : 'Edit task list';
  const submitBtnLabel = type === 'create' ? 'Create' : 'Save';

  const onSubmit: SubmitHandler<TaskListSchemaType> = (data) => {
    if (type === 'create') {
      createTaskList({ ...data });
    }
    if (tasklist && type === 'edit') {
      updateTaskList({ ...tasklist, ...data });
    }
  };

  useEffect(() => {
    if (isCreatedSuccess) {
      reset();
      props.onHide?.();
      if (type === 'create') {
        toast('Create taskList successfully');
      }
    }
  }, [isCreatedSuccess]);

  useEffect(() => {
    if (isEditedSuccess) {
      reset();
      props.onHide?.();

      if (type === 'edit') {
        toast('Update project successfully');
      }
    }
  }, [isEditedSuccess]);
  return (
    <div>
      <Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} id='tasklist-form'>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.onHide}>
            Close
          </Button>
          <Button variant='primary' type='submit' form='tasklist-form' disabled={isLoading || !isDirty}>
            {submitBtnLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { TaskListModal };
