import { Button } from 'react-bootstrap';

interface ActionsProps {
  onClickEdit?: () => void;
  onClickDelete?: () => void;
}

const Actions = ({ onClickEdit, onClickDelete }: ActionsProps) => {
  return (
    <div className='d-flex gap-2'>
      <Button variant='warning' onClick={onClickEdit}>
        Edit
      </Button>
      <Button variant='danger' onClick={onClickDelete}>
        Delete
      </Button>
    </div>
  );
};

export { Actions };
