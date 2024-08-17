import { Button, Modal, ModalProps, Row } from 'react-bootstrap';

import { ICalendar } from '~/redux/calendar';

interface DeleteCalendarModalProps extends ModalProps {
  calendar?: ICalendar;
  isLoading?: boolean;
  onDelete: () => void;
}

const DeleteCalendarModal = ({ calendar, isLoading, onDelete, ...props }: DeleteCalendarModalProps) => {
  return (
    <Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Delete calendar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='text-center mb-4'>
          <i className='fa-regular fa-triangle-exclamation fs-1 text-warning'></i>
        </Row>
        <Row>
          <p className='fs-4'>
            Are you sure? Delete project <b>{calendar?.title}</b>
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

export default DeleteCalendarModal;
