import { Draggable } from '@hello-pangea/dnd';
import type { DraggableProvided } from '@hello-pangea/dnd';

import { TaskList } from '../TaskList';
import { ITaskList } from '~/redux/board';
import AddNewAction from '../AddNewAction';

interface ColumnProps {
  index: number;
  taskList: ITaskList;
}

const Column = ({ taskList, index }: ColumnProps) => {
  const onSubmit = () => {};
  return (
    <Draggable draggableId={taskList.id} index={index}>
      {(provided: DraggableProvided) => (
        <li ref={provided.innerRef} {...provided.draggableProps} className='column__container'>
          <div className='column__content'>
            <div className='column__header border-bottom'>
              <div
                className='column__header--title'
                {...provided.dragHandleProps}
                aria-label={`${taskList.name} quote list`}>
                {taskList.name}
              </div>
            </div>
            <TaskList taskList={taskList} />
            <div className='column__actions border-top'>
              <AddNewAction label='Add a task' onSubmit={onSubmit} />
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export { Column };
