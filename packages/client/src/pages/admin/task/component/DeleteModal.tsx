import { useEffect } from 'react';
import { Button, Modal, ModalProps, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteTaskMutation, useGetTasksQuery } from '~/redux/admin/task/api';

const DeleteTaskModal = (props: ModalProps) => {
  const [deleteTask, { isLoading, isSuccess }] = useDeleteTaskMutation();
  const { id } = useParams();
  const onDelete = () => {
    id && deleteTask(id);
  };
  const { task } = useGetTasksQuery(
    {},
    {
      selectFromResult: ({ data }) => ({
        task: data?.data.find((p) => p.id === id),
      }),
    }
  );
  useEffect(() => {
    if (isSuccess) {
      props.onHide?.();
      toast('Delete task successfully');
    }
  }, [isSuccess]);
  return (
    <Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Delete task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='text-center mb-4'>
          <i className='fa-regular fa-triangle-exclamation fs-1 text-warning'></i>
        </Row>
        <Row>
          <p className='fs-4'>
            Are you sure? Delete task <b>{task?.name}</b>
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
export default DeleteTaskModal;
