import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { IBaseActivo, IBaseActivos, IActivo } from 'src/app/models/baseactivo.model';
import { ITeamMemberResponse } from 'src/app/models/teammember.model';
import { BaseActivosService } from 'src/app/services/baseactivos.service';
import { ChapterLeadService } from 'src/app/services/chapterlead.service';
import { IChapterLead } from 'src/app/models/chapterlead.model';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { BasicComponent } from 'src/app/components/modal/basic/basic.component';
import { NgForm } from '@angular/forms';

@Component({
   templateUrl: 'baseactivos.component.html',
})
export class BaseActivosComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  baseActivoList: IBaseActivos[] = [];
  columns = [{prop:'' , name:''}];
  baseActivo : IBaseActivo;
  matricula: string = "";
  listActivos : IActivo[];
  activo : IActivo;
  
  page: Page = new Page();
  NewEdit:string;
  @ViewChild('registerForm') registerForm: NgForm;

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2,private modalService: BsModalService,
    private baseActivosService: BaseActivosService
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
    
    this.cargarApps();
    this.modalService.show(template);
  }

  cerrarModal(){
    this.modalService.hide();
  }

  agregarTeamMember() {
    this.listActivos.push(this.activo);
  }

  cargarApps(){

  }

  registrarBaseActivo() {

    this.baseActivo.id = this.matricula;
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
        this.loadingIndicator = false;
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }

}
