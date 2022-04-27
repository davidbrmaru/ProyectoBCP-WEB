export class IApplication {
    constructor () {}
    id:number;
    codAplicacion: string;
    nombre: string;
    codOwner: string;
    idSquad: number;
    bindingBlock: string;
    fecIngreso: Date;
    usuarioIngresa: string;
    fecActualiza: Date;
    usuarioActualiza: string;
    flgActivo: number;
}

export class IApplicationResponse {
    totalRows: number;
    applications: IApplication[];
  }
