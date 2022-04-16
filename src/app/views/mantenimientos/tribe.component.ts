import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { ITribe } from 'src/app/models/tribe.model';
import { TribeService } from 'src/app/services/tribe.service';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { BasicComponent } from 'src/app/components/modal/basic/basic.component';
import { NgForm } from '@angular/forms';

@Component({
   templateUrl: 'tribe.component.html',
})
export class TribeComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  tribeList : ITribe[] = [];
  nombre :string;
  columns = [{prop:'' , name:''}];
  tribe : ITribe;
  page: Page = new Page();
  NewEdit:string;
  @ViewChild('registerForm') registerForm: NgForm;

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2,private modalService: BsModalService,
    private tribeService: TribeService,
    private SimpleModalService: SimpleModalService
  ) {
    this.page.pageSize = 10;
    this.page.currentPage = 1;
    this.page.totalCount = 50;
  }

  setPage(pageInfo : any) {
    this.page.currentPage = pageInfo.offset;
    this.cargarTribes();
  }
 
  modalRef: BsModalRef;

  openModalNewEdit(template: TemplateRef<any>, tribe?: ITribe) {
    debugger;
    this.tribe = new ITribe;
    this.NewEdit = "Nuevo";
    if(tribe != undefined){
      this.NewEdit = "Editar";
      this.tribe = tribe;
    }
    this.modalService.show(template);
  }

  cerrarModal(){
    this.modalService.hide();
  }

  agregarTribe(a: NgForm) {
    if(this.NewEdit == "Nuevo"){
      debugger;
      this.tribeService.saveTribe(this.tribe).subscribe(
        res => {
          this.cerrarModal();
          this.cargarTribes();
        },
        err =>{
          this.cerrarModal();
        }
      )
    }else{
      debugger;
      this.editarTeamMember(this.tribe);
    }
      
    
  }

  editarTeamMember(item: ITribe){
    this.tribeService.updateTribe(item).subscribe(
      res => {
        this.cerrarModal();
        this.cargarTribes();
      },
      err =>{
        this.cerrarModal();
      }
    )
  }

  openModalDelete(template: TemplateRef<any>, tribe: ITribe){
    debugger;
    this.tribe = tribe; 
    this.modalService.show(template);
  }

  eliminarTribe(){
    this.tribe.usuario_actualiza = "T16587";
    this.tribeService.deleteTribe(this.tribe).subscribe(
      res => {
        this.cerrarModal();
        this.cargarTribes();
      },
      err =>{
        this.cerrarModal();
      }
    )
  }

  ngOnInit(): void {
    this.cargarTribes();
  }

  cargarTribes(){
    this.loadingIndicator = true;
    this.tribeService.getAllTribes().subscribe(
      res => {
        this.tribeList = res;
        this.loadingIndicator = false;
      },
      err =>{
        this.loadingIndicator = false;
      }
    )
  }
}
