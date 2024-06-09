'use client';

import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  EyeIcon,
  FilePenIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Student {
  id: string;
  name: string;
  email: string;
  status: 'regular' | 'irregular';
  outstanding: number;
  lastPayment: string;
}

const students: Student[] = [
  {
    id: 'S001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'regular',
    outstanding: 2,
    lastPayment: '2023-05-15',
  },
  {
    id: 'S002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'irregular',
    outstanding: 4,
    lastPayment: '2023-03-01',
  },
  {
    id: 'S003',
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    status: 'regular',
    outstanding: 1,
    lastPayment: '2023-06-01',
  },
  {
    id: 'S004',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    status: 'irregular',
    outstanding: 5,
    lastPayment: '2022-11-15',
  },
  {
    id: 'S005',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    status: 'regular',
    outstanding: 0,
    lastPayment: '2023-06-05',
  },
];

type SortColumn = keyof Student;
type SortDirection = 'asc' | 'desc';
type FilterStatus = 'all' | 'regular' | 'irregular';

export default function Page() {
  const [sortColumn, setSortColumn] = useState<SortColumn>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const filteredStudents = useMemo(() => {
    let filtered = students;
    if (filterStatus !== 'all') {
      filtered = filtered.filter((student) => student.status === filterStatus);
    }
    filtered = filtered.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [sortColumn, sortDirection, filterStatus]);

  const handleSort = (value: string) => {
    const column = value as SortColumn;
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleFilterStatus = (value: string) => {
    setFilterStatus(value as FilterStatus);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Regularidad</h1>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <span>Filtrar por:</span>
                <span>
                  {filterStatus === 'all'
                    ? 'Todos'
                    : filterStatus === 'regular'
                      ? 'Regular'
                      : 'Irregular'}
                </span>
                <ChevronDownIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={filterStatus}
                onValueChange={handleFilterStatus}
              >
                <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="regular">
                  Regular
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="irregular">
                  Irregular
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <span>Ordenar por:</span>
                <span>
                  {sortColumn === 'id'
                    ? 'ID'
                    : sortColumn === 'name'
                      ? 'Nombre'
                      : 'Email'}
                </span>
                <ChevronsUpDownIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={sortColumn}
                onValueChange={(value: string) =>
                  handleSort(value as SortColumn)
                }
              >
                <DropdownMenuRadioItem value="id">ID</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name">
                  Nombre
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="email">
                  Email
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Pendientes</TableHead>
              <TableHead>Último Pago</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarImage src="/placeholder.svg" alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{student.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <Badge
                    className={`rounded-full px-3 py-1 ${
                      student.status === 'regular'
                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                        : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                    }`}
                  >
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell>{student.outstanding}</TableCell>
                <TableCell>{student.lastPayment}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <EyeIcon className="size-4" />
                      <span className="sr-only">Ver</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <FilePenIcon className="size-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
