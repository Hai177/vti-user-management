import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BoardType, ITaskList } from './types';
import { StatusEnum } from '~/types';

// Define the initial state using that type
const initialState: BoardType = {
  taskLists: [
    {
      id: '1',
      name: 'TaskList',
      status: StatusEnum.ACTIVE,
      order: 0,
      tasks: [
        {
          id: '11',
          name: 'Task 11',
          status: StatusEnum.ACTIVE,
          createAt: new Date(),
          updateAt: new Date(),
          order: 1,
        },
        {
          id: '12',
          name: 'Task 12',
          status: StatusEnum.ACTIVE,
          createAt: new Date(),
          updateAt: new Date(),
          order: 2,
        },
        {
          id: '13',
          name: 'Task 13',
          status: StatusEnum.ACTIVE,
          createAt: new Date(),
          updateAt: new Date(),
          order: 3,
        },
        {
          id: '14',
          name: 'Task 14',
          status: StatusEnum.ACTIVE,
          createAt: new Date(),
          updateAt: new Date(),
          order: 4,
        },
        {
          id: '15',
          name: 'Task 15',
          status: StatusEnum.ACTIVE,
          createAt: new Date(),
          updateAt: new Date(),
          order: 5,
        },
        {
          id: '16',
          name: 'Task 16',
          status: StatusEnum.ACTIVE,
          createAt: new Date(),
          updateAt: new Date(),
          order: 6,
        },
      ],
      createAt: new Date(),
      updateAt: new Date(),
    },
    {
      id: '2',
      name: 'TaskList222',
      status: StatusEnum.ACTIVE,
      order: 1,
      tasks: [
        {
          id: '21',
          name: 'Task 21',
          status: StatusEnum.ACTIVE,
          createAt: new Date(),
          updateAt: new Date(),
          order: 0,
        },
      ],
      createAt: new Date(),
      updateAt: new Date(),
    },
  ],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addTaskList: (state, action: PayloadAction<ITaskList>) => {
      state.taskLists = [...state.taskLists, action.payload];
    },
    setTaskLists: (state, action: PayloadAction<ITaskList[]>) => {
      state.taskLists = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { addTaskList, setTaskLists } = boardSlice.actions;

export default boardSlice.reducer;
