import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Card, Container, Form, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import { ButtonLoading, LogoIcon } from '~/components';
import { LoginSchemaType, loginSchema } from '~/helpers';
import { useToast, useUser } from '~/hooks';
import { useLoginMutation } from '~/redux/auth/api';

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuth } = useUser();

  const [userLogin, { isLoading, isSuccess, error }] = useLoginMutation();
  const { register, handleSubmit } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    userLogin(data);
  };

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        toast('Login successfully !');
        navigate('/', { replace: true });
        return;
      }

      if (error) {
        toast('Login failed !', 'error');
      }
    }
  }, [isSuccess, isLoading, error]);

  if (isAuth) {
    return <Navigate to='/' replace />;
  }

  return (
    <Container className='vh-100 d-flex align-items-center justify-content-center' fluid='sm'>
      <Card className='w-50'>
        <Card.Header className='bg-primary p-3' style={{ height: '4rem' }}>
          <LogoIcon></LogoIcon>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' {...register('username')} autoComplete='username' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' {...register('password')} autoComplete='password' />
            </Form.Group>
            <Row className='m-0'>
              <ButtonLoading type='submit' isLoading={isLoading}>
                Login
              </ButtonLoading>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      
    </Container>
  );
};

export default Login;
