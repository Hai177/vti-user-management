import { useState } from 'react';
import { CellContext, ColumnDef, PaginationState } from '@tanstack/react-table';

import { Table, TableActions } from '~/components';
import { useGetTeamsQuery } from '~/redux/admin/team/api';
import { ITeam } from '~/redux/admin/team';
import { useToggleCRUD } from '~/hooks';
import { TeamModal, Toolbar, DeleteModal } from './components';

const AdminTeam = () => {
  const { id, tab, isOpenCreateOrEdit, onClose, onOpen, onOpenCreate } = useToggleCRUD('/admin/team');
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: resData, team } = useGetTeamsQuery(
    {
      take: pageSize,
      page: pageIndex + 1,
    },
    {
      selectFromResult: (res) => {
        return { ...res, team: res.data?.data.find((p) => p.id === id) };
      },
    }
  );

  const teams = resData?.data ?? [];

  const renderAction = ({ row: { original } }: CellContext<ITeam, unknown>) => (
    <TableActions onDelete={() => onOpen('delete', original.id)} onEdit={() => onOpen('edit', original.id)} />
  );

  const columns: ColumnDef<ITeam>[] = [
    {
      header: 'Team Name',
      accessorKey: 'name',
    },
    {
      header: 'Total Member',
      accessorFn: (row) => row.members?.length,
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Action',
      cell: renderAction,
    },
  ];

  return (
    <div className='p-4'>
      <Toolbar onClickCreate={onOpenCreate} />
      <TeamModal show={isOpenCreateOrEdit} tab={tab} onHide={onClose} team={team} />
      <Table
        data={teams}
        columns={columns}
        manualPagination
        pagination={{ pageIndex, pageSize }}
        pageCount={resData?.meta.pageCount}
        onPaginationChange={setPagination}
      />
      <DeleteModal show={tab === 'delete'} id={id} teamName={team?.name} onHide={onClose} />
    </div>
  );
};

export default AdminTeam;
