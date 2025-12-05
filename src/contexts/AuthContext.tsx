import axiosClient from "@/api/axiosClient";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// Definición de la estructura del usuario
interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  // Nuevos campos recibidos al logearse:
  lastName: string; // Apellido
  phone?: string; // Teléfono (opcional si puede faltar)
  fechaCreacion: string; // Usamos la fecha de creación (o registro)
  isSeller: boolean; // variable adicional de prueba
}

// Interfaz del contexto de autenticación (corregida para incluir isLoading)
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isSeller: boolean;
  isLoading: boolean; // <-- ¡Esto soluciona el error 2339!
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  convertToSeller: () => Promise<void>;
  toggleSellerMode: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
 const [user, setUser] = useState<User | null>(null);
 // Inicializamos en true para esperar la carga del localStorage
 const [isLoading, setIsLoading] = useState(true);

 // Efecto para cargar el usuario desde localStorage al iniciar
 useEffect(() => {
    let loadedUser = null;
    let token = null;

    const storedUser = localStorage.getItem("user");
    token = localStorage.getItem("access_token");

    if (storedUser && token && storedUser !== "undefined") {
        try {
          loadedUser = JSON.parse(storedUser);
        } catch (e) {
            console.error("Error al analizar el usuario desde localStorage. Datos corruptos eliminados.", e);
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
        }
    }
    
    // Una vez que la verificación ha terminado, actualizamos el estado.
    setUser(loadedUser);
    setIsLoading(false); 

 }, []);

 // Función de inicio de sesión
 const login = async (email: string, password: string) => {
  try {
   const res = await axiosClient.post("/auth/login", { email, password });
   const { token, user } = res.data;

   localStorage.setItem("access_token", token);
   localStorage.setItem("user", JSON.stringify(user));

   setUser(user);
   
  } catch (err: any) {
   throw new Error(
    err?.response?.data?.message || err?.message || "Error al iniciar sesión" 
   );
  }
 };

 // Función para cerrar sesión
 const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  setUser(null);
 };

  const toggleSellerMode = () => {
    
    // const userIsSeller = user?.roles.includes("user-seller") ? true : false;

    // setUser(user?.isSeller(userIsSeller))

      if (user) {
        setUser({ ...user, isSeller: !user.isSeller });
      }
  };

 // Función para convertir a vendedor
 const convertToSeller = async () => {
  console.log(user?.id);
  const res = await axiosClient.patch(`/auth/convert-to-seller/${user?.id}`);
  
  const updatedUser = res.data;

  localStorage.setItem("user", JSON.stringify(updatedUser));
  setUser(updatedUser);
 };

 return (
  <AuthContext.Provider
   value={{
    user,
    isLoggedIn: !!user,
    isLoading, // <-- Exponemos el estado de carga
    isSeller: user?.roles.includes("user-seller") ?? false,
    toggleSellerMode,
    login,
    logout,
    convertToSeller,
   }}
  >
   {/* SOLO DEJAMOS {children} AQUÍ para evitar el error React.Children.only */}
   {children}
  </AuthContext.Provider>
 );
};

export const useAuth = () => {
 const ctx = useContext(AuthContext);
 if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
 return ctx;
};