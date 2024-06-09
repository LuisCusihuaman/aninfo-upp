// config.js
import {
  BarChartIcon,
  CalendarIcon,
  CreditCardIcon,
  DollarSignIcon,
  FileTextIcon,
  HomeIcon,
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
    description: 'Página de inicio del sistema',
    icon: <HomeIcon className={ICON_SIZE_CLASS} />,
    link: '/',
  },
  {
    title: 'Gestión de Tarifas',
    description:
      'Definir y ajustar aranceles anuales para cada uno de los doce meses al comienzo del año académico, y realizar ajustes necesarios en respuesta a cambios económicos como la inflación, asegurando una planificación financiera adecuada y reflejando el costo actual de los servicios educativos. Las tarifas se definen inicialmente, pero pueden ser modificadas según sea necesario.',
    icon: <DollarSignIcon className={ICON_SIZE_CLASS} />,
    link: '/fee-management',
  },
  {
    title: 'Emisión de Facturas',
    description:
      'Generar y emitir facturas mensuales para los alumnos, incluyendo la fecha de emisión, fecha de vencimiento, un número correlativo, los datos del alumno, el detalle del arancel aplicable, y cualquier recargo aplicado. Las facturas se emiten quince días antes del vencimiento de la cuota mensual.',
    icon: <FileTextIcon className={ICON_SIZE_CLASS} />,
    link: '/issuing-invoices',
  },
  {
    title: 'Recepción de Pagos',
    description:
      'Procesar los pagos recibidos a través de Tangerine, actualizando los estados de cuenta de los alumnos y registrando los pagos en su historial financiero. Los pagos fuera de término incluyen un recargo del 5% que se aplica en la siguiente factura.',
    icon: <CreditCardIcon className={ICON_SIZE_CLASS} />,
    link: '/receiving-payments',
  },
  {
    title: 'Gestión de Regularidad',
    description:
      'Monitorizar la regularidad de pago de los alumnos para identificar y gestionar la reincorporación de aquellos en situación de morosidad. Los alumnos con cuatro o más cuotas impagas pierden la regularidad y se requiere un trámite administrativo para su reincorporación.',
    icon: <CalendarIcon className={ICON_SIZE_CLASS} />,
    link: '/regularity-management',
  },
  {
    title: 'Estudiantes',
    description:
      'Gestionar la información de los estudiantes, incluyendo datos personales, estado de regularidad, entre otros.',
    icon: <UsersIcon className={ICON_SIZE_CLASS} />,
    link: '/students',
  },
  {
    title: 'Informes',
    description:
      'Generar informes y estadísticas relacionadas con los aranceles, pagos, facturas, y regularidad de los estudiantes, proporcionando una visión completa y detallada de la gestión financiera académica. Estos informes ayudan en la toma de decisiones administrativas y académicas.',
    icon: <BarChartIcon className={ICON_SIZE_CLASS} />,
    link: '#',
  },
];
