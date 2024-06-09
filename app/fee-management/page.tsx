'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function Page() {
  const currentMonthIndex = new Date().getMonth();
  const [fees, setFees] = useState(() => {
    const initialFees = months.map((month, index) => ({
      month,
      amount: index < currentMonthIndex ? 20000 : 0,
      status: index < currentMonthIndex ? 'confirmed' : 'unchanged',
    }));
    // Set the current month to pending
    initialFees[currentMonthIndex].status = 'pending';
    return initialFees;
  });
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex]);
  const [newFeeAmount, setNewFeeAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleFeeUpdate = () => {
    const selectedFee = fees.find((fee) => fee.month === selectedMonth);
    if (selectedFee && selectedFee.status === 'confirmed') {
      setError(
        'No se pueden actualizar las tarifas para los períodos facturados.',
      );
      return;
    }
    const updatedFees = fees.map((fee) => {
      if (fee.month === selectedMonth) {
        return { ...fee, amount: newFeeAmount, status: 'pending' };
      }
      return fee;
    });
    setFees(updatedFees);
    setError(null);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tarifas de Matrícula</h1>
        <div className="flex items-center gap-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              {fees.map((fee) => (
                <SelectItem key={fee.month} value={fee.month}>
                  {fee.month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            value={newFeeAmount}
            onChange={(e) => setNewFeeAmount(parseFloat(e.target.value))}
            className="w-full max-w-[200px]"
          />
          <Button onClick={handleFeeUpdate}>Actualizar Tarifa</Button>
        </div>
      </div>
      {error && (
        <div className="rounded-md bg-red-100 p-4 text-red-900">{error}</div>
      )}
      <div className="rounded-lg border p-2 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mes</TableHead>
              <TableHead>Monto de Tarifa</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.map((fee) => (
              <TableRow key={fee.month}>
                <TableCell>{fee.month}</TableCell>
                <TableCell>${fee.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      fee.status === 'confirmed'
                        ? 'default'
                        : fee.status === 'pending'
                          ? 'secondary'
                          : 'outline'
                    }
                    className={
                      fee.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : fee.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {fee.status === 'unchanged'
                      ? 'No establecido'
                      : fee.status === 'pending'
                        ? 'Pendiente'
                        : 'Confirmado'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
