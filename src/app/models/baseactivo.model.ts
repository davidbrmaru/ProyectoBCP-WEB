export class IBaseActivo {
    idUser:string;
    matricula:string;
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
    nombre_cal: string;
    mat_chapter: string;
    chapter_leader: string;
    tipo_preper: string;
    empresa: string;
    matricula: string;
    apellido_paterno: string;
    apellido_materno: string;
    nombre: string;
    sq_rol: string;
    rol_insourcing: string;
    especialidad: string;
    tribu: string;
    squad: string;
    codigo_app_asignado: string;
    porcentaje_asignado: string;
    bb: string;
    chapter: string;
    comentario: string;
}