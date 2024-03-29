import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Inicio',
    url: '/dashboard',
    iconComponent: { name: 'cil-home' },
    
  },
  {
    title: true,
    name: 'Mantenimientos'
  },
  {
    name: 'Team Member',
    url: '/mantenimientos/teammember',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Chapter Lead',
    url: '/mantenimientos/chapterlead',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Chapter Area Lead',
    url: '/mantenimientos/chapterarealead',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Application',
    url: '/mantenimientos/application',
    iconComponent: { name: 'cil-code' }
  },
  {
    name: 'Squad',
    url: '/mantenimientos/squad',
    iconComponent: { name: 'cil-cursor' }
  
  },
  {
    name: 'Tribe',
    url: '/mantenimientos/tribe',
    iconComponent: { name: 'cil-notes' }
  },
  {
    title: true,
    name: 'Reportes'
  },
  {
    name: 'Base de Activos',
    url: '/reportes/baseactivos',
    iconComponent: { name: 'cil-file' }
  },
  {
    title: true,
    name: 'Configuración'
  },{
    name: 'Rol',
    url: '/configuracion/rol',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Usuario',
    url: '/configuracion/usuario',
    iconComponent: { name: 'cil-user' }

  },

  
];
