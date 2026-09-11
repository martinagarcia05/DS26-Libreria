export interface Sesion {
  token: string;
  usuario: {
    usuario: Usuario;
  };
}

export interface Usuario {
  id: number;
  credenciales: Credenciales;
  rol: Rol;
}

export interface Credenciales {
  email: string;
  nombre: string;
}

export type Rol = 'ADMIN' | 'CLIENTE';