import React from 'react';
import { Button, Modal, ModalProps, Row } from 'react-bootstrap';

interface DeleteTaskListModalProps extends ModalProps {
  onDelete?: () => void;
  name?: string;
}

const DeleteTaskListModal = ({ onDelete, name, ...props }: DeleteTaskListModalProps) => {
  return (
    <Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Delete TaskList</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='text-center mb-4'>
          <i className='fa-regular fa-triangle-exclamation fs-1 text-warning'></i>
        </Row>
        <Row>
          <p className='fs-4'>
            Are you sure? Delete task list <b>{name}</b>
          </p>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>
          Close
        </Button>
        <Button form='project-form' variant='danger' onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { DeleteTaskListModal };
