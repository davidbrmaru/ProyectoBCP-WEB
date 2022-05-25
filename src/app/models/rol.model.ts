export class IRol {
    constructor () {}
    id:number;
    codRol: string;
    nombre: string;
    fecIngreso: Date;
    usuarioIngresa: string;
    fecActualiza: Date;
    usuarioActualiza: string;
    flgActivo: number;
}

export class IRolResponse {
    totalRows: number;
    rols: IRol[];
  }
