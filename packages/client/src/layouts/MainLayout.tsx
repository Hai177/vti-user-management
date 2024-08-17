import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import withAuth from '~/HOCs/withAuth';

const BaseMainLayout = () => {
  return (
    <main className='vh-100 vw-100 wrapper'>
      <Sidebar />
      <div className='content-page'>
        <Header />
        <Container fluid className='content container-page'>
          <Outlet />
        </Container>
      </div>
    </main>
  );
};

const MainLayout = withAuth(BaseMainLayout);

export { MainLayout };
