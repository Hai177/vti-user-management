import { useNavigate, useParams } from 'react-router-dom';

const useToggleCRUD = (path: string) => {
  const { id, tab } = useParams<'id' | 'tab'>();
  const navigate = useNavigate();

  const isOpenCreateOrEdit = tab === 'edit' || tab === 'create';

  const onOpen = (_tab: 'edit' | 'delete', _id: string) => {
    navigate(`${path}/${_tab}/${_id}`);
  };

  const onClose = () => {
    navigate(path);
  };

  const onOpenCreate = () => {
    navigate(`${path}/create`);
  };

  return { onOpen, onClose, onOpenCreate, id, tab, isOpenCreateOrEdit };
};

export { useToggleCRUD };
