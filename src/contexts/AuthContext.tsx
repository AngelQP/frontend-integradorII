import { createContext, useContext, useState, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  isSeller: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isSeller: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  toggleSellerMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Mock login - in real app this would call an API
    setUser({
      id: "1",
      name: "Carlos Rodríguez",
      email: email,
      isSeller: false,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSellerMode = () => {
    if (user) {
      setUser({ ...user, isSeller: !user.isSeller });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isSeller: user?.isSeller ?? false,
        login,
        logout,
        toggleSellerMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
