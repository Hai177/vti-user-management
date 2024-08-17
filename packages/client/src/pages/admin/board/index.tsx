import { CellContext, ColumnDef, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

import { IBoard, useGetBoardsQuery } from '~/redux/admin/board';
import { Toolbar, DeleteBoardModal, BoardModal } from './components';
import { Table, TableActions } from '~/components';
import { useToggleCRUD } from '~/hooks';

const Board = () => {
  const { id, tab, isOpenCreateOrEdit, onClose, onOpen, onOpenCreate } = useToggleCRUD('/admin/board');
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data: resData, board } = useGetBoardsQuery(
    {
      take: pageSize,
      page: pageIndex + 1,
    },
    {
      selectFromResult: (res) => ({ ...res, board: res.data?.data.find((p) => p.id === id) }),
    }
  );

  const renderAction = ({ row: { original } }: CellContext<IBoard, unknown>) => (
    <TableActions onDelete={() => onOpen('delete', original.id)} onEdit={() => onOpen('edit', original.id)} />
  );

  const boards = resData?.data ?? [];
  const columns: ColumnDef<IBoard>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Project',
      accessorKey: 'project.name',
    },
    {
      header: 'Action',
      cell: renderAction,
    },
  ];

  return (
    <div className='p-4'>
      <Toolbar onClickNew={onOpenCreate} />
      <Table
        columns={columns}
        data={boards}
        manualPagination
        pagination={{ pageIndex, pageSize }}
        pageCount={resData?.meta.pageCount}
        onPaginationChange={setPagination}
      />
      <BoardModal show={isOpenCreateOrEdit} onHide={onClose} tab={tab} board={board} />
      <DeleteBoardModal show={tab === 'delete'} onHide={onClose} />
    </div>
  );
};
export default Board;
