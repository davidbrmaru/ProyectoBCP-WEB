import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule, TableModule, ButtonModule, ModalModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { TeamMemberComponent } from './teammember.component';
import { ChapterAreaLeadComponent } from './chapterarealead.component';
import { ChapterLeadComponent } from './chapterlead.component';

// Theme Routing
import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MantenimientosRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    TableModule,
    ButtonModule,
    NgxDatatableModule,
    ModalModule
  ],
  declarations: [
    TeamMemberComponent,
    ChapterAreaLeadComponent,
    ChapterLeadComponent
    //MantenimientosTeamMemberComponent,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MantenimientosModule {
}
