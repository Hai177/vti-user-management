import { v4 as uuidv4 } from 'uuid';

type SidebarItem = {
  label: string;
  url?: string;
  icon?: string;
  id: string;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Home',
    url: '/home',
    icon: 'fa-regular fa-house',
    id: uuidv4(),
  },

  {
    label: 'Calendar',
    url: '/calendar',
    icon: 'fa-regular fa-calendar',
    id: uuidv4(),
  },
  {
    label: 'ADMIN',
    id: uuidv4(),
  },
  {
    label: 'User',
    url: '/admin/user',
    icon: 'fa-regular fa-user',
    id: uuidv4(),
  },
  {
    label: 'Project',
    url: '/admin/project',
    icon: 'fa-regular fa-diagram-project',
    id: uuidv4(),
  },
  {
    label: 'Team',
    url: '/admin/team',
    icon: 'fa-regular fa-user-group',
    id: uuidv4(),
  },
  {
    label: 'Task List',
    url: '/admin/task-list',
    icon: 'fa-regular fa-list',
    id: uuidv4(),
  },
  {
    label: 'Task',
    url: '/admin/task',
    icon: 'fa-regular fa-list-check',
    id: uuidv4(),
  },
  {
    label: 'Board',
    url: '/admin/board',
    icon: 'fa-solid fa-chess-board',
    id: uuidv4(),
  },
];
