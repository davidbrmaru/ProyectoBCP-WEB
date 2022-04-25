import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { ITeamMember } from 'src/app/models/teammember.model';
import { ChapterAreaLeadService } from 'src/app/services/chapterarealead.service';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { BasicComponent } from 'src/app/components/modal/basic/basic.component';
import { NgForm } from '@angular/forms';
import { IChapterAreaLead } from 'src/app/models/chapterarealead.model';

@Component({
   templateUrl: 'chapterarealead.component.html',
})
export class ChapterAreaLeadComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  chapterAreaLeadList : IChapterAreaLead[] = [];
  nombre :string;
  chapterAreaLead : IChapterAreaLead;
  page: Page = new Page();
  NewEdit:string;
  @ViewChild('registerForm') registerForm: NgForm;

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2,private modalService: BsModalService,
    private chapterAreaLeadService: ChapterAreaLeadService,
    private SimpleModalService: SimpleModalService
  ) {
    this.page.pageSize = 10;
    this.page.currentPage = 0;
  }

  setPage(pageInfo: any) {
    this.page.currentPage = pageInfo.offset+1;
    this.cargarChapterAreaLeads(this.page);
  }
 
  modalRef: BsModalRef;

  openModalNewEdit(template: TemplateRef<any>, chapterAreaLead?: IChapterAreaLead) {
    this.chapterAreaLead = new IChapterAreaLead;
    this.NewEdit = "Nuevo";
    if(chapterAreaLead != undefined){
      this.NewEdit = "Editar";
      this.chapterAreaLead = chapterAreaLead;
    }
    this.modalService.show(template);
  }

  cerrarModal(){
    this.modalService.hide();
  }

  agregarChapterAreaLead(a: NgForm) {
    if(this.NewEdit == "Nuevo"){
    this.chapterAreaLead.usuarioIngresa = "S61121";
    this.chapterAreaLeadService.saveChapterAreaLead(this.chapterAreaLead).subscribe(
        res => {
          this.cerrarModal();
        this.cargarChapterAreaLeads(this.page);
        },
        err => {
          this.cerrarModal();
        }
      )
    }
    else{
      this.editarChapterAreaLead(this.chapterAreaLead);
    }
  }

  editarChapterAreaLead(item: IChapterAreaLead) {
    this.chapterAreaLead.usuarioActualiza = "S61121";
    this.chapterAreaLeadService.updateChapterAreaLead(item).subscribe(
      res => {
        this.cerrarModal();
        this.cargarChapterAreaLeads(this.page);
      },
      err => {
        this.cerrarModal();
      }
    )
  }

  openModalDelete(template: TemplateRef<any>, chapterAreaLead: IChapterAreaLead){
    this.chapterAreaLead = chapterAreaLead; 
    this.modalService.show(template);
  }

  eliminarChapterAreaLead(){
    this.chapterAreaLead.usuarioActualiza = "S61121";
    this.chapterAreaLeadService.deleteChapterAreaLead(this.chapterAreaLead).subscribe(
      res => {
        this.cerrarModal();
        this.cargarChapterAreaLeads(this.page);
      },
      err =>{
        this.cerrarModal();
      }
    )
  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
    this.page.currentPage = 1;
    //this.cargarChapterAreaLeads(this.page);
  }

  cargarChapterAreaLeads(page: Page){
    this.loadingIndicator = true;
    this.chapterAreaLeadService.getChapterAreaLeads(this.page).subscribe(
      res => {
        debugger;
        this.page.currentPage = this.page.currentPage - 1;
        this.chapterAreaLeadList = res.chapterAreaLeaders;
        this.page.totalCount = res.totalRows;
        this.loadingIndicator = false;
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }
}
