import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule, TableModule, ButtonModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { TeamMemberComponent, MantenimientosTeamMemberComponent } from './teammember.component';

// Theme Routing
import { MantenimientosRoutingModule } from './mantenimientos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MantenimientosRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    TableModule,
    ButtonModule
  ],
  declarations: [
    TeamMemberComponent,
    MantenimientosTeamMemberComponent,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MantenimientosModule {
}
