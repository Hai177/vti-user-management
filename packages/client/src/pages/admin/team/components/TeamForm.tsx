import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TeamSchemaType, teamSchema } from '~/helpers';
import { ITeam } from '~/redux/admin/team';
import { convertUsersToOptions } from '~/utils';
import { UserAutocomplete } from '~/components';

interface TeamFormProps {
  type?: string;
  team?: ITeam;
  isLoading?: boolean;
  onSubmit: (data: TeamSchemaType) => void;
  onClose?: () => void;
}

const TeamForm = ({ type, team, isLoading = false, onSubmit, onClose }: TeamFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<TeamSchemaType>({
    resolver: yupResolver<TeamSchemaType>(teamSchema),
    values:
      type === 'edit'
        ? {
            name: team?.name ?? '',
            description: team?.description ?? '',
            memberOptions: convertUsersToOptions(team?.members ?? []),
          }
        : {
            name: '',
            description: '',
            memberOptions: [],
          },
  });
  const submitBtnLabel = type === 'create' ? 'Create' : 'Save';
  return (
    <Form onSubmit={handleSubmit(onSubmit)} id='team-form'>
      <Form.Group className='mb-3'>
        <Form.Label>Team Name</Form.Label>
        <Form.Control type='text' placeholder='Team 1' autoFocus {...register('name')} />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Description</Form.Label>
        <Form.Control as='textarea' rows={3} {...register('description')} />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Members</Form.Label>
        <Controller
          control={control}
          name='memberOptions'
          render={({ field: { onChange, onBlur, value } }) => (
            <UserAutocomplete isMulti onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </Form.Group>
      <Form.Group className='mb-3 d-flex justify-content-end gap-2'>
        <Button type='submit' variant='primary' disabled={isLoading || !isValid}>
          {submitBtnLabel}
        </Button>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
      </Form.Group>
    </Form>
  );
};

export default TeamForm;
