import { DraggableProvided } from '@hello-pangea/dnd';

import { ITask } from '~/redux/board';

interface TaskProps {
  task: ITask;
  isDragging: boolean;
  provided: DraggableProvided;
  index?: number;
}

const Task = ({ task, isDragging, provided, index }: TaskProps) => {
  return (
    <li
      className='task'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      data-is-dragging={isDragging}
      data-testid={task.id}
      data-index={index}
      aria-label={`${task.name} quote`}>
      <div className='d-flex flex-column flex-grow-1 col-12'>{task.name}</div>
    </li>
  );
};

export { Task };
