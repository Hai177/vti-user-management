import { useRedux } from './useRedux';

const useUser = () => {
  const { appSelector } = useRedux();
  const { user, refreshToken } = appSelector((state) => state.Auth);

  const isAuth = !!refreshToken;

  return {
    user,
    isAuth,
  };
};

export { useUser };
