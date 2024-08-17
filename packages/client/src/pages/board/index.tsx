import { DragDropContext, DropResult, Droppable, DroppableProvided } from '@hello-pangea/dnd';

import { Column } from './components';
import { reorder, reorderTasks } from './utils';
import AddColumn from './components/AddColumn';
import { useRedux } from '~/hooks';
import { setTaskLists } from '~/redux/board/slice';

const Board = () => {
  const { dispatch, appSelector } = useRedux();
  const { taskLists } = appSelector((state) => state.Board);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    if (result.type === 'COLUMN') {
      dispatch(setTaskLists(reorder(taskLists, source.index, destination.index)));
      return;
    }
    dispatch(setTaskLists(reorderTasks(taskLists, source, destination)));
  };

  return (
    <div className='board__container'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='board' type='COLUMN' direction='horizontal'>
          {(provided: DroppableProvided) => (
            <ol className='board__content' ref={provided.innerRef} {...provided.droppableProps}>
              {taskLists.map((taskList) => (
                <Column key={taskList.id} index={taskList.order} taskList={taskList} />
              ))}
              {provided.placeholder}
              <AddColumn />
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
