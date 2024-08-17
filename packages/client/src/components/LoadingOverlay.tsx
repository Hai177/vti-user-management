import { Spinner } from 'react-bootstrap';
import clsx from 'clsx';

interface LoadingOverlayProps {
  open?: boolean;
  className?: string;
  fullScreen?: boolean;
}

const LoadingOverlay = ({ open, className, fullScreen }: LoadingOverlayProps) => {
  if (!open) {
    return null;
  }

  const _class = fullScreen ? 'vw-100 vh-100 position-fixed top-0 start-0' : 'h-100 w-100 position-absolute';

  return (
    <div className={clsx('loading-overlay d-flex justify-content-center align-items-center', _class, className)}>
      <Spinner animation='border' variant='light' />
    </div>
  );
};

export { LoadingOverlay };
