import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RolComponent } from './rol.component';
import { UsuarioComponent } from './usuario.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Configuracion',
    },
    children: [
      
      {
        path: 'rol',
        component: RolComponent,
        data: {
          title: 'Rol',
        },
      },
      {
        path: 'usuario',
        component: UsuarioComponent,
        data: {
          title: 'Usuario',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionRoutingModule {}
