'use client';

import { FileTextIcon, UsersIcon, XIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total de Estudiantes</CardTitle>
              <CardDescription>Año académico actual</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-4xl font-bold">12,345</div>
              <UsersIcon className="size-10 text-gray-500 dark:text-gray-400" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total de Tarifas</CardTitle>
              <CardDescription>Año académico actual</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-4xl font-bold">$2,345,678</div>
              <XIcon className="size-10 text-gray-500 dark:text-gray-400" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Facturas Pendientes</CardTitle>
              <CardDescription>Año académico actual</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-4xl font-bold">1,234</div>
              <FileTextIcon className="size-10 text-gray-500 dark:text-gray-400" />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
