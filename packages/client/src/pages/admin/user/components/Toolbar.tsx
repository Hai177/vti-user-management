import { Button, Card, Form } from 'react-bootstrap';

interface UserToolbarProps {
  onClickNew?: () => void;
}

const Toolbar = ({ onClickNew }: UserToolbarProps) => {
  return (
    <Card className='mb-3 p-2 d-flex flex-row'>
      <Form className='d-flex gap-2'>
        <div>
          <Form.Control type='text' aria-describedby='search-user' placeholder='Enter the username or email' />
        </div>
        <Button type='submit' variant='primary'>
          Search
        </Button>
      </Form>
      <Button variant='primary' className='ms-auto' onClick={onClickNew}>
        Add new user
      </Button>
    </Card>
  );
};

export { Toolbar };
