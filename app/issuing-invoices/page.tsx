'use client';

import { AlertCircleIcon, CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    unpaidAmount: 15000,
  },
  {
    id: 'S003',
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    unpaidAmount: 0,
  },
  {
    id: 'S004',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    unpaidAmount: 15000,
  },
  {
    id: 'S005',
    name: 'Laura Wilson',
    email: 'laura.wilson@example.com',
    unpaidAmount: 20000,
  },
  {
    id: 'S006',
    name: 'David Brown',
    email: 'david.brown@example.com',
    unpaidAmount: 0,
  },
];

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
    return students.map((student, index) => {
      const lateCharge =
        student.unpaidAmount > 0
          ? calculateLatePaymentCharge(student.unpaidAmount)
          : 0;
      const totalAmount = 20000 + student.unpaidAmount + lateCharge;
      return {
        id: index < 3 ? `INV-${String(index + 1).padStart(3, '0')}` : '',
        student,
        emissionDate: index < 3 ? '2023-08-01' : '',
        dueDate: index < 3 ? '2023-08-31' : '',
        amount: 20000,
        latePaymentCharge: lateCharge,
        totalAmount: totalAmount,
        unpaidAmount: student.unpaidAmount,
        status: index < 3 ? 'issued' : 'pending',
      };
    });
  });

  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const toggleSelectInvoice = (index: number) => {
    setSelectedInvoices((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index],
    );
  };

  const toggleSelectAll = () => {
    if (selectedInvoices.length === invoices.length) {
      setSelectedInvoices([]);
    } else {
      const pendingIndexes = invoices
        .map((invoice, index) => (invoice.status === 'pending' ? index : -1))
        .filter((index) => index !== -1);
      setSelectedInvoices(pendingIndexes);
    }
  };

  const confirmInvoice = (index: number) => {
    const updatedInvoices = invoices.map((invoice, i) => {
      if (i === index && invoice.status === 'pending') {
        return {
          ...invoice,
          status: 'confirmed',
        };
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
  };

  const confirmSelectedInvoices = () => {
    const updatedInvoices = invoices.map((invoice, i) => {
      if (selectedInvoices.includes(i) && invoice.status === 'pending') {
        return {
          ...invoice,
          status: 'confirmed',
        };
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
    setSelectedInvoices([]);
  };

  const issueInvoices = async () => {
    setIsSyncing(true);

    // Mock sleep for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const updatedInvoices = invoices.map((invoice, index) => {
      if (invoice.status === 'confirmed') {
        const emissionDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(emissionDate.getDate() + 30);
        return {
          ...invoice,
          id: `INV-${String(index + 1).padStart(3, '0')}`,
          emissionDate: emissionDate.toISOString().split('T')[0],
          dueDate: dueDate.toISOString().split('T')[0],
          status: 'issued',
        };
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
    setIsSyncing(false);

    toast.success('Facturas emitidas con éxito');
  };

  useEffect(() => {
    const checkDueDate = () => {
      const today = new Date();
      const dayOfMonth = today.getDate();
      if (dayOfMonth >= 25 || dayOfMonth <= 9) {
        setShowAlert(true);
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
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={confirmSelectedInvoices}
            disabled={selectedInvoices.length === 0}
          >
            Confirmar Seleccionadas
          </Button>
          <Button
            onClick={issueInvoices}
            disabled={
              isSyncing ||
              !invoices.some((invoice) => invoice.status === 'confirmed')
            }
          >
            {isSyncing ? 'Emitiendo...' : 'Emitir Facturas'}
          </Button>
        </div>
      </div>
      {showAlert && (
        <Alert>
          <AlertCircleIcon className="size-4" />
          <AlertTitle>Atención</AlertTitle>
          <AlertDescription>
            Faltan más de 15 días para el 10 del próximo mes. Es momento de
            preparar y emitir las facturas correspondientes. Asegúrese de que
            los datos del alumno, el detalle del arancel aplicable y cualquier
            recargo aplicado sean correctos antes de emitirlas.
          </AlertDescription>
        </Alert>
      )}
      <div className="overflow-hidden rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  type="checkbox"
                  checked={selectedInvoices.length === invoices.length}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Factura ID</TableHead>
              <TableHead>Estudiante</TableHead>
              <TableHead>Fecha de Emisión</TableHead>
              <TableHead>Fecha de Vencimiento</TableHead>
              <TableHead>Monto Actual</TableHead>
              <TableHead>Monto Adeudado</TableHead>
              <TableHead>Cargo por Mora</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedInvoices.includes(index)}
                    onChange={() => toggleSelectInvoice(index)}
                    disabled={invoice.status !== 'pending'}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {invoice.id || 'N/A'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarImage
                        alt={invoice.student.name}
                        src="/placeholder.svg"
                      />
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
                <TableCell>{invoice.emissionDate || 'N/A'}</TableCell>
                <TableCell>{invoice.dueDate || 'N/A'}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {invoice.unpaidAmount > 0 ? (
                    `$${invoice.unpaidAmount.toFixed(2)}`
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">-</span>
                  )}
                </TableCell>
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
      <Toaster richColors closeButton position="bottom-right" />
    </main>
  );
}
