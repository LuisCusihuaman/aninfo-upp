'use client';

import { AvatarImage } from '@radix-ui/react-avatar';
import { EyeIcon, FilePenIcon, InfoIcon } from 'lucide-react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const transactions = [
  { date: '2024-02-25', studentId: 'S001', invoiceId: 'INV-003', amount: 5500 },
];

type Student = {
  name: string;
  id: string;
  email: string;
};

type Fees = {
  tuition: number;
};

type Invoice = {
  id: string;
  student: Student;
  emissionDate: string;
  dueDate: string;
  fees: Fees;
  latePaymentCharge: number;
  status: string;
};

const generateNewInvoice = (
  id: number,
  studentId: string,
  studentName: string,
  email: string,
  emissionDate: string,
  dueDate: string,
  tuition: number,
): Invoice => {
  return {
    id: `INV-${id.toString().padStart(3, '0')}`,
    student: {
      name: studentName,
      id: studentId,
      email: email,
    },
    emissionDate: emissionDate,
    dueDate: dueDate,
    fees: {
      tuition: tuition,
    },
    latePaymentCharge: 0,
    status: 'Pending',
  };
};

export default function Page() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'INV-001',
      student: {
        name: 'John Doe',
        id: 'S001',
        email: 'john.doe@example.com',
      },
      emissionDate: '2023-05-01',
      dueDate: '2023-05-31',
      fees: {
        tuition: 5000,
      },
      latePaymentCharge: 0,
      status: 'Pending',
    },
    {
      id: 'INV-002',
      student: {
        name: 'Jane Smith',
        id: 'S002',
        email: 'jane.smith@example.com',
      },
      emissionDate: '2023-04-15',
      dueDate: '2023-05-15',
      fees: {
        tuition: 5000,
      },
      latePaymentCharge: 275,
      status: 'Pending',
    },
    {
      id: 'INV-003',
      student: {
        name: 'Michael Johnson',
        id: 'S003',
        email: 'michael.johnson@example.com',
      },
      emissionDate: '2023-03-01',
      dueDate: '2023-03-31',
      fees: {
        tuition: 5000,
      },
      latePaymentCharge: 275,
      status: 'Pending',
    },
    {
      id: 'INV-004',
      student: {
        name: 'Emily Davis',
        id: 'S004',
        email: 'emily.davis@example.com',
      },
      emissionDate: '2023-03-01',
      dueDate: '2023-03-31',
      fees: {
        tuition: 5000,
      },
      latePaymentCharge: 0,
      status: 'Paid', // Example of a paid invoice
    },
  ]);

  const [isSyncing, setIsSyncing] = useState(false);

  const synchronizeWithTangerine = async () => {
    setIsSyncing(true);

    // Simulate a network delay
    const syncDelay = Math.random() > 0.5 ? 3000 : 1000;
    await new Promise((resolve) => setTimeout(resolve, syncDelay));

    // Simulate a 50/50 chance of failure
    if (syncDelay === 3000) {
      setIsSyncing(false);
      toast.error(
        'Los servidores de Tangerine se encuentran fuera de servicio. Comuníquese con soporte 🥺',
      );
      return;
    }

    // Update existing invoices
    const updatedInvoices = invoices.map((invoice) => {
      const transaction = transactions.find(
        (t) => t.invoiceId === invoice.id && t.studentId === invoice.student.id,
      );
      if (transaction) {
        return {
          ...invoice,
          status: 'Paid',
        };
      }
      return invoice;
    });

    const newInvoices = [
      generateNewInvoice(
        5,
        'S005',
        'Laura Wilson',
        'laura.wilson@example.com',
        '2023-06-01',
        '2023-06-30',
        5000,
      ),
      generateNewInvoice(
        6,
        'S006',
        'David Brown',
        'david.brown@example.com',
        '2023-07-01',
        '2023-07-31',
        5000,
      ),
      generateNewInvoice(
        7,
        'S007',
        'Sophia Miller',
        'sophia.miller@example.com',
        '2023-08-01',
        '2023-08-31',
        5000,
      ),
      generateNewInvoice(
        8,
        'S008',
        'James Moore',
        'james.moore@example.com',
        '2023-09-01',
        '2023-09-30',
        5000,
      ),
      generateNewInvoice(
        9,
        'S009',
        'Isabella Taylor',
        'isabella.taylor@example.com',
        '2023-10-01',
        '2023-10-31',
        5000,
      ),
    ];

    setInvoices([...updatedInvoices, ...newInvoices]);
    setIsSyncing(false);

    toast.success('Sincronización completada');
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reporte de Transacciones Diarias</h1>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="size-5 cursor-pointer text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Procesa los pagos recibidos a través de Tangerine y actualiza
                  el estado de cuenta de los alumnos.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button onClick={synchronizeWithTangerine} disabled={isSyncing}>
            {isSyncing ? 'Sincronizando...' : 'Sincronizar con Tangerine'}
          </Button>
        </div>
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
                      <AvatarImage
                        src="/placeholder.svg"
                        alt={invoice.student.name}
                      />
                      <AvatarFallback>
                        {invoice.student.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{invoice.student.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {invoice.student.id}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatDate(invoice.emissionDate)}</TableCell>
                <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                <TableCell>${invoice.fees.tuition.toFixed(2)}</TableCell>
                <TableCell>
                  {invoice.latePaymentCharge > 0 ? (
                    `$${invoice.latePaymentCharge.toFixed(2)}`
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>
                  $
                  {(invoice.fees.tuition + invoice.latePaymentCharge).toFixed(
                    2,
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      invoice.status === 'Pending'
                        ? 'bg-yellow-500 text-white'
                        : invoice.status === 'Paid'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                    } rounded-full px-2 py-1 text-xs font-medium`}
                  >
                    {invoice.status === 'Pending' ? 'Pendiente' : 'Abonado'}
                  </Badge>
                </TableCell>
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
      <Toaster richColors closeButton position="bottom-right" />
    </main>
  );
}
