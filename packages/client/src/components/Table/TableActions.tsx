import { Button } from 'react-bootstrap';

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const TableActions = ({ onEdit, onDelete }: TableActionsProps) => {
  return (
    <div className='d-flex gap-2'>
      <Button variant='warning' onClick={onEdit}>
        Edit
      </Button>
      <Button variant='danger' onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
};

export { TableActions };
