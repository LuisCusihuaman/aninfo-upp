'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EyeIcon, FilePenIcon, TrashIcon, InfoIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const calculateLatePaymentCharge = (dueDate: string, amount: number) => {
  const due = new Date(dueDate);
  const now = new Date();
  if (now > due) {
    return amount * 0.05;
  }
  return 0;
};

export default function Page() {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-001',
      student: {
        name: 'John Doe',
      },
      emissionDate: '2023-05-01',
      dueDate: '2023-05-31',
      fees: {
        tuition: 5000,
        activities: 200,
      },
      latePaymentCharge: 0,
      status: 'Pending',
    },
    {
      id: 'INV-002',
      student: {
        name: 'Jane Smith',
      },
      emissionDate: '2023-04-15',
      dueDate: '2023-05-15',
      fees: {
        tuition: 5000,
        activities: 200,
      },
      latePaymentCharge: 275,
      status: 'Issued',
    },
    {
      id: 'INV-003',
      student: {
        name: 'Michael Johnson',
      },
      emissionDate: '2023-03-01',
      dueDate: '2023-03-31',
      fees: {
        tuition: 5000,
        activities: 200,
      },
      latePaymentCharge: 275,
      status: 'Paid',
    },
  ]);

  const prepareInvoices = () => {
    const newInvoices = invoices.map((invoice) => {
      if (invoice.status === 'Pending') {
        const emissionDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(emissionDate.getDate() + 30);
        const lateCharge = calculateLatePaymentCharge(invoice.dueDate, invoice.fees.tuition + invoice.fees.activities);

        return {
          ...invoice,
          emissionDate: emissionDate.toISOString().split('T')[0],
          dueDate: dueDate.toISOString().split('T')[0],
          latePaymentCharge: lateCharge,
        };
      }
      return invoice;
    });
    setInvoices(newInvoices);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 pr-6">
      <div className="mb-4 flex items-center gap-2">
        <Button onClick={prepareInvoices}>Preparar Facturas</Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="size-5 text-gray-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Genera facturas para cada cuota mensual, aplicando recargos por mora si es necesario.</p>
              <p>Solo puedes modificar las facturas con estado "Pending".</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="overflow-hidden rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Factura ID</TableHead>
              <TableHead>Estudiante</TableHead>
              <TableHead>Fecha de Emisión</TableHead>
              <TableHead>Fecha de Vencimiento</TableHead>
              <TableHead>Matrícula</TableHead>
              <TableHead>Actividades</TableHead>
              <TableHead>Cargo por Mora</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <img src="/placeholder.svg" alt={invoice.student.name} />
                      <AvatarFallback>{invoice.student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{invoice.student.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatDate(invoice.emissionDate)}</TableCell>
                <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                <TableCell>${invoice.fees.tuition.toFixed(2)}</TableCell>
                <TableCell>${invoice.fees.activities.toFixed(2)}</TableCell>
                <TableCell>
                  {invoice.latePaymentCharge > 0 ? (
                    `$${invoice.latePaymentCharge.toFixed(2)}`
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>
                  ${(
                    invoice.fees.tuition +
                    invoice.fees.activities +
                    invoice.latePaymentCharge
                  ).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      invoice.status === 'Pending'
                        ? 'bg-yellow-500 text-white'
                        : invoice.status === 'Issued'
                        ? 'bg-blue-500 text-white'
                        : 'bg-green-500 text-white'
                    } rounded-full px-2 py-1 text-xs font-medium`}
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      disabled={invoice.status !== 'Pending'}
                    >
                      <EyeIcon className="size-4" />
                      <span className="sr-only">Ver</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      disabled={invoice.status !== 'Pending'}
                    >
                      <FilePenIcon className="size-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      disabled={invoice.status !== 'Pending'}
                    >
                      <TrashIcon className="size-4" />
                      <span className="sr-only">Eliminar</span>
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
