export class ITeamMember {
    constructor () {}
    codMatricula: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    idChapterLeader: number;
    tipoProveedor: number;
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
export class ITeamMemberResponse {
  totalRows: number;
  teamMembers: ITeamMember[];
}
