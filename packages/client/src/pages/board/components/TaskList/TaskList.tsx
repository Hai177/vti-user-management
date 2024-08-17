import { Droppable } from '@hello-pangea/dnd';
import type { DroppableProvided, DroppableStateSnapshot } from '@hello-pangea/dnd';
import clsx from 'clsx';

import { ITaskList } from '~/redux/board';
import InnerTaskList from './InnerTaskList';

interface TaskListProps {
  taskList: ITaskList;
}

const TaskList = ({ taskList }: TaskListProps) => {
  return (
    <Droppable droppableId={taskList.id}>
      {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
        <div
          className={clsx(
            'task-list',
            dropSnapshot.draggingFromThisWith && 'task-list--dragging-from',
            dropSnapshot.isDraggingOver && 'task-list--dragging-over'
          )}
          {...dropProvided.droppableProps}>
          <ol className='task-list__list' ref={dropProvided.innerRef}>
            <InnerTaskList tasks={taskList.tasks} />
            {dropProvided.placeholder}
          </ol>
        </div>
      )}
    </Droppable>
  );
};

export { TaskList };
