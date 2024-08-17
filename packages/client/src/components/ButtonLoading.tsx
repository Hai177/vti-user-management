import { Button, ButtonProps } from 'react-bootstrap';

interface ButtonLoadingProps extends ButtonProps {
  isLoading?: boolean;
}

const ButtonLoading = ({ isLoading, children, onClick, ...props }: ButtonLoadingProps) => {
  return (
    <Button variant='primary' disabled={isLoading} onClick={!isLoading ? onClick : undefined} {...props}>
      {isLoading ? 'Loading…' : children}
    </Button>
  );
};

export { ButtonLoading };
