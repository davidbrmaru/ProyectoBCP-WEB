export class ISquad {
    constructor () {}
    nombre: string;
    idTribe: number;
    fecIngreso: Date;
    usuarioIngresa: string;
    fecActualiza: Date;
    usuarioActualiza: string;
    flgActivo: boolean;
    id: string;
}

export class ISquadResponse {
    totalRows: number;
    squads: ISquad[];
  }