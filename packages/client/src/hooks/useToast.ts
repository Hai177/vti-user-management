import { toast as baseToast } from 'react-toastify';

const useToast = () => {
  const toast = (message: string, variant: 'error' | 'success' | 'warn' = 'success') => {
    baseToast[variant](message);
  };

  return toast;
};

export { useToast };
