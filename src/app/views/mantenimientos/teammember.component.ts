import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/models/page.model';
import { ITeamMember } from 'src/app/models/teammember.model';
import { TeamMemberService } from 'src/app/services/teammember.service';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
   templateUrl: 'teammember.component.html',
})
export class TeamMemberComponent implements OnInit, AfterViewInit {

  loadingIndicator: boolean = true;
  reorderable = true;
  teamMemberList : ITeamMember[] = [];

  // rows: ITeamMember[] = [{cod_matricula : 'T10592',nombre : "Richard"}, {cod_matricula : 'T10593',nombre : "Juan"}];
  // page: Page = new Page();
  // columns = [{ prop: 'cod_matricula', name: 'cod_matricula'},
  // { prop: 'nombre', name: 'nombre'}]

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2,private modalService: BsModalService,
    private teamMemberService: TeamMemberService
  ) {
    // this.page.pageSize = 10;
    //     this.page.currentPage = 1;
  }

  // setPage(pageInfo) {
  //   this.page.currentPage = pageInfo.offset;
  // }
 
  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template);
  }

  agregar(){
    
  }

  nuevo(){
    alert("Hola");
  }

  ngOnInit(): void {
    debugger;
    this.teamMemberService.getAllTeamMembers().subscribe(
      res => {
        debugger;
        this.teamMemberList = res;
      },
      err =>{
        debugger;
      }
    )
  }

  ngAfterViewInit(): void {
    
  }
}

@Component({
  selector: 'app-mantenimientos-teammember',
  template: `
    <c-col xl='2' md='4' sm='6' xs='12' class='my-4 ms-4'>
      <div [ngClass]='colorClasses' style='padding-top: 75%;'></div>
      <ng-content></ng-content>
    </c-col>
  `
})
export class MantenimientosTeamMemberComponent implements OnInit {
  @Input() color = '';

  public colorClasses = {
    'theme-color w-75 rounded mb-3': true
  };

  @HostBinding('style.display') display = 'contents';

  ngOnInit(): void {
    this.colorClasses = {
      ...this.colorClasses,
      [`bg-${this.color}`]: !!this.color
    };
  }
}

