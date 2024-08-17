import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  OnChangeFn,
  PaginationState,
} from '@tanstack/react-table';
import { Table as BaseTable } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

interface TableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  manualPagination?: boolean;
  pagination?: PaginationState;
  pageCount?: number;
  onPaginationChange?: OnChangeFn<PaginationState>;
}

const Table = <T extends object>({
  data,
  columns,
  manualPagination = false,
  pagination,
  pageCount = -1,
  onPaginationChange,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      ...(manualPagination && {
        pagination,
      }),
    },
    manualPagination,
    ...(manualPagination && {
      onPaginationChange,
    }),
    //
    debugTable: true,
  });
  return (
    <div>
      <BaseTable striped bordered hover>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </BaseTable>
      <ReactPaginate
        breakLabel='...'
        containerClassName='pagination d-flex justify-content-center'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        activeClassName='active'
        previousClassName='page-item'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        previousLinkClassName='page-link'
        nextLabel='>'
        onPageChange={({ selected }) => table.setPageIndex(selected)}
        pageRangeDisplayed={5}
        pageCount={table.getPageCount()}
        previousLabel='<'
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export { Table };
