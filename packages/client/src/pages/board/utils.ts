import { DraggableLocation } from '@hello-pangea/dnd';
import { ITask, ITaskList } from '~/redux/board';

const sortByOrder = <T extends { order: number }>(list: T[]) => list.sort((a, b) => a.order - b.order);

export const reorder = <T extends { order: number }>(list: T[], startIndex: number, endIndex: number) => {
  const newList = list.map((item) => {
    if (item.order === startIndex) {
      return { ...item, order: endIndex };
    }

    if (item.order === endIndex) {
      return { ...item, order: startIndex };
    }

    return item;
  });

  return sortByOrder(newList);
};

const addTaskWithOrder = (list: ITask[], item: ITask, order: number) => {
  const newItem = { ...item, order };
  const _list = Array.from(list);

  let indexToInsert = list.findIndex((item) => item.order === order);
  if (indexToInsert === -1) {
    // If no item has a greater order, insert at the end
    indexToInsert = list.length;
  }

  _list.splice(indexToInsert, 0, newItem);

  return _list.map((r, i) => {
    return { ...r, order: i };
  });
};

export const reorderTasks = (list: ITaskList[], source: DraggableLocation, destination: DraggableLocation) => {
  const current = list.find((item) => item.id === source.droppableId);
  const next = list.find((item) => item.id === destination.droppableId);
  if (!current || !next) {
    return list;
  }

  const listCurrent = current.tasks;
  const target = listCurrent.find((task) => task.order === source.index);

  if (!target) {
    return list;
  }

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(listCurrent, source.index, destination.index);
    return list.map((item) => {
      if (item.id === current.id) {
        return { ...item, tasks: reordered };
      }

      return item;
    });
  }

  // moving to different list
  const newListCurrent = listCurrent
    .filter((task) => task.order !== source.index)
    .map((task, index) => ({ ...task, order: index }));

  const newNextList = addTaskWithOrder(next.tasks, target, destination.index);

  return list.map((item) => {
    if (item.id === current.id) {
      return { ...item, tasks: newListCurrent };
    }

    if (item.id === next.id) {
      return { ...item, tasks: newNextList };
    }

    return item;
  });
};
