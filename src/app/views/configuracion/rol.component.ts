import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { IRol } from 'src/app/models/rol.model';
import { RolService } from 'src/app/services/rol.service';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { BasicComponent } from 'src/app/components/modal/basic/basic.component';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: 'rol.component.html',
})
export class RolComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  rolList: IRol[] = [];
  nombre: string;
  rol: IRol;
  page: Page = new Page();
  NewEdit: string;
  @ViewChild('registerForm') registerForm: NgForm;

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2, private modalService: BsModalService,
    private rolService: RolService,
    private SimpleModalService: SimpleModalService
  ) {
    this.page.pageSize = 10;
    this.page.currentPage = 1;
  }

  setPage(pageInfo: any) {
    this.page.currentPage = pageInfo.offset + 1;
    this.cargarRol(this.page);
  }

  modalRef: BsModalRef;

  openModalNewEdit(template: TemplateRef<any>, rol?: IRol) {
    this.rol = new IRol;
    this.NewEdit = "Nuevo";
    if (rol != undefined) {
      this.NewEdit = "Editar";
      this.rol = rol;
    }
    this.modalService.show(template);
  }

  cerrarModal() {
    this.modalService.hide();
  }

  agregarRol(a: NgForm) {
    if (this.NewEdit == "Nuevo") {
      this.rolService.saveRol(this.rol).subscribe(
        res => {
          this.cerrarModal();
          this.page.currentPage = 1;
          this.cargarRol(this.page);
        },
        err => {
          this.cerrarModal();
        }
      )
    }
    else {
      this.editarRol(this.rol);
    }
  }

  editarRol(item: IRol) {
    this.rolService.updateRol(item).subscribe(
      res => {
        this.cerrarModal();
        this.cargarRol(this.page);
      },
      err => {
        this.cerrarModal();
      }
    )
  }

  openModalDelete(template: TemplateRef<any>, application: IRol) {
    this.rol = application;
    this.modalService.show(template);
  }

  eliminarRol() {
    this.rolService.deleteRol(this.rol).subscribe(
      res => {
        this.cerrarModal();
        this.cargarRol(this.page);
      },
      err => {
        this.cerrarModal();
      }
    )
  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
    this.page.currentPage = 1;
    this.cargarRol(this.page);
  }

  cargarRol(page: Page) {
    this.loadingIndicator = true;
    this.rolService.getRols(this.page).subscribe(
      res => {
        this.page.currentPage = this.page.currentPage - 1;
        
        this.rolList = res.rols;
        this.page.totalCount = res.totalRows;
        this.loadingIndicator = false;
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }
}
