import { Card, CardTitle, ListGroup, ModalProps } from 'react-bootstrap';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import userImg from '~/assets/images/avatar-1.jpg';
import { InfoRow } from './InfoRow';

const ProfileModal = ({ ...props }: ModalProps) => {
  const [editable, setEditable] = useState(false);
  const handleAllowEdit = () => {
    setEditable(true);
  };
  const handlePreventEdit = () => {
    setEditable(false);
  };
  return (
    <>
      <Modal {...props} size='lg' className='p-3 ' aria-labelledby='example-custom-modal-styling-title'>
        <Modal.Body className='d-flex justify-content-between postion-relative'>
          <Card style={{ width: '22rem' }}>
            <Card.Img variant='top' src={userImg} />
            <ListGroup variant='flush' className='fs-5'>
              <ListGroup.Item className='d-flex justify-content-between align-items-center'>
                <i className='fa-brands fa-facebook'></i>
                <Card.Link href='https://www.facebook.com/'>https://www.facebook.com/</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item className='d-flex justify-content-between align-items-center'>
                <i className='fa-brands fa-github'></i>
                <Card.Link href='https://www.github.com/'>https://www.github.com/</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item className='d-flex justify-content-between align-items-center'>
                <i className='fa-brands fa-twitter'></i>
                <Card.Link href='https://www.instagram.com/'>https://www.instagram.com/</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item className='d-flex justify-content-between align-items-center'>
                <i className='fa-brands fa-instagram'></i>
                <Card.Link href='https://www.twitter.com/'>https://www.twitter.com/</Card.Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Card style={{ width: '38rem', padding: '1rem', fontSize: '1.25rem', gap: '1rem', paddingTop: '3rem' }}>
            <CardTitle className='border-bottom py-2 fs-4'>INFORMATION</CardTitle>
            <InfoRow title='Full Name' defaultValue='Le Duc Tinh' editable={editable} />
            <InfoRow title='Position' defaultValue='Tech Lead' editable={editable} />
            <InfoRow title='Email' defaultValue='tinhle@123.com' editable={editable} />
            <InfoRow title='Phone Number' defaultValue='0905999888' editable={editable} />
            <InfoRow title='Address' defaultValue='Da Nang City' editable={editable} />
            <InfoRow
              title='Project '
              isTextArea={true}
              defaultValue='Managemanent, Ecommerce, Booking Travel Hotel, Todolist, ChatApp '
              editable={false}
            />
          </Card>
          <Button
            variant='light'
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', backgroundColor: 'transparent' }}
            onClick={handleAllowEdit}>
            <span>Edit </span>
            <i className='fa-regular fa-pen-to-square'></i>
          </Button>
          {editable && (
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                right: '1.5rem',
                backgroundColor: 'transparent',
                display: 'flex',
                gap: '1rem',
              }}>
              <Button onClick={handlePreventEdit} variant='secondary'>
                Cancel
              </Button>
              <Button onClick={handlePreventEdit}>Save</Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ProfileModal;
