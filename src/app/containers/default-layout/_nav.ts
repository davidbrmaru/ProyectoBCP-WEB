import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Base de Activos',
    url: '/dashboard',
    iconComponent: { name: 'cil-home' },
    badge: {
      color: 'info',
      text: 'Nuevo'
    }
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
    name: 'Chapter Area Lead',
    url: '/mantenimientos/chapterarealead',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Chapter Lead',
    url: '/mantenimientos/chapterlead',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Application',
    url: '/mantenimientos/application',
    iconComponent: { name: 'cil-code' }
  },
  {
    name: 'Tribe',
    url: '/mantenimientos/tribe',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Squad',
    url: '/mantenimientos/squad',
    iconComponent: { name: 'cil-check' }
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
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login'
      },
      {
        name: 'Register',
        url: '/register'
      },
      {
        name: 'Error 404',
        url: '/404'
      },
      {
        name: 'Error 500',
        url: '/500'
      }
    ]
  },
];
