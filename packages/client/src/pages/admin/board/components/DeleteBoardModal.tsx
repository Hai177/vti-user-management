import { useEffect } from 'react';
import { Button, Modal, ModalProps, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useToast } from '~/hooks';
import { useDeleteBoardMutation, useGetBoardsQuery } from '~/redux/admin/board';

const DeleteBoardModal = (props: ModalProps) => {
  const toast = useToast();
  const { id } = useParams();

  const [deleteBoard, { isLoading, isSuccess }] = useDeleteBoardMutation();
  const { board } = useGetBoardsQuery(
    {},
    {
      selectFromResult: ({ data }) => ({
        board: data?.data.find((p) => p.id === id),
      }),
    }
  );

  const onDelete = () => {
    if (id) {
      deleteBoard(id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      props.onHide?.();
      toast('Delete board successfully');
    }
  }, [isSuccess]);

  return (
    <Modal {...props} size='sm' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Delete board</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='text-center mb-4'>
          <i className='fa-regular fa-triangle-exclamation fs-1 text-warning'></i>
        </Row>
        <Row>
          <p className='fs-4'>
            Are you sure? Delete board <b>{board?.name}</b>
          </p>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>
          Close
        </Button>
        <Button form='board-form' variant='danger' onClick={onDelete} disabled={isLoading}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { DeleteBoardModal };
