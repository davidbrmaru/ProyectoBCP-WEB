import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { ITeamMember } from 'src/app/models/teammember.model';
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
    this.page.currentPage = 1;
    this.page.totalCount = 50;
  }

  setPage(pageInfo : any) {
    this.page.currentPage = pageInfo.offset;
    this.cargarApplications();
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
      this.applicationService.saveApplication(this.application).subscribe(
        res => {
          this.cerrarModal();
          this.cargarApplications();
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
        this.cargarApplications();
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
        this.cargarApplications();
      },
      err =>{
        this.cerrarModal();
      }
    )
  }

  ngOnInit(): void {
    this.cargarApplications();
  }

  cargarApplications(){
    this.loadingIndicator = true;
    this.applicationService.getAllApplications().subscribe(
      res => {
        this.applicationList = res;
        this.loadingIndicator = false;
      },
      err =>{
        this.loadingIndicator = false;
      }
    )
  }
}
