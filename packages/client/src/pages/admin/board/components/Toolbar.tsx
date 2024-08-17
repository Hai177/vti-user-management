import { Button, Card, Form } from 'react-bootstrap';

interface ToolbarProps {
  onClickNew?: () => void;
}

const Toolbar = ({ onClickNew }: ToolbarProps) => {
  return (
    <Card className='mb-3 p-2 d-flex flex-row'>
      <Form className='d-flex gap-2'>
        <div>
          <Form.Control type='text' aria-describedby='search-project' placeholder='Search input' />
        </div>
        <Button type='submit' variant='primary'>
          Search
        </Button>
      </Form>
      <Button variant='primary' className='ms-auto' onClick={onClickNew}>
        Create new board
      </Button>
    </Card>
  );
};

export { Toolbar };
