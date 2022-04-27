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
      this.page.currentPage = 0;
    }

    setPage(pageInfo : any) {
      this.page.currentPage = pageInfo.offset +1;
      this.cargarTribes(this.page);
    }
  
    modalRef: BsModalRef;

    openModalNewEdit(template: TemplateRef<any>, tribe?: ITribe) {
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
      this.tribe.usuarioIngresa = "S61121";
        this.tribeService.saveTribe(this.tribe).subscribe(
          res => {
            this.cerrarModal();
            this.page.currentPage = 1;
            this.cargarTribes(this.page);
          },
          err =>{
            this.cerrarModal();
          }
        )
      }else{
        this.editarTribe(this.tribe);
      }
        
      
    }

    editarTribe(item: ITribe){
      this.tribe.usuarioActualiza = "S61121";
      this.tribeService.updateTribe(item).subscribe(
        res => {
          this.cerrarModal();
          this.page.currentPage = this.page.currentPage +1;
          this.cargarTribes(this.page);
        },
        err =>{
          this.cerrarModal();
        }
      )
    }

    openModalDelete(template: TemplateRef<any>, tribe: ITribe){
      this.tribe = tribe; 
      this.modalService.show(template);
    }

    eliminarTribe(){
      this.tribe.usuarioActualiza = "T16587";
      this.tribeService.deleteTribe(this.tribe).subscribe(
        res => {
          this.cerrarModal();
          this.cargarTribes(this.page);
        },
        err =>{
          this.cerrarModal();
        }
      )
    }

    ngOnInit(): void {
      this.setPage({ offset: 0 });
      this.page.currentPage = 1;
      this.cargarTribes(this.page);
    }

    cargarTribes(page: Page){
      this.loadingIndicator = true;
      this.tribeService.getTribes(this.page).subscribe(
        res => {
          this.page.currentPage = this.page.currentPage - 1;
          this.tribeList = res.tribes;
          this.page.totalCount = res.totalRows;
          this.loadingIndicator = false;
        },
        err =>{
          this.loadingIndicator = false;
        }
      )
    }
  }
