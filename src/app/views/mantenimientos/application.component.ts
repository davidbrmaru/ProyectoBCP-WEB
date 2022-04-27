import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { ApplicationService } from 'src/app/services/application.service';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { BasicComponent } from 'src/app/components/modal/basic/basic.component';
import { NgForm } from '@angular/forms';
import { IApplication } from 'src/app/models/application.model';

@Component({
   templateUrl: 'application.component.html',
})
export class ApplicationComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  applicationList : IApplication[] = [];
  nombre :string;
  application : IApplication;
  page: Page = new Page();
  NewEdit:string;
  @ViewChild('registerForm') registerForm: NgForm;

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2,private modalService: BsModalService,
    private applicationService: ApplicationService,
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
    this.NewEdit = "Nuevo";
    if(application != undefined){
      this.NewEdit = "Editar";
      this.application = application;
    }
    this.modalService.show(template);
  }

  cerrarModal(){
    this.modalService.hide();
  }

  agregarApplication(a: NgForm){ 
    if(this.NewEdit == "Nuevo"){   
      this.application.usuarioIngresa = "S61121";
      this.application.idSquad = 27;
      this.applicationService.saveApplication(this.application).subscribe(
        res => {
          this.cerrarModal();
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
    this.application.usuarioActualiza = "S61121";
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
    debugger;
    this.application = application; 
    this.modalService.show(template);
  }

  eliminarApplication(){
    this.application.usuarioActualiza = "T16587";
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
        this.loadingIndicator = false;
      },
      err =>{
        this.loadingIndicator = false;
      }
    )
  }
}
