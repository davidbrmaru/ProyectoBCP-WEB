export class IBaseActivo {
    idUser:string;
    applications : IActivo[];
}

export class IActivo{
    idApplication : string;
    porcentaje: number;
    comentario: string;
}

export class IActivoTable{
    matricula : string;
    aplicacion: string;
    porcentaje: number;
    comentario: string;
}
export class IBaseActivosResponse{
    totalRows: number;
    baseActivos: IBaseActivos[];
}

export class IBaseActivos{
    nombreCal: string;
    matriculaChapter: string;
    chapterLeader: string;
    tipo: string;
    empresa: string;
    matricula: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombre: string;
    rol: string;
    rolInsourcing: string;
    especialidad: string;
    tribuCoe: string;
    squad: string;
    codAppAsignado: string;
    porcentajeAsignacion: string;
    bb: string;
    chapter: string;
    comentarios: string;
}