import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamMemberComponent } from './teammember.component';
import { ChapterAreaLeadComponent } from './chapterarealead.component';

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
          title: 'TeamMember',
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
