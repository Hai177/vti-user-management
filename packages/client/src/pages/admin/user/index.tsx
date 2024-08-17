import { CellContext, ColumnDef, PaginationState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { DeleteUserModal, Toolbar, UserModal } from './components';
import { Table, TableActions } from '~/components';
import { IUser, useDeleteUserMutation, useGetUsersQuery } from '~/redux/admin/user';
import { useToast, useToggleCRUD } from '~/hooks';

const User = () => {
  const toast = useToast();
  const { id, tab, isOpenCreateOrEdit, onClose, onOpen, onOpenCreate } = useToggleCRUD('/admin/user');
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data: resData, user } = useGetUsersQuery(
    {
      take: pageSize,
      page: pageIndex + 1,
    },
    {
      selectFromResult: (res) => ({ ...res, user: res.data?.data.find((p) => p.id === id) }),
    }
  );

  const [deleteUser, { isLoading: isDeleting, isSuccess }] = useDeleteUserMutation();

  const onClickDelete = () => {
    id && deleteUser(id);
  };

  const renderAction = ({ row: { original } }: CellContext<IUser, unknown>) => (
    <TableActions onDelete={() => onOpen('delete', original.id)} onEdit={() => onOpen('edit', original.id)} />
  );

  const users = resData?.data ?? [];
  const columns: ColumnDef<IUser>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Team',
      accessorKey: 'team.name',
    },
    {
      header: 'UserName',
      accessorKey: 'username',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Role',
      accessorKey: 'roles',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
    {
      header: 'Action',
      cell: renderAction,
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      toast('Delete user successfully', 'success');
      onClose();
    }
  }, [isSuccess]);

  return (
    <>
      <div className='p-4'>
        <Toolbar onClickNew={onOpenCreate} />
        <Table
          columns={columns}
          data={users}
          manualPagination
          pagination={{ pageIndex, pageSize }}
          pageCount={resData?.meta.pageCount}
          onPaginationChange={setPagination}
        />
      </div>
      <UserModal show={isOpenCreateOrEdit} tab={tab} user={user} onHide={onClose} />
      <DeleteUserModal
        show={tab === 'delete'}
        isLoading={isDeleting}
        username={user?.username}
        onHide={onClose}
        onClickDelete={onClickDelete}
      />
    </>
  );
};

export default User;
