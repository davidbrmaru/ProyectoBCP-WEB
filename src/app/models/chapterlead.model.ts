export class IChapterLead {
    constructor () {}
    id:number;
    idChapterAreaLeader:number;
    codMatricula: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombreChapter: string;
    fecIngreso: Date;
    usuarioIngresa: string;
    fecActualiza: Date;
    usuarioActualiza: string;
    flgActivo: number;
}
export class IChapterLeadResponse {
  totalRows: number;
  chapterLeaders: IChapterLead[];
}
