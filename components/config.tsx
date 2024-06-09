// config.js
import {
  BarChartIcon,
  BriefcaseIcon,
  CalendarIcon,
  CreditCardIcon,
  DollarSignIcon,
  FileTextIcon,
  HomeIcon,
  TicketIcon,
  UsersIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

export type MenuItem = {
  title: string;
  description?: string;
  icon: ReactNode;
  link: string;
};

export const ICON_SIZE_CLASS = 'size-5';

export const menuItems: MenuItem[] = [
  {
    title: 'Inicio',
    icon: <HomeIcon className={ICON_SIZE_CLASS} />,
    link: '/',
  },
  {
    title: 'Gestión de Tarifas',
    icon: <DollarSignIcon className={ICON_SIZE_CLASS} />,
    link: '/fee-management',
  },
  {
    title: 'Emisión de Facturas',
    icon: <FileTextIcon className={ICON_SIZE_CLASS} />,
    link: '/issuing-invoices',
  },
  {
    title: 'Recepción de Pagos',
    icon: <CreditCardIcon className={ICON_SIZE_CLASS} />,
    link: '/receiving-payments',
  },
  {
    title: 'Gestión de Regularidad',
    icon: <CalendarIcon className={ICON_SIZE_CLASS} />,
    link: '/regularity-management',
  },
  {
    title: 'Estudiantes',
    icon: <UsersIcon className={ICON_SIZE_CLASS} />,
    link: '/students',
  },
  {
    title: 'Informes',
    icon: <BarChartIcon className={ICON_SIZE_CLASS} />,
    link: '/reports',
  },
];
