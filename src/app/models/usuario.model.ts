export class IUsuario {
  constructor() { }
  id: number;
  codMatricula: string;
  password: string;
  correo: string;
  idRol: number;
  fecIngreso: Date;
  usuarioIngresa: string;
  fecActualiza: Date;
  usuarioActualiza: string;
  flgActivo: number;
}

export class IUsuarioResponse {
  totalRows: number;
  users: IUsuario[];
}
