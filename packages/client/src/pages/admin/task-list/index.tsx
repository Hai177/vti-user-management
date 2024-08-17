import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ITaskList, useGetTaskListsQuery } from '~/redux/admin/task-list';
import { Actions, TaskListModal, Toolbar } from './components';
import { Table } from '~/components';
import { DeleteTaskListModal } from './components/DeleteTaskListModal';

const TaskList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [typeModal, setTypeModal] = useState<'create' | 'edit' | 'delete'>('create');
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { id } = useParams();
  const { data: resData, tasklist } = useGetTaskListsQuery(
    {
      take: pageSize,
      page: pageIndex + 1,
    },
    {
      selectFromResult: (res) => ({ ...res, tasklist: res.data?.data.find((p) => p.id === id) }),
    }
  );

  const tasklists = resData?.data ?? [];

  const columns: ColumnDef<ITaskList>[] = [
    {
      header: 'Id',
      accessorKey: 'id',
    },
    {
      header: 'Tasks',
      accessorKey: 'tasks',
    },
    {
      header: 'Projects',
      accessorKey: 'projects',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Action',
      cell: (data) => {
        return (
          <Actions
            onClickEdit={() => onOpenEditModal(data.row.original)}
            onClickDelete={() => onOpenDeleteModal(data.row.original)}
          />
        );
      },
    },
  ];

  const onOpenModal = (type: 'create' | 'edit') => {
    setOpen(true);
    setTypeModal(type);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  const onOpenCreateModal = () => {
    onOpenModal('create');
  };

  const onOpenEditModal = (item: ITaskList) => {
    onOpenModal('edit');
    navigate(`/admin/task-list/${item.id}`, { replace: false });
  };

  const onOpenDeleteModal = (item: ITaskList) => {
    setTypeModal('delete');
    navigate(`/admin/task-list/${item.id}`, { replace: false });
  };
  const onCloseDeleteModal = () => {
    setTypeModal('create');
  };

  return (
    <div className='p-4'>
      <Toolbar onClickNew={onOpenCreateModal} />
      <Table
        columns={columns}
        data={tasklists}
        manualPagination
        pagination={{ pageIndex, pageSize }}
        pageCount={resData?.meta.pageCount}
        onPaginationChange={setPagination}
      />
      <TaskListModal show={open} onHide={onCloseModal} type={typeModal} tasklist={tasklist} />
      <DeleteTaskListModal show={typeModal === 'delete'} onHide={onCloseDeleteModal} />
    </div>
  );
};
export default TaskList;
