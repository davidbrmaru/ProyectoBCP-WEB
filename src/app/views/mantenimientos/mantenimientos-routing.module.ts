import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamMemberComponent } from './teammember.component';
import { ChapterAreaLeadComponent } from './chapterarealead.component';
import { ChapterLeadComponent } from './chapterlead.component';
import { ApplicationComponent } from './application.component';
import { TribeComponent } from './tribe.component';
import { SquadComponent } from './squad.component';
import { RolComponent } from './rol.component';
import { UsuarioComponent } from './usuario.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Mantenimientos',
    },
    children: [
      {
        path: '',
        redirectTo: 'teammember',
      },
      {
        path: 'teammember',
        component: TeamMemberComponent,
        data: {
          title: 'TeamMember',
        },
      },
      {
        path: 'chapterarealead',
        component: ChapterAreaLeadComponent,
        data: {
          title: 'ChapterAreaLead',
        },
      },
      {
        path: 'chapterlead',
        component: ChapterLeadComponent,
        data: {
          title: 'ChapterLead',
        },
      },
      {
        path: 'application',
        component: ApplicationComponent,
        data: {
          title: 'Application',
        },
      },
      {
        path: 'tribe',
        component: TribeComponent,
        data: {
          title: 'Tribe',
        },
      },
      {
        path: 'squad',
        component: SquadComponent,
        data: {
          title: 'Squad',
        },
      },
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
export class MantenimientosRoutingModule {}
