import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { ITeamMember } from 'src/app/models/teammember.model';
import { ChapterLeadService } from 'src/app/services/chapterlead.service';
import { ChapterAreaLeadService } from 'src/app/services/chapterarealead.service';
import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { BasicComponent } from 'src/app/components/modal/basic/basic.component';
import { NgForm } from '@angular/forms';
import { IChapterLead } from 'src/app/models/chapterlead.model';
import { IChapterAreaLead } from 'src/app/models/chapterarealead.model';
import * as XLSX from 'xlsx';

@Component({
   templateUrl: 'chapterlead.component.html',
})
export class ChapterLeadComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  chapterLeadList: IChapterLead[] = [];
  excelList : IChapterLead[] = [];
  chapterAreaLeadList: IChapterAreaLead[] = [];
  nombre :string;
  chapterLead : IChapterLead;
  page: Page = new Page();
  NewEdit:string;
  @ViewChild('registerForm') registerForm: NgForm;

  fileName= 'ChapterLead.xlsx';
  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2,private modalService: BsModalService,
    private chapterLeadService: ChapterLeadService,
    private chapterAreaLeadService: ChapterAreaLeadService,
    private SimpleModalService: SimpleModalService
  ) {
    this.page.pageSize = 10;
    this.page.currentPage = 0;
  }

  setPage(pageInfo : any) {
    this.page.currentPage = pageInfo.offset + 1;
    this.cargarChapterLeads(this.page);
  }
 
  modalRef: BsModalRef;

  openModalNewEdit(template: TemplateRef<any>, chapterAreaLead?: IChapterLead) {
    this.chapterLead = new IChapterLead;
    this.cargarChapterAreaLeads();
    this.NewEdit = "Nuevo";
    if(chapterAreaLead != undefined){
      this.NewEdit = "Editar";
      this.chapterLead = chapterAreaLead;
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

  agregarChapterLead(a: NgForm){ 
    if (this.NewEdit == "Nuevo") {
      this.chapterLeadService.saveChapterLead(this.chapterLead).subscribe(
        res => {
          this.cerrarModal();
          this.page.currentPage = 1;
          this.cargarChapterLeads(this.page);
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

  editarChapterLead(item: IChapterLead) {
    this.chapterLeadService.updateChapterLead(item).subscribe(
      res => {
        this.cerrarModal();
        this.cargarChapterLeads(this.page);
      },
      err =>{
        this.cerrarModal();
      }
    )
  }

  openModalDelete(template: TemplateRef<any>, chapterLead: IChapterLead){
    this.chapterLead = chapterLead; 
    this.modalService.show(template);
  }

  eliminarChapterLead(){
    this.chapterLeadService.deleteChapterLead(this.chapterLead).subscribe(
      res => {
        this.cerrarModal();
        this.cargarChapterLeads(this.page);
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

  cargarChapterLeads(page: Page){
    this.loadingIndicator = true;
    this.chapterLeadService.getChapterLeads(this.page).subscribe(
      res => {  
        this.page.currentPage = this.page.currentPage - 1;
        this.chapterLeadList = res.chapterLeaders;
        this.page.totalCount = res.totalRows;
        this.chapterLeadList.forEach((item, index) => {
          this.chapterLeadList[index].totalTeamMember = item.teamMembers.length;
          this.chapterLeadList[index].totalTeamMemberBCP= item.teamMembers.filter(x => x.tipoProveedor.includes("ORGÁNICO")).length;
          this.chapterLeadList[index].totalTeamMemberProveedor = item.teamMembers.filter(x => x.tipoProveedor.includes("PROVEEDOR")).length;
        })
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
    this.chapterLeadService.getAllChapterLeads().subscribe(
      res => {
        this.excelList = res;
        this.loadingIndicator = false;
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }
  cargarChapterAreaLeads() {
    this.loadingIndicator = true;
    this.chapterAreaLeadService.getAllChapterAreaLeads().subscribe(
      res => {
        this.chapterAreaLeadList = res;
        this.loadingIndicator = false;
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }
}
