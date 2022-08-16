import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule, TableModule, ButtonModule, ModalModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { RolComponent } from './rol.component';
import { UsuarioComponent } from './usuario.component';


// Theme Routing
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ConfiguracionRoutingModule,
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
    RolComponent,
    UsuarioComponent,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ConfiguracionModule {
}
