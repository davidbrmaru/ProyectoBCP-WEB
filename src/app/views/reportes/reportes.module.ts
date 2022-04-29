import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule, TableModule, ButtonModule, ModalModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { BaseActivosComponent } from './baseactivos.component';


// Theme Routing
import { ReportesRoutingModule } from './reportes-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReportesRoutingModule,
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
    BaseActivosComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ReportesModule {
}
