import { Button, Container, Navbar, Offcanvas, Stack } from 'react-bootstrap';

import ProfileDropdown from './ProfileDropdown';
import { useState } from 'react';

const Header = () => {
  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  return (
    <Navbar bg='light' sticky='top' className='top-0 shadow-sm p-0 nav-header'>
      <Container fluid className='d-flex'>
        <Stack direction='horizontal' className='ms-auto me-2'>
          <Button variant='light' size='lg' onClick={onOpen}>
            <i className='fa-light fa-gear'></i>
          </Button>
          <Offcanvas show={show} onHide={onClose} placement='end'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Settings</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images,
              lists, etc.
            </Offcanvas.Body>
          </Offcanvas>
        </Stack>
        <ProfileDropdown />
      </Container>
    </Navbar>
  );
};

export default Header;
