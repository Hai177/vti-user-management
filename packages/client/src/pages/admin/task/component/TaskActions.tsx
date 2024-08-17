import { Button } from 'react-bootstrap';

interface TaskActionProps {
  handleEdit?: () => void;
  handleDelete?: () => void;
}
const TaskActions = ({ handleEdit, handleDelete }: TaskActionProps) => {
  return (
    <div className='d-flex gap-2'>
      <Button variant='warning' onClick={handleEdit}>
        Edit
      </Button>
      <Button variant='danger' onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};
export default TaskActions;
