import { createContext, useContext, useEffect, useState } from "react";
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

    // const estaAutenticado = usuario !== null;
    // const tieneRol = (rol: Rol) => usuario?.rol === rol;

    useEffect(() => {
    if (!obtenerToken()) return;    // sin token no hay nada que averiguar
    apiFetch<Usuario>('/auth/yo')
        .then(setUsuario)
        .catch(() => borrarToken())  // vencido o inválido: se limpia
        .finally(() => setCargando(false));
    }, []);

//     const logout = () => {
//         borrarToken();
//         setUsuario(null);
//     };

//     const login = async (credenciales: Credenciales) => {
//         // Ajustá la ruta o el tipo de retorno según cómo sea exactamente tu backend.
//         // La idea es que la página Login ya no manipule el token, lo hace el Provider.
//         const data = await apiFetch<{ token: string; usuario: Usuario }>('/auth/login', {
//         method: 'POST',
//         body: JSON.stringify(credenciales)
//         });
//         guardarToken(data.token); 
//         setUsuario(data.usuario);
//     };

//     // Escuchador de sesión expirada (Paso 5 de la clase)
//   useEffect(() => {
//     window.addEventListener('sesion-expirada', logout);
//     return () => window.removeEventListener('sesion-expirada', logout);
//   }, []);

  return (
    
      {children}
    
  );

}

// hook para consumirlo
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de ');
  }
  return contexto;
}