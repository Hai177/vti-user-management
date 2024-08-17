import { useEffect } from 'react';
import { Modal, ModalProps } from 'react-bootstrap';
import { isEmpty } from 'lodash';

import { BoardSchemaType } from '~/helpers/formSchema';
import { useToast } from '~/hooks';
import { useCreateBoardMutation, useUpdateBoardMutation } from '~/redux/admin/board/api';
import { IBoard } from '~/redux/admin/board';
import BoardForm from './BoardForm';
import { convertProjectToOption } from '~/utils';

interface BoardModalProps extends ModalProps {
  tab?: string;
  board?: IBoard;
}

const BoardModal = ({ tab, board, ...props }: BoardModalProps) => {
  const toast = useToast();
  const [createBoard, { isLoading: isCreating, isSuccess: isCreatedSuccess }] = useCreateBoardMutation();
  const [updateBoard, { isLoading: isUpdating, isSuccess: isEditedSuccess }] = useUpdateBoardMutation();

  const isLoading = isCreating || isUpdating;

  const title = tab === 'create' ? 'Create new board' : 'Edit board';

  const onSubmit = (data: BoardSchemaType) => {
    if (tab === 'create') {
      createBoard({ ...data, projectId: data.projectOption?.value });
    }
    if (board && tab === 'edit') {
      updateBoard({ ...board, ...data, projectId: data.projectOption?.value });
    }
  };

  useEffect(() => {
    if (isCreatedSuccess) {
      props.onHide?.();
      if (tab === 'create') {
        toast('Create board successfully');
      }
    }
  }, [isCreatedSuccess]);

  useEffect(() => {
    if (isEditedSuccess) {
      props.onHide?.();

      if (tab === 'edit') {
        toast('Update board successfully');
      }
    }
  }, [isEditedSuccess]);
  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tab === 'create' && (
          <BoardForm onSubmit={onSubmit} type='create' onClose={props.onHide} isLoading={isLoading} />
        )}
        {tab === 'edit' && !isEmpty(board) && (
          <BoardForm
            onSubmit={onSubmit}
            type='edit'
            onClose={props.onHide}
            data={{
              ...board,
              projectOption: convertProjectToOption(board.project),
            }}
            isLoading={isLoading}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};
export { BoardModal };
