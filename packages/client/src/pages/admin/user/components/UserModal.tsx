import { useEffect } from 'react';
import { Modal, ModalProps } from 'react-bootstrap';
import { isEmpty } from 'lodash';

import { UserSchemaType } from '~/helpers/formSchema';
import { useToast } from '~/hooks';
import {
  convertTeamToOption,
  convertProjectsToOptions,
  convertRolesToOptions,
  optionToValue,
  optionsToValues,
} from '~/utils';
import { IUser, useCreateUserMutation, useUpdateUserMutation } from '~/redux/admin/user';
import UserForm from './UserForm';

interface BoardModalProps extends ModalProps {
  tab?: string;
  user?: IUser;
}

const UserModal = ({ tab, user, ...props }: BoardModalProps) => {
  const toast = useToast();
  const [createUser, { isLoading: isCreating, isSuccess: isCreatedSuccess }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating, isSuccess: isEditedSuccess }] = useUpdateUserMutation();

  const isLoading = isCreating || isUpdating;

  const title = tab === 'create' ? 'Create new user' : 'Edit user';

  const onSubmit = (data: UserSchemaType) => {
    const convertData = {
      ...data,
      teamId: optionToValue(data.teamOption),
      roles: optionsToValues(data.roleOptions),
      projectIds: optionsToValues(data.projectOptions),
    };

    if (tab === 'create') {
      createUser(convertData);
    }
    if (user && tab === 'edit') {
      updateUser({ ...user, ...convertData });
    }
  };

  const onClose = () => props.onHide?.();

  useEffect(() => {
    if (isCreatedSuccess) {
      toast('Create board successfully');
      onClose();
    }
  }, [isCreatedSuccess]);

  useEffect(() => {
    if (isEditedSuccess) {
      toast('Update user successfully');
      onClose();
    }
  }, [isEditedSuccess]);
  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tab === 'create' && (
          <UserForm onSubmit={onSubmit} type='create' onClose={props.onHide} isLoading={isLoading} />
        )}
        {tab === 'edit' && !isEmpty(user) && (
          <UserForm
            onSubmit={onSubmit}
            type='edit'
            onClose={props.onHide}
            isLoading={isLoading}
            data={{
              ...user,
              projectOptions: convertProjectsToOptions(user.projects),
              teamOption: convertTeamToOption(user.team),
              roleOptions: convertRolesToOptions(user.roles),
            }}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};
export { UserModal };
