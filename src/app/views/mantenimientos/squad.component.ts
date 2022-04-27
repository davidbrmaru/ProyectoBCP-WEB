import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { ISquad } from 'src/app/models/squad.model';
import { SquadService } from 'src/app/services/squad.service';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { BasicComponent } from 'src/app/components/modal/basic/basic.component';
import { NgForm } from '@angular/forms';

@Component({
   templateUrl: 'squad.component.html',
})
export class SquadComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  squadList : ISquad[] = [];
  nombre :string;
  squad : ISquad;
  page: Page = new Page();
  NewEdit:string;
  @ViewChild('registerForm') registerForm: NgForm;

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2,private modalService: BsModalService,
    private squadService: SquadService,
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
    this.NewEdit = "Nuevo";
    if(squad != undefined){
      this.NewEdit = "Editar";
      this.squad = squad;
    }
    this.modalService.show(template);
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
        this.loadingIndicator = false;
      },
      err =>{
        this.loadingIndicator = false;
      }
    )
  }
}
