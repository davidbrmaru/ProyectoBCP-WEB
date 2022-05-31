import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { IUsuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolService } from 'src/app/services/rol.service';
import { IRol } from 'src/app/models/rol.model';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { BasicComponent } from 'src/app/components/modal/basic/basic.component';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: 'usuario.component.html',
})
export class UsuarioComponent implements OnInit {

  loadingIndicator: boolean;
  reorderable = true;
  usuarioList: IUsuario[] = [];
  rolList: IRol[] = [];
  nombre: string;
  usuario: IUsuario;
  page: Page = new Page();
  NewEdit: string;
  @ViewChild('registerForm') registerForm: NgForm;

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2, private modalService: BsModalService,
    private usuarioService: UsuarioService,
    private SimpleModalService: SimpleModalService,
    private rolService: RolService,
  ) {
    this.page.pageSize = 10;
    this.page.currentPage = 1;
  }

  setPage(pageInfo: any) {
    this.page.currentPage = pageInfo.offset + 1;
    this.cargarUsuario(this.page);
  }

  modalRef: BsModalRef;

  openModalNewEdit(template: TemplateRef<any>, usuario?: IUsuario) {
    this.usuario = new IUsuario;
    this.cargarRol();
    this.NewEdit = "Nuevo";
    if (usuario != undefined) {
      this.NewEdit = "Editar";
      this.usuario = usuario;
    }
    this.modalService.show(template);
  }

  cerrarModal() {
    this.modalService.hide();
  }

  agregarUsuario(a: NgForm) {
    if (this.NewEdit == "Nuevo") {
      this.usuario.usuarioIngresa = "S61121";
      this.usuarioService.saveUsuario(this.usuario).subscribe(
        res => {
          this.cerrarModal();
          this.page.currentPage = 1;
          this.cargarUsuario(this.page);
        },
        err => {
          this.cerrarModal();
        }
      )
    }
    else {
      this.editarUsuario(this.usuario);
    }
  }

  editarUsuario(item: IUsuario) {
    this.usuario.usuarioActualiza = "S61121";
    this.usuarioService.updateUsuario(item).subscribe(
      res => {
        this.cerrarModal();
        this.cargarUsuario(this.page);
      },
      err => {
        this.cerrarModal();
      }
    )
  }

  openModalDelete(template: TemplateRef<any>, usuario: IUsuario) {
    this.usuario = usuario;
    this.modalService.show(template);
  }

  eliminarUsuario() {
    this.usuario.usuarioActualiza = "T16587";
    this.usuarioService.deleteUsuario(this.usuario).subscribe(
      res => {
        this.cerrarModal();
        this.cargarUsuario(this.page);
      },
      err => {
        this.cerrarModal();
      }
    )
  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
    this.page.currentPage = 1;
    this.cargarUsuario(this.page);
  }

  cargarUsuario(page: Page) {
    this.loadingIndicator = true;
    this.usuarioService.getUsuarios(this.page).subscribe(
      res => {
        this.page.currentPage = this.page.currentPage - 1;
        this.usuarioList = res.users;
        this.page.totalCount = res.totalRows;
        this.loadingIndicator = false;
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }
  cargarRol() {
    this.rolService.getAllRols().subscribe(
      res => {
        this.rolList = res;
        this.loadingIndicator = false;
      },
      err => {
        this.loadingIndicator = false;
      }
    )
  }
}
