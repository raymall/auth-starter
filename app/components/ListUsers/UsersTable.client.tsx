'use client'

import { useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  ArrowUpDown,
  ChevronDown,
  Clipboard,
  Eye,
  MoreHorizontal,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { User } from '@/app/schemas'

export const UsersTable = ({
  data
}: {
  data: User[]
}) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'status',
      header: 'Status',
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Badge className="bg-yellow-600 hover:bg-yellow-600">
          <div className="uppercase">{row.getValue('status')}</div>
        </Badge>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant={'ghost'}
            className={'pl-0'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown />
          </Button>
        )
      },
      enableGlobalFilter: true,
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'last_name',
      header: ({ column }) => {
        return (
          <Button
            variant={'ghost'}
            className={'pl-0'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Last Name
            <ArrowUpDown />
          </Button>
        )
      },
      enableGlobalFilter: true,
      cell: ({ row }) => <div>{row.getValue('last_name')}</div>,
    },
    {
      accessorKey: 'first_name',
      header: ({ column }) => {
        return (
          <Button
            variant={'ghost'}
            className={'pl-0'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            First Name
            <ArrowUpDown />
          </Button>
        )
      },
      enableGlobalFilter: true,
      cell: ({ row }) => <div>{row.getValue('first_name')}</div>,
    },
    {
      accessorKey: 'government_id',
      header: 'Government ID',
      enableGlobalFilter: true,
      cell: ({ row }) => <div>{row.getValue('government_id')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const { full_name, username } = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {full_name && (
                <DropdownMenuItem
                className={'cursor-pointer'}
                  onClick={() => navigator.clipboard.writeText(full_name)}
                >
                  <Clipboard /> Copy Full Name
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="pt-0 pb-0">
                <Link href={`users/${username}`} className="w-full p-0">
                  <Button variant="ghost" className="justify-start w-full p-0">
                    <Eye /> View User
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="ghost" className="justify-start w-full p-0 text-red-600">
                  <Trash2 />Delete User
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable<User>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const rowValues = Object.values(row.original)
        // .concat(row.original.properties?.map(p => p.value) || []) // Adds property values

      return rowValues.some(value => 
        typeof value === 'string' && value.toLowerCase().includes(filterValue.toLowerCase())
      )
      
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search..."
          value={globalFilter ?? ''}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id
                      .replaceAll('_', ' ')
                      .replaceAll(' id', ' ID')
                    }
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}