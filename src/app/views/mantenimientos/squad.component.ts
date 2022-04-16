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
  columns = [{prop:'' , name:''}];
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
    this.page.currentPage = 1;
    this.page.totalCount = 50;
  }

  setPage(pageInfo : any) {
    this.page.currentPage = pageInfo.offset;
    this.cargarSquads();
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
    debugger;
      this.squadService.saveSquad(this.squad).subscribe(
        res => {
          this.cerrarModal();
          this.cargarSquads();
        },
        err =>{
          this.cerrarModal();
        }
      )
    
  }

  editarSquad(item: ISquad){
    this.squadService.updateSquad(item).subscribe(
      res => {
        this.cerrarModal();
        this.cargarSquads();
      },
      err =>{
        this.cerrarModal();
      }
    )
  }

  openModalDelete(template: TemplateRef<any>, squad: ISquad){
    debugger;
    this.squad = squad; 
    this.modalService.show(template);
  }

  eliminarSquad(){
    this.squadService.deleteSquad(this.squad.id).subscribe(
      res => {
        this.cerrarModal();
        this.cargarSquads();
      },
      err =>{
        this.cerrarModal();
      }
    )
  }

  ngOnInit(): void {
    this.cargarSquads();
  }

  cargarSquads(){
    this.loadingIndicator = true;
    this.squadService.getAllSquads().subscribe(
      res => {
        this.squadList = res;
        this.loadingIndicator = false;
      },
      err =>{
        this.loadingIndicator = false;
      }
    )
  }
}
