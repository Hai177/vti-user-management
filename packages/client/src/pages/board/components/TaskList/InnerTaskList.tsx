import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { memo } from 'react';

import { ITask } from '~/redux/board';
import { Task } from '../Task';

interface InnerTaskListProps {
  tasks: ITask[];
}

const InnerTaskList = memo(({ tasks }: InnerTaskListProps) => {
  return tasks.map((task) => (
    <Draggable key={task.id} draggableId={task.id} index={task.order}>
      {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
        <Task key={task.id} task={task} isDragging={dragSnapshot.isDragging} provided={dragProvided} />
      )}
    </Draggable>
  ));
});

export default InnerTaskList;
