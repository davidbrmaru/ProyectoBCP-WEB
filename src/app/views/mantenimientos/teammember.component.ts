import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { ITeamMember } from 'src/app/models/teammember.model';
import { ITeamMemberResponse } from 'src/app/models/teammember.model';
import { TeamMemberService } from 'src/app/services/teammember.service';
import { ChapterLeadService } from 'src/app/services/chapterlead.service';
import { IChapterLead } from 'src/app/models/chapterlead.model';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { BasicComponent } from 'src/app/components/modal/basic/basic.component';
import { NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
   templateUrl: 'teammember.component.html',
})
export class TeamMemberComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  teamMemberList: ITeamMember[] = [];
  excelList : ITeamMember[] = [];
  chapterLeadList: IChapterLead[] = [];
  nombre :string;
  columns = [{prop:'' , name:''}];
  teammember: ITeamMember;
  
  page: Page = new Page();
  NewEdit:string;
  @ViewChild('registerForm') registerForm: NgForm;

  fileName= 'TeamMember.xlsx';
  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2,private modalService: BsModalService,
    private teamMemberService: TeamMemberService,
    private chapterLeadService: ChapterLeadService,
    private SimpleModalService: SimpleModalService
  ) {
    this.page.pageSize = 10;
    this.page.currentPage = 0;
  }

  setPage(pageInfo: any) {
    this.page.currentPage = pageInfo.offset+1;
    this.cargarTeamMembers(this.page);
  }
 
  modalRef: BsModalRef;

  openModalNewEdit(template: TemplateRef<any>, teamMember?: ITeamMember) {
    this.teammember = new ITeamMember;
    this.cargarChapterLeader();
    this.NewEdit = "Nuevo";
    if(teamMember != undefined){
      this.NewEdit = "Editar";
      this.teammember = teamMember;
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

  agregarTeamMember(a: NgForm) {
    if (this.NewEdit == "Nuevo") {
      this.teamMemberService.saveTeamMember(this.teammember).subscribe(
        res => {
          this.cerrarModal();
          this.page.currentPage = 1;
          this.cargarTeamMembers(this.page);
        },
        err => {
          this.cerrarModal();
        }
      )
    }
    else{
      this.editarTeamMember(this.teammember);
    }
  }

  cargarChapterLeader() {
    this.chapterLeadService.getAllChapterLeads().subscribe(
      res => {
        this.chapterLeadList = res;
        this.loadingIndicator = false;
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }

  editarTeamMember(item: ITeamMember) {
    this.teamMemberService.updateTeamMember(item).subscribe(
      res => {
        this.cerrarModal();
        this.cargarTeamMembers(this.page);
      },
      err => {
        this.cerrarModal();
      }
    )
  }

  openModalDelete(template: TemplateRef<any>, teamMember: ITeamMember){
    this.teammember = teamMember; 
    this.modalService.show(template);
  }

  eliminarTeamMember(){
    this.teamMemberService.deleteTeamMember(this.teammember).subscribe(
      res => {
        this.cerrarModal();
        this.page.currentPage = this.page.currentPage + 1;
        this.cargarTeamMembers(this.page);
        
      },
      err => {
        this.cerrarModal();
      }
    )
  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
    this.page.currentPage = 1;
    this.cargarTeamMembers(this.page);
  }

  cargarTeamMembers(page: Page) {
    this.loadingIndicator = true;
    this.teamMemberService.getTeamMembers(this.page).subscribe(
      res=> {
        this.page.currentPage = this.page.currentPage - 1;
        this.teamMemberList = res.teamMembers;
        this.page.totalCount = res.totalRows;
        this.loadingIndicator = false;
        this.cargarExcelList();
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }

  cargarExcelList() {
    this.loadingIndicator = true;
    this.teamMemberService.getAllTeamMembers().subscribe(
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
