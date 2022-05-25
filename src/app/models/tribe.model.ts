export class ITribe {
    constructor () {}
    nombre: string;
    tipo: string;
    fecIngreso: Date;
    usuarioIngresa: string;
    fecActualiza: Date;
    usuarioActualiza: string;
    flgActivo: boolean;
    id: string;
}

export class ITribeResponse {
    totalRows: number;
    tribes: ITribe[];
  }