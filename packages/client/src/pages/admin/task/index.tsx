import { useState } from 'react';
import TaskModal from './component/TaskModal';
import TaskToolbar from './component/Toolbar';
import { Table } from '~/components';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import TaskActions from './component/TaskActions';
import { useGetTasksQuery } from '~/redux/admin/task/api';
import { useNavigate, useParams } from 'react-router-dom';
import { ITask } from '~/redux/admin/task';
import DeleteTaskModal from './component/DeleteModal';

const AdminTask = () => {
  console.log("admintask");
  
  const navigate = useNavigate();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { id } = useParams();
  const { data: resData, task } = useGetTasksQuery(
    {
      take: pageSize,
      page: pageIndex + 1,
    },
    {
      selectFromResult: (res) => {
        return { ...res, task: res.data?.data.find((p) => p.id === id) };
      },
    }
  );
  const tasks = resData?.data ?? [];
  const [modalState, setModalState] = useState(false);
  const [typeModal, setTypeModal] = useState<'create' | 'edit' | 'delete'>('create');

  const columns: ColumnDef<ITask>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Task Name',
      accessorKey: 'name',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Action',
      cell: (data) => {
        return (
          <TaskActions
            handleEdit={() => handleEditTask(data.row.original)}
            handleDelete={() => handleDeleteTask(data.row.original.id)}
          />
        );
      },
    },
  ];

  const openCreateModal = () => {
    setModalState(true);
    setTypeModal('create');
  };
  const closeModal = () => {
    setModalState(false);
  };
  const handleEditTask = (data: ITask) => {
    navigate(`/admin/task/${data.id}`, { replace: false });
    setModalState(true);
    setTypeModal('edit');
  };
  const handleDeleteTask = (id: string) => {
    setTypeModal('delete');
    navigate(`/admin/task/${id}`, { replace: false });
  };
  const closeDeleteModal = () => {
    setTypeModal('create');
  };
  return (
    <div className='p-4'>
      <TaskToolbar onClickCreate={openCreateModal} />
      <TaskModal show={modalState} type={typeModal} onHide={closeModal} task={task} />
      <Table
        data={tasks}
        columns={columns}
        manualPagination
        pagination={{ pageIndex, pageSize }}
        pageCount={resData?.meta.pageCount}
        onPaginationChange={setPagination}
      />
      <DeleteTaskModal show={typeModal === 'delete'} onHide={closeDeleteModal} />
    </div>
  );
};

export default AdminTask;
