import { useEffect } from 'react';
import { Button, Modal, ModalProps, Row } from 'react-bootstrap';

import { useToast } from '~/hooks';
import { useDeleteTeamMutation } from '~/redux/admin/team';

interface DeleteModalProps extends ModalProps {
  id?: string;
  teamName?: string;
}

const DeleteModal = ({ id, teamName, ...props }: DeleteModalProps) => {
  const toast = useToast();
  const [deleteTeam, { isLoading, isSuccess }] = useDeleteTeamMutation();

  const onDelete = () => {
    id && deleteTeam(id);
  };

  useEffect(() => {
    if (isSuccess) {
      props.onHide?.();
      toast('Delete team successfully');
    }
  }, [isSuccess]);

  return (
    <Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Delete team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='text-center mb-4'>
          <i className='fa-regular fa-triangle-exclamation fs-1 text-warning'></i>
        </Row>
        <Row>
          <p className='fs-4'>
            Are you sure? Delete team <b>{teamName}</b>
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
export { DeleteModal };
