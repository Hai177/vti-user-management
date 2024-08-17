import { CellContext, ColumnDef, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

import { Table, TableActions } from '~/components';
import { ProjectModal, Toolbar, DeleteProjectModal } from './components';
import { IProject, useGetProjectsQuery } from '~/redux/admin/project';
import { useToggleCRUD } from '~/hooks';

const Project = () => {
  const { id, tab, isOpenCreateOrEdit, onClose, onOpen, onOpenCreate } = useToggleCRUD('/admin/project');
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data: resData, project } = useGetProjectsQuery(
    {
      take: pageSize,
      page: pageIndex + 1,
    },
    {
      selectFromResult: (res) => ({ ...res, project: res.data?.data.find((p) => p.id === id) }),
    }
  );
  const projects = resData?.data ?? [];

  const renderAction = ({ row: { original } }: CellContext<IProject, unknown>) => (
    <TableActions onDelete={() => onOpen('delete', original.id)} onEdit={() => onOpen('edit', original.id)} />
  );

  const columns: ColumnDef<IProject>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Total member',
      accessorFn: (row) => row.members?.length,
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
        data={projects}
        manualPagination
        pagination={{ pageIndex, pageSize }}
        pageCount={resData?.meta.pageCount}
        onPaginationChange={setPagination}
      />
      <ProjectModal show={isOpenCreateOrEdit} onHide={onClose} tab={tab} project={project} />
      <DeleteProjectModal show={tab === 'delete'} id={id} onHide={onClose} />
    </div>
  );
};

export default Project;
