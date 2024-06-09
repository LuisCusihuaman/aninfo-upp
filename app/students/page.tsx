'use client';

import { EyeIcon, PenIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Student {
  id: number;
  dni: string;
  apellido: string;
  nombre: string;
  direccion: string;
  telefono: string;
  fecha_de_nacimiento: string;
  fecha_de_ingreso: string;
  fecha_de_egreso: string;
}

export default function Page() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      dni: '12345678A',
      apellido: 'Doe',
      nombre: 'John',
      direccion: '123 Main St, Anytown USA',
      telefono: '555-1234',
      fecha_de_nacimiento: '1990-05-15',
      fecha_de_ingreso: '2010-09-01',
      fecha_de_egreso: '2014-06-15',
    },
    {
      id: 2,
      dni: '87654321B',
      apellido: 'Smith',
      nombre: 'Jane',
      direccion: '456 Oak Rd, Someville USA',
      telefono: '555-5678',
      fecha_de_nacimiento: '1992-11-22',
      fecha_de_ingreso: '2011-09-01',
      fecha_de_egreso: '2015-06-15',
    },
    {
      id: 3,
      dni: '23456789C',
      apellido: 'Gonzalez',
      nombre: 'Rodrigo',
      direccion: '789 Pine St, Villagetown USA',
      telefono: '555-6789',
      fecha_de_nacimiento: '1994-07-10',
      fecha_de_ingreso: '2020-09-01',
      fecha_de_egreso: '2024-04-20',
    },
    {
      id: 4,
      dni: '34567890D',
      apellido: 'Martinez',
      nombre: 'Laura',
      direccion: '321 Birch St, Cityville USA',
      telefono: '555-7890',
      fecha_de_nacimiento: '1995-12-05',
      fecha_de_ingreso: '2018-09-01',
      fecha_de_egreso: '2022-06-15',
    },
    {
      id: 5,
      dni: '45678901E',
      apellido: 'Lopez',
      nombre: 'Carlos',
      direccion: '567 Cedar St, Townsville USA',
      telefono: '555-8901',
      fecha_de_nacimiento: '2001-03-22',
      fecha_de_ingreso: '2022-09-01',
      fecha_de_egreso: '',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [modalData, setModalData] = useState<Student>({
    id: 0,
    dni: '',
    apellido: '',
    nombre: '',
    direccion: '',
    telefono: '',
    fecha_de_nacimiento: '',
    fecha_de_ingreso: '',
    fecha_de_egreso: '',
  });

  const handleAddStudent = () => {
    setModalMode('add');
    setModalData({
      id: 0,
      dni: '',
      apellido: '',
      nombre: '',
      direccion: '',
      telefono: '',
      fecha_de_nacimiento: '',
      fecha_de_ingreso: '',
      fecha_de_egreso: '',
    });
    setShowModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setModalMode('edit');
    setModalData(student);
    setShowModal(true);
  };

  const handleDeleteStudent = (id: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  const handleModalSave = () => {
    if (modalMode === 'add') {
      const newStudent = {
        ...modalData,
        id: students.length + 1,
      };
      setStudents([...students, newStudent]);
    } else if (modalMode === 'edit') {
      setStudents(
        students.map((student) =>
          student.id === modalData.id ? modalData : student,
        ),
      );
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen">
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Estudiantes
            </h1>
            <Button onClick={handleAddStudent}>Agregar Estudiante</Button>
          </div>
          <div className="overflow-hidden rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Apellido</TableHead>
                  <TableHead>DNI</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Fecha de Nacimiento</TableHead>
                  <TableHead>Fecha de Ingreso</TableHead>
                  <TableHead>Fecha de Egreso</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                          <img src="/placeholder.svg" alt={student.nombre} />
                          <AvatarFallback>
                            {student.nombre.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.nombre}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.apellido}</TableCell>
                    <TableCell>{student.dni}</TableCell>
                    <TableCell>{student.direccion}</TableCell>
                    <TableCell>{student.telefono}</TableCell>
                    <TableCell>{student.fecha_de_nacimiento}</TableCell>
                    <TableCell>{student.fecha_de_ingreso}</TableCell>
                    <TableCell>{student.fecha_de_egreso}</TableCell>
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
                          onClick={() => handleEditStudent(student)}
                        >
                          <PenIcon className="size-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <TrashIcon className="size-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {modalMode === 'add' ? 'Agregar Estudiante' : 'Editar Estudiante'}
            </DialogTitle>
            <DialogDescription>
              {modalMode === 'add'
                ? 'Complete los campos para agregar un nuevo estudiante.'
                : 'Complete los campos para editar un estudiante existente.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                value={modalData.nombre}
                onChange={(e) =>
                  setModalData({ ...modalData, nombre: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apellido" className="text-right">
                Apellido
              </Label>
              <Input
                id="apellido"
                value={modalData.apellido}
                onChange={(e) =>
                  setModalData({ ...modalData, apellido: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dni" className="text-right">
                DNI
              </Label>
              <Input
                id="dni"
                value={modalData.dni}
                onChange={(e) =>
                  setModalData({ ...modalData, dni: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direccion" className="text-right">
                Dirección
              </Label>
              <Input
                id="direccion"
                value={modalData.direccion}
                onChange={(e) =>
                  setModalData({ ...modalData, direccion: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefono" className="text-right">
                Teléfono
              </Label>
              <Input
                id="telefono"
                value={modalData.telefono}
                onChange={(e) =>
                  setModalData({ ...modalData, telefono: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fecha_de_nacimiento" className="text-right">
                Fecha de Nacimiento
              </Label>
              <Input
                id="fecha_de_nacimiento"
                type="date"
                value={modalData.fecha_de_nacimiento}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    fecha_de_nacimiento: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fecha_de_ingreso" className="text-right">
                Fecha de Ingreso
              </Label>
              <Input
                id="fecha_de_ingreso"
                type="date"
                value={modalData.fecha_de_ingreso}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    fecha_de_ingreso: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fecha_de_egreso" className="text-right">
                Fecha de Egreso
              </Label>
              <Input
                id="fecha_de_egreso"
                type="date"
                value={modalData.fecha_de_egreso}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    fecha_de_egreso: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleModalSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
