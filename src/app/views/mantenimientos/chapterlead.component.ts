import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { ITeamMember } from 'src/app/models/teammember.model';
import { ChapterLeadService } from 'src/app/services/chapterlead.service';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { BasicComponent } from 'src/app/components/modal/basic/basic.component';
import { NgForm } from '@angular/forms';
import { IChapterLead } from 'src/app/models/chapterlead.model';

@Component({
   templateUrl: 'chapterlead.component.html',
})
export class ChapterLeadComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  chapterLeadList : IChapterLead[] = [];
  nombre :string;
  chapterLead : IChapterLead;
  page: Page = new Page();
  NewEdit:string;
  @ViewChild('registerForm') registerForm: NgForm;

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2,private modalService: BsModalService,
    private chapterLeadService: ChapterLeadService,
    private SimpleModalService: SimpleModalService
  ) {
    this.page.pageSize = 10;
    this.page.currentPage = 1;
    this.page.totalCount = 50;
  }

  setPage(pageInfo : any) {
    this.page.currentPage = pageInfo.offset;
    this.cargarChapterLeads();
  }
 
  modalRef: BsModalRef;

  openModalNewEdit(template: TemplateRef<any>, chapterAreaLead?: IChapterLead) {
    this.chapterLead = new IChapterLead;
    this.NewEdit = "Nuevo";
    if(chapterAreaLead != undefined){
      this.NewEdit = "Editar";
      this.chapterLead = chapterAreaLead;
    }
    this.modalService.show(template);
  }

  cerrarModal(){
    this.modalService.hide();
  }

  agregarChapterLead(a: NgForm){ 
    if(this.NewEdit == "Nuevo"){ 
      this.chapterLeadService.saveChapterLead(this.chapterLead).subscribe(
        res => {
          this.cerrarModal();
          this.cargarChapterLeads();
        },
        err =>{
          this.cerrarModal();
        }
      )
    }
    else{
      this.editarChapterLead(this.chapterLead);
    }
  }

  editarChapterLead(item: IChapterLead){
    this.chapterLeadService.updateChapterLead(item).subscribe(
      res => {
        this.cerrarModal();
        this.cargarChapterLeads();
      },
      err =>{
        this.cerrarModal();
      }
    )
  }

  openModalDelete(template: TemplateRef<any>, chapterLead: IChapterLead){
    debugger;
    this.chapterLead = chapterLead; 
    this.modalService.show(template);
  }

  eliminarChapterLead(){
    this.chapterLeadService.deleteChapterLead(this.chapterLead.id).subscribe(
      res => {
        this.cerrarModal();
        this.cargarChapterLeads();
      },
      err =>{
        this.cerrarModal();
      }
    )
  }

  ngOnInit(): void {
    this.cargarChapterLeads();
  }

  cargarChapterLeads(){
    this.loadingIndicator = true;
    this.chapterLeadService.getAllChapterLeads().subscribe(
      res => {
        this.chapterLeadList = res;
        this.loadingIndicator = false;
      },
      err =>{
        this.loadingIndicator = false;
      }
    )
  }
}