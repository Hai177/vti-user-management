import React from 'react';
import { Navigate } from 'react-router-dom';
import _ from 'lodash';

import { useRedux } from '~/hooks';
import { useGetMeQuery } from '~/redux/auth/api';
import { LoadingOverlay } from '~/components';

interface RequiredAuthProps {
  component: React.ReactNode;
}

const RequiredAuth = ({ component }: RequiredAuthProps) => {
  const { appSelector } = useRedux();
  const { user, refreshToken } = appSelector((state) => state.Auth);

  const isSkip = !_.isEmpty(user) || !refreshToken;

  const { isLoading, isError, isFetching } = useGetMeQuery(undefined, {
    skip: isSkip,
  });

  if (isLoading || isFetching) {
    return <LoadingOverlay open fullScreen />;
  }

  if (!refreshToken || isError) {
    return <Navigate to='/auth/login' replace />;
  }

  return component;
};

export default RequiredAuth;
