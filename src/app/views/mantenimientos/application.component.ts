import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { IApplication } from 'src/app/models/application.model';
import { ISquad } from 'src/app/models/squad.model';
import { ApplicationService } from 'src/app/services/application.service';
import { SquadService } from 'src/app/services/squad.service';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { BasicComponent } from 'src/app/components/modal/basic/basic.component';
import { NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
   templateUrl: 'application.component.html',
})
export class ApplicationComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  applicationList : IApplication[] = [];
  excelList : IApplication[] = [];
  squadList : ISquad[] = [];
  nombre :string;
  application : IApplication;
  page: Page = new Page();
  NewEdit:string;
  @ViewChild('registerForm') registerForm: NgForm;

  fileName= 'Application.xlsx';
  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2,private modalService: BsModalService,
    private applicationService: ApplicationService,
    private squadService: SquadService,
    private SimpleModalService: SimpleModalService
  ) {
    this.page.pageSize = 10;
    this.page.currentPage = 0;
  }

  setPage(pageInfo : any) {
    this.page.currentPage = pageInfo.offset+1;
    this.cargarApplications(this.page);
  }
 
  modalRef: BsModalRef;

  openModalNewEdit(template: TemplateRef<any>, application?: IApplication) {
    this.application = new IApplication;
    this.cargarSquads();
    this.NewEdit = "Nuevo";
    if(application != undefined){
      this.NewEdit = "Editar";
      this.application = application;
    }
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

  cargarSquads() {
    this.loadingIndicator = true;
    this.squadService.getAllSquads().subscribe(
      res => {
        this.squadList = res;
        this.loadingIndicator = false;
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }

  cerrarModal(){
    this.modalService.hide();
  }

  agregarApplication(a: NgForm){ 
    if(this.NewEdit == "Nuevo"){   
      this.applicationService.saveApplication(this.application).subscribe(
        res => {
          this.cerrarModal();
          this.page.currentPage = 1;
          this.cargarApplications(this.page);
        },
        err =>{
          this.cerrarModal();
        }
      )
    }
    else{
      this.editarApplication(this.application);
    }
  }

  editarApplication(item: IApplication){
    this.applicationService.updateApplication(item).subscribe(
      res => {
        this.cerrarModal();
        this.cargarApplications(this.page);
      },
      err =>{
        this.cerrarModal();
      }
    )
  }

  openModalDelete(template: TemplateRef<any>, application: IApplication){
    this.application = application; 
    this.modalService.show(template);
  }

  eliminarApplication(){
    this.applicationService.deleteApplication(this.application).subscribe(
      res => {
        this.cerrarModal();
        this.cargarApplications(this.page);
      },
      err =>{
        this.cerrarModal();
      }
    )
  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
    this.page.currentPage = 1;
    this.cargarApplications(this.page);
  }

  cargarApplications(page: Page){
    this.loadingIndicator = true;
    this.applicationService.getApplications(this.page).subscribe(
      res => {
        this.page.currentPage = this.page.currentPage - 1;
        this.applicationList = res.applications;
        this.page.totalCount = res.totalRows;
        this.cargarExcelList();
        this.loadingIndicator = false;
      },
      err =>{
        this.loadingIndicator = false;
      }
    )
  }

  cargarExcelList() {
    this.loadingIndicator = true;
    this.applicationService.getAllApplications().subscribe(
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
