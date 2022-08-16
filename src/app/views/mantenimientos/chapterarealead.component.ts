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
import * as XLSX from 'xlsx';

@Component({
   templateUrl: 'chapterarealead.component.html',
})
export class ChapterAreaLeadComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  chapterAreaLeadList : IChapterAreaLead[] = [];
  excelList : IChapterAreaLead[] = [];
  nombre :string;
  chapterAreaLead : IChapterAreaLead;
  page: Page = new Page();
  NewEdit:string;
  @ViewChild('registerForm') registerForm: NgForm;

  fileName= 'ChapterAreaLead.xlsx';
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

  agregarChapterAreaLead(a: NgForm) {
    if(this.NewEdit == "Nuevo"){
    this.chapterAreaLeadService.saveChapterAreaLead(this.chapterAreaLead).subscribe(
        res => {
          this.cerrarModal();
          this.page.currentPage = 1;
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
  }

  cargarChapterAreaLeads(page: Page){
    this.loadingIndicator = true;
    this.chapterAreaLeadService.getChapterAreaLeads(this.page).subscribe(
      res => {
        this.page.currentPage = this.page.currentPage - 1;
        this.chapterAreaLeadList = res.chapterAreaLeaders;
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
    this.chapterAreaLeadService.getAllChapterAreaLeads().subscribe(
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
