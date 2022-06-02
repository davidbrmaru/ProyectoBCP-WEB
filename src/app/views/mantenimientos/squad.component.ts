import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { ISquad } from 'src/app/models/squad.model';
import { ITribe } from 'src/app/models/tribe.model';
import { SquadService } from 'src/app/services/squad.service';
import { TribeService } from 'src/app/services/tribe.service';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { BasicComponent } from 'src/app/components/modal/basic/basic.component';
import { NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
   templateUrl: 'squad.component.html',
})
export class SquadComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  squadList : ISquad[] = [];
  excelList : ISquad[] = [];
  tribeList : ITribe[] = [];
  nombre :string;
  squad : ISquad;
  page: Page = new Page();
  NewEdit:string;
  @ViewChild('registerForm') registerForm: NgForm;

  fileName= 'Squad.xlsx';
  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2,private modalService: BsModalService,
    private squadService: SquadService,
    private tribeService: TribeService,
    private SimpleModalService: SimpleModalService
  ) {
    this.page.pageSize = 10;
    this.page.currentPage = 0;
  }

  setPage(pageInfo : any) {
    this.page.currentPage = pageInfo.offset +1;
    this.cargarSquads(this.page);
  }
 
  modalRef: BsModalRef;

  openModalNewEdit(template: TemplateRef<any>, squad?: ISquad) {
    this.squad = new ISquad;
    this.cargarTribes();
    this.NewEdit = "Nuevo";
    if(squad != undefined){
      this.NewEdit = "Editar";
      this.squad = squad;
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

  cargarTribes() {
    this.loadingIndicator = true;
    this.tribeService.getAllTribes().subscribe(
      res => {
        this.tribeList = res;
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

  agregarSquad(a: NgForm) {
    if(this.NewEdit == "Nuevo"){
      this.squad.usuarioIngresa = "S61121";
      this.squadService.saveSquad(this.squad).subscribe(
        res => {
          this.cerrarModal();
          this.page.currentPage = 1;
          this.cargarSquads(this.page);
        },
        err =>{
          this.cerrarModal();
        }
      )
    }
    else{
      this.editarSquad(this.squad);
    }
  }

  editarSquad(item: ISquad){
    this.squad.usuarioActualiza = "S61121";
    this.squadService.updateSquad(item).subscribe(
      res => {
        this.cerrarModal();
        this.page.currentPage = this.page.currentPage +1;
        this.cargarSquads(this.page);
      },
      err =>{
        this.cerrarModal();
      }
    )
  }

  openModalDelete(template: TemplateRef<any>, squad: ISquad){
    this.squad = squad; 
    this.modalService.show(template);
  }

  eliminarSquad(){
    this.squad.usuarioActualiza = "T16587";
    this.squadService.deleteSquad(this.squad).subscribe(
      res => {
        this.cerrarModal();
        this.page.currentPage = this.page.currentPage + 1;
        this.cargarSquads(this.page);
      },
      err =>{
        this.cerrarModal();
      }
    )
  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
    this.page.currentPage = 1;
    this.cargarSquads(this.page);
  }

  cargarSquads(page: Page){
    this.loadingIndicator = true;
    this.squadService.getSquads(this.page).subscribe(
      res => {
        this.page.currentPage = this.page.currentPage - 1;
        this.squadList = res.squads;
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
    this.squadService.getAllSquads().subscribe(
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
