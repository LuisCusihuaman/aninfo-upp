'use client';

import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const students = [
  {
    id: 'S001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    unpaidAmount: 0,
  },
  {
    id: 'S002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    unpaidAmount: 20000,
  },
  {
    id: 'S003',
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    unpaidAmount: 0,
  },
].map((student) => ({
  ...student,
  id: '',
})) as { id: string; name: string; email: string; unpaidAmount: number }[];

const calculateLatePaymentCharge = (amount: number) => amount * 0.05;

const getMonthName = (monthIndex: number) => {
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  return monthNames[monthIndex];
};

export default function Page() {
  const [invoices, setInvoices] = useState(() => {
    return students.map((student) => {
      const lateCharge =
        student.unpaidAmount > 0
          ? calculateLatePaymentCharge(student.unpaidAmount)
          : 0;
      return {
        id: '',
        student,
        emissionDate: '',
        dueDate: '',
        amount: 20000,
        latePaymentCharge: lateCharge,
        totalAmount: 20000 + lateCharge,
        status: 'pending',
      };
    });
  });

  const confirmInvoice = (index: number) => {
    const updatedInvoices = invoices.map((invoice, i) => {
      if (i === index) {
        const emissionDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(emissionDate.getDate() + 30);
        const lateCharge =
          invoice.status === 'pending'
            ? calculateLatePaymentCharge(invoice.amount)
            : 0;
        return {
          ...invoice,
          emissionDate: emissionDate.toISOString().split('T')[0],
          dueDate: dueDate.toISOString().split('T')[0],
          latePaymentCharge: lateCharge,
          totalAmount: invoice.amount + lateCharge,
          status: 'confirmed',
        };
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
  };

  const issueInvoices = () => {
    const updatedInvoices = invoices.map((invoice, index) => {
      if (invoice.status === 'confirmed') {
        return {
          ...invoice,
          id: `INV-${String(index + 1).padStart(3, '0')}`,
          status: 'issued',
        };
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
  };

  useEffect(() => {
    const checkDueDate = () => {
      const today = new Date();
      const dayOfMonth = today.getDate();
      if (dayOfMonth >= 25 || dayOfMonth <= 9) {
        // 15 days before the 10th of the next month
        issueInvoices();
      }
    };

    checkDueDate();
  }, []);

  const currentMonthName = getMonthName(new Date().getMonth());

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Emisión de Facturas ({currentMonthName} en Curso)
        </h1>
        <Button onClick={issueInvoices}>Emitir Facturas</Button>
      </div>
      <div className="overflow-hidden rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Factura ID</TableHead>
              <TableHead>Estudiante</TableHead>
              <TableHead>Fecha de Emisión</TableHead>
              <TableHead>Fecha de Vencimiento</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Cargo por Mora</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {invoice.id || 'N/A'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <img src="/placeholder.svg" alt={invoice.student.name} />
                      <AvatarFallback>
                        {invoice.student.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{invoice.student.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {invoice.student.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {invoice.status !== 'pending' ? invoice.emissionDate : 'N/A'}
                </TableCell>
                <TableCell>
                  {invoice.status !== 'pending' ? invoice.dueDate : 'N/A'}
                </TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {invoice.latePaymentCharge > 0 ? (
                    `$${invoice.latePaymentCharge.toFixed(2)}`
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>${invoice.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      invoice.status === 'pending'
                        ? 'bg-yellow-500 text-white'
                        : invoice.status === 'confirmed'
                          ? 'bg-blue-500 text-white'
                          : 'bg-green-500 text-white'
                    } rounded-full px-2 py-1 text-xs font-medium`}
                  >
                    {invoice.status === 'pending'
                      ? 'Pendiente'
                      : invoice.status === 'confirmed'
                        ? 'Confirmado'
                        : 'Emitido'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => confirmInvoice(index)}
                    disabled={invoice.status !== 'pending'}
                  >
                    <CheckIcon className="size-4" />
                    <span className="sr-only">Confirmar</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
