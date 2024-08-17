import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoadComponent from './LoadComponent';
import { MainLayout } from '~/layouts';

const Home = React.lazy(() => import('~/pages/home'));
const Calendar = React.lazy(() => import('~/pages/calendar'));
const Board = React.lazy(() => import('~/pages/board'));
//Admin page
const AdminUser = React.lazy(() => import('~/pages/admin/user'));
const AdminProject = React.lazy(() => import('~/pages/admin/project'));
const AdminTaskList = React.lazy(() => import('~/pages/admin/task-list'));
const AdminTask = React.lazy(() => import('~/pages/admin/task'));
const AdminSchedule = React.lazy(() => import('~/pages/admin/schedule'));
const AdminTeam = React.lazy(() => import('~/pages/admin/team'));
const AdminBoard = React.lazy(() => import('~/pages/admin/board'));

//Auth page
const Login = React.lazy(() => import('~/pages/auth/login'));

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/login' element={<LoadComponent component={Login} />} />
        <Route path='/' element={<MainLayout />}>
          <Route index element={<LoadComponent component={Home} />} />
          <Route path='/home' element={<LoadComponent component={Home} />} />
          <Route path='/calendar' element={<LoadComponent component={Calendar} />} />
          <Route path='/board' element={<LoadComponent component={Board} />} />
          <Route path='/admin/user/:tab?/:id?' element={<LoadComponent component={AdminUser} />} />
          <Route path='/admin/project/:tab?/:id?' element={<LoadComponent component={AdminProject} />} />
          <Route path='/admin/task-list' element={<LoadComponent component={AdminTaskList} />} />
          <Route path='/admin/task/:id?' element={<LoadComponent component={AdminTask} />} />
          <Route path='/admin/schedule' element={<LoadComponent component={AdminSchedule} />} />
          <Route path='/admin/team/:tab?/:id?' element={<LoadComponent component={AdminTeam} />} />
          <Route path='/admin/board/:tab?/:id?' element={<LoadComponent component={AdminBoard} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
