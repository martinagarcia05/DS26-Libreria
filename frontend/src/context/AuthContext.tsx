import { createContext, useEffect, useState } from "react";
import type { ReactNode } from 'react';
import { apiFetch } from "../services/api";
import { borrarToken, guardarToken, obtenerToken } from "../services/sesion";
import type { Usuario, Credenciales, Rol } from "../types/sesionType";


interface AuthContextType {
  usuario: Usuario | null;            // null = nadie logueado
  cargando: boolean;                  // true mientras averiguamos quién sos
  estaAutenticado: boolean;           // usuario !== null, para leer más cómodo
  tieneRol: (rol: Rol) => boolean;    // usuario?.rol === rol
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }){

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargando, setCargando] = useState(obtenerToken() !== null);


    useEffect(() => {
    if (!obtenerToken()) return;    // sin token no hay nada que averiguar
    apiFetch<Usuario>('/auth/yo')
        .then(setUsuario)
        .catch(() => borrarToken())  // vencido o inválido: se limpia
        .finally(() => setCargando(false));
    }, []);


  return (
    
      {children}
    
  );

}
