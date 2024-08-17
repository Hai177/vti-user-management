import { useEffect } from 'react';
import { ModalProps } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import { TeamSchemaType } from '~/helpers';
import { useToast } from '~/hooks';
import { ITeam } from '~/redux/admin/team';
import { useCreateTeamMutation, useUpdateTeamMutation } from '~/redux/admin/team/api';
import TeamForm from './TeamForm';
import { optionsToValues } from '~/utils';

interface TeamModalProps extends ModalProps {
  tab?: string;
  team?: ITeam;
}
const TeamModal = ({ tab, team, ...props }: TeamModalProps) => {
  const toast = useToast();
  const [createTeam, { isLoading: isCreating, isSuccess: isCreatedSuccess }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = useUpdateTeamMutation();

  const isLoading = isCreating || isUpdating;

  const onSubmit = (data: TeamSchemaType) => {
    const newData = { ...data, memberIds: optionsToValues(data.memberOptions) };

    if (tab === 'create') {
      createTeam(newData);
    }
    if (team && tab === 'edit') {
      updateTeam({ ...team, ...newData });
    }
  };

  useEffect(() => {
    if (isCreatedSuccess) {
      props.onHide?.();
      toast('Create team successfully');
    }
  }, [isCreatedSuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      props.onHide?.();
      toast('Update team successfully');
    }
  }, [isUpdateSuccess]);

  return (
    <Modal {...props} show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{tab === 'create' ? 'Create new team' : 'Edit this team'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TeamForm onSubmit={onSubmit} type={tab} onClose={props.onHide} isLoading={isLoading} team={team} />
      </Modal.Body>
    </Modal>
  );
};

export { TeamModal };
