export class IChapterLead {
    constructor () {}
    id:number;
    idChapterAreaLeader:number;
    codMatricula: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombreChapter: string;
    totalTeamMember: number;
    totalTeamMemberBCP: number;
    totalTeamMemberProveedor: number;
    fecIngreso: Date;
    usuarioIngresa: string;
    fecActualiza: Date;
    usuarioActualiza: string;
    flgActivo: number;
    teamMembers: ITeamMember[];
}
export class ITeamMember {
  codMatricula: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  idChapterLeader: number;
  tipoProveedor: string;
  empresa: string;
  rol: string;
  rolInsourcing: string;
  especialidad: string;
  fecIngreso: Date;
  usuarioIngresa: string;
  fecActualiza: Date;
  usuarioActualiza: string;
  flgActivo: boolean;
  id: number;
}
export class IChapterLeadResponse {
  totalRows: number;
  chapterLeaders: IChapterLead[];
}
