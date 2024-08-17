import { useEffect } from 'react';
import { Button, Form, Modal, ModalProps } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { projectSchema, ProjectSchemaType } from '~/helpers';
import { IProject, useCreateProjectMutation, useUpdateProjectMutation } from '~/redux/admin/project';
import { useToast } from '~/hooks';
import { UserAutocomplete } from '~/components';
import { convertUsersToOptions, optionsToValues } from '~/utils';

interface ProjectModalProps extends ModalProps {
  tab?: string;
  project?: IProject;
}

const ProjectModal = ({ tab, project, ...props }: ProjectModalProps) => {
  const toast = useToast();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProjectSchemaType>({
    resolver: yupResolver<ProjectSchemaType>(projectSchema),
    values:
      tab === 'edit'
        ? {
            name: project?.name ?? '',
            description: project?.description ?? '',
            memberOptions: convertUsersToOptions(project?.members ?? []),
          }
        : {
            name: '',
            description: '',
            memberOptions: [],
          },
  });

  const [createProject, { isLoading: isCreating, isSuccess: isCreatedSuccess }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating, isSuccess: isEditedSuccess }] = useUpdateProjectMutation();

  const isLoading = isCreating || isUpdating;

  const title = tab === 'create' ? 'Create new project' : 'Edit project';
  const submitBtnLabel = tab === 'create' ? 'Create' : 'Save';

  const onSubmit: SubmitHandler<ProjectSchemaType> = (data) => {
    const newData = { ...data, memberIds: optionsToValues(data?.memberOptions) };
    if (tab === 'create') {
      createProject(newData);
    }
    if (project && tab === 'edit') {
      updateProject({ ...project, ...newData });
    }
  };

  useEffect(() => {
    if (isCreatedSuccess) {
      reset();
      props.onHide?.();
      if (tab === 'create') {
        toast('Create project successfully');
      }
    }
  }, [isCreatedSuccess]);

  useEffect(() => {
    if (isEditedSuccess) {
      reset();
      props.onHide?.();

      if (tab === 'edit') {
        toast('Update project successfully');
      }
    }
  }, [isEditedSuccess]);

  return (
    <Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} id='project-form'>
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
            <Form.Label>Members</Form.Label>
            <Controller
              control={control}
              name='memberOptions'
              render={({ field: { onChange, onBlur, value } }) => (
                <UserAutocomplete isMulti onChange={onChange} onBlur={onBlur} value={value} />
              )}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>
          Close
        </Button>
        <Button type='submit' form='project-form' variant='primary' disabled={isLoading || !isDirty}>
          {submitBtnLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ProjectModal };
