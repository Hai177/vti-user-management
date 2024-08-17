import { useEffect, useState } from 'react';
import { Dropdown, Image, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import userImg from '~/assets/images/avatar-1.jpg';
import ProfileModal from '~/components/ProfileModal';
import { useRedux, useToast } from '~/hooks';
import { useLogoutMutation } from '~/redux/auth/api';
import { logout } from '~/redux/auth/slice';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { appSelector, dispatch } = useRedux();
  const toast = useToast();
  const { user } = appSelector((state) => state.Auth);
  const [profileModal, setProfileModal] = useState(false);

  const [logoutUser, { isSuccess, isError, isLoading }] = useLogoutMutation();

  const openProfileModal = () => {
    setProfileModal(true);
  };
  const closeProfileModal = () => {
    setProfileModal(false);
  };
  const onLogout = () => {
    logoutUser();
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast('Logout successfully!');
      dispatch(logout());
      navigate('/auth/login', { replace: true });
    }
    if (!isLoading && isError) {
      toast('Logout failed!');
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <Dropdown>
      <Dropdown.Toggle variant='light' id='profile-dropdown' className='p-2 pe-auto' as='div'>
        <Stack direction='horizontal' gap={2}>
          <Image src={userImg} roundedCircle width={32} height={32} />
          <Stack>
            <span className='fs-5  text-start'>{user?.username}</span>
            <span className='fs-6 text-start'>{user?.roles}</span>
          </Stack>
        </Stack>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
        <Dropdown.Item href='#/action-2' onClick={openProfileModal}>
          Profile
        </Dropdown.Item>
        <Dropdown.Item href='#/action-3'>Settings</Dropdown.Item>
      </Dropdown.Menu>
      <ProfileModal show={profileModal} onHide={closeProfileModal} />
    </Dropdown>
  );
};

export default ProfileDropdown;
