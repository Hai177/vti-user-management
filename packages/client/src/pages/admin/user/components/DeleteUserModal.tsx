import { Button, Modal, ModalProps, Row } from 'react-bootstrap';

interface DeleteUserModalProps extends ModalProps {
  username?: string;
  isLoading?: boolean;
  onClickDelete?: () => void;
}

const DeleteUserModal = ({ username, isLoading, onClickDelete, ...props }: DeleteUserModalProps) => {
  return (
    <Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='text-center mb-4'>
          <i className='fa-regular fa-triangle-exclamation fs-1 text-warning'></i>
        </Row>
        <Row>
          <p className='fs-4'>
            Are you sure? Delete user <b>{username}</b>
          </p>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>
          Close
        </Button>
        <Button form='user-form' variant='danger' onClick={onClickDelete} disabled={isLoading}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { DeleteUserModal };
