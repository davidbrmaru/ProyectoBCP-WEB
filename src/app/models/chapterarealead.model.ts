export class IChapterAreaLead {
    constructor () {}
    id:number;
    codMatricula: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fecIngreso: Date;
    usuarioIngresa: string;
    fecActualiza: Date;
    usuarioActualiza: string;
    flgActivo: number;
}
export class IChapterAreaLeadResponse {
  totalRows: number;
  chapterAreaLeaders: IChapterAreaLead[];
}
