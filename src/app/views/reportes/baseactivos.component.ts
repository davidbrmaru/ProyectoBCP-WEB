import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA, DefaultIterableDiffer } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { IBaseActivo, IBaseActivos, IActivo, IActivoTable } from 'src/app/models/baseactivo.model';
import { ITeamMemberResponse } from 'src/app/models/teammember.model';
import { BaseActivosService } from 'src/app/services/baseactivos.service';
import { ApplicationService } from 'src/app/services/application.service';
import { IApplication } from 'src/app/models/application.model';
import { TeamMemberService } from 'src/app/services/teammember.service';
import { ITeamMember } from 'src/app/models/teammember.model';
import { IUsuario } from 'src/app/models/usuario.model';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { BasicComponent } from 'src/app/components/modal/basic/basic.component';
import { NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
   templateUrl: 'baseactivos.component.html',
})
export class BaseActivosComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  baseActivoList: IBaseActivos[] = [];
  excelList : IBaseActivos[] = [];
  columns = [{prop:'' , name:''}];
  baseActivo : IBaseActivo = new IBaseActivo();
  applicationList: IApplication[] = [];
  teamMemberList: ITeamMember[] = [];
  matricula: string = "";
  listActivos : IActivo[] = [];
  activo : IActivo = new IActivo();
  activosListTable: IActivoTable[] = [];
  activoTable: IActivoTable = new IActivoTable();
  usuario: IUsuario = new IUsuario();
  indexBorrar : number;
  mensaje :string = "";
  total : number = 0;
  repetido : number = 0;
  
  page: Page = new Page();
  NewEdit:string;
  @ViewChild('registerForm') registerForm: NgForm;

  fileName= 'BaseActivos.xlsx';
  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2,private modalService: BsModalService,
    private applicationService: ApplicationService,
    private teamMemberService: TeamMemberService,
    private baseActivosService: BaseActivosService,
    private SimpleModalService: SimpleModalService
  ) {
    this.page.pageSize = 10;
    this.page.currentPage = 0;
  }

  setPage(pageInfo: any) {
    this.page.currentPage = pageInfo.offset+1;
    this.cargarBaseActivos(this.page);
  }
 
  modalRef: BsModalRef;

  openModalAdd(template: TemplateRef<any>) {  
    this.cargarTeamMember();
    this.cargarApplication();
    this.total = 0;
    this.repetido = 0;
    this.mensaje = "";
    this.activo = new IActivo();
    this.activoTable = new IActivoTable();
    this.listActivos = [];
    this.activosListTable = [];
    this.modalService.show(template);
  }

  exportar(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

  cerrarModal(){
    this.modalService.hide();
  }

  agregarTeamMember() {
    this.mensaje = "";
    this.total = 0;
    this.repetido = 0;
    if(this.activosListTable.length > 0){
      if(this.activoTable.matricula != this.activosListTable[0].matricula){
        this.mensaje = "Estas ingresando la matricula de otro teammember";
        return;
      }
    }
    else{
      if(this.activoTable.porcentaje > 100){
        this.mensaje = "Estas superando el 100% de la capacidad del teammember";
        return;  
      }
    }
    this.activosListTable.forEach((item,index) => {
      this.total += item.porcentaje;
      if( item.aplicacion == this.activoTable.aplicacion){
        this.mensaje = "Estas ingresando la aplicacion "+ this.activoTable.aplicacion +" otra vez";
        this.repetido=1;
      }
    });
    if(this.repetido > 0){
      this.repetido = 0;
      return;
    }

    this.total += this.activoTable.porcentaje;

    if(this.total > 100){
      this.mensaje = "Estas superando el 100% de la capacidad del teammember";
      return;
    }
    this.activosListTable.push(this.activoTable);
    this.matricula = this.activoTable.matricula;
    this.activoTable = new IActivoTable();
    this.activoTable.matricula = this.matricula;
  }

  borrarTeamMember(activo: any){
    this.activosListTable.forEach((item, index) => {
      if(item.aplicacion == activo.aplicacion && item.matricula == activo.matricula
        && item.porcentaje == activo.porcentaje && item.comentario == activo.comentario) {
          // Si el elemento coincide, actualizar variable
          this.total -= activo.porcentaje;
          this.indexBorrar = index;
          // No hay posibilidad de usar break para cancelar
          // En todo caso, si son muchos elementos, conviene mejor usar un ciclo for
      }
    });
    this.activosListTable.splice(this.indexBorrar, 1);
  }

  cargarApplication() {
    this.applicationService.getAllApplications().subscribe(
      res => {
        this.applicationList = res;
        this.loadingIndicator = false;
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }

  cargarTeamMember() {
    this.teamMemberService.getAllTeamMembers().subscribe(
      res => {
        this.teamMemberList = res;
        this.loadingIndicator = false;
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }

  cerrarPeriodo(){
    
  }

  registrarBaseActivo() {
    this.activosListTable.forEach((item, index) => {
      this.activo = new IActivo();
      this.activo.idApplication = item.aplicacion.split("-")[0];
      this.activo.porcentaje = item.porcentaje;
      this.activo.comentario = item.comentario;
      this.listActivos.push(this.activo);
    });

    if(this.listActivos.length <= 0){
      this.mensaje = "Debes agregar al menos 1 registro del teammember";
      return;
    }
    this.total = 0;
    this.baseActivo.idUser = this.matricula.split("-")[0];
    this.baseActivo.applications = this.listActivos;
    
    this.baseActivosService.saveBaseActivo(this.baseActivo).subscribe(
    res => {
        this.cerrarModal();
        this.page.currentPage = 1;
        this.cargarBaseActivos(this.page);
    },
    err => {
        this.cerrarModal();
    }
    )
   
  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
    this.page.currentPage = 1;
    this.cargarBaseActivos(this.page);
    
  }

  cargarBaseActivos(page: Page) {
    this.loadingIndicator = true;
    this.baseActivosService.getBaseActivos(this.page).subscribe(
      res => {
        this.page.currentPage = this.page.currentPage - 1;
        this.baseActivoList = res.baseActivos;
        this.page.totalCount = res.totalRows;
        this.cargarExcelList();
        this.loadingIndicator = false;
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }

  cargarExcelList() {
    this.loadingIndicator = true;
    this.baseActivosService.getAllBaseActivos().subscribe(
      res => {
        this.excelList = res;
        this.loadingIndicator = false;
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }

  

}
