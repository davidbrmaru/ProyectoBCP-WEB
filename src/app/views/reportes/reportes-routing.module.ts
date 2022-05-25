import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseActivosComponent } from './baseactivos.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reportes',
    },
    children: [
      {
        path: '',
        redirectTo: 'baseactivos',
      },
      {
        path: 'baseactivos',
        component: BaseActivosComponent,
        data: {
          title: 'BaseActivos',
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
