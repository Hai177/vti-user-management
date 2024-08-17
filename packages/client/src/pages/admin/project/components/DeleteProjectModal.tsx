import { useEffect } from 'react';
import { Button, Modal, ModalProps, Row } from 'react-bootstrap';

import { useToast } from '~/hooks';
import { useDeleteProjectMutation, useGetProjectsQuery } from '~/redux/admin/project';

interface DeleteProjectModalProps extends ModalProps {
  id?: string;
}

const DeleteProjectModal = ({ id, ...props }: DeleteProjectModalProps) => {
  const toast = useToast();

  const [deleteProject, { isLoading, isSuccess }] = useDeleteProjectMutation();
  const { project } = useGetProjectsQuery(
    {},
    {
      selectFromResult: ({ data }) => ({
        project: data?.data.find((p) => p.id === id),
      }),
    }
  );

  const onDelete = () => {
    if (id) {
      deleteProject(id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      props.onHide?.();
      toast('Delete project successfully');
    }
  }, [isSuccess]);

  return (
    <Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Delete project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='text-center mb-4'>
          <i className='fa-regular fa-triangle-exclamation fs-1 text-warning'></i>
        </Row>
        <Row>
          <p className='fs-4'>
            Are you sure? Delete project <b>{project?.name}</b>
          </p>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>
          Close
        </Button>
        <Button form='project-form' variant='danger' onClick={onDelete} disabled={isLoading}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { DeleteProjectModal };
