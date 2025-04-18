import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";

interface User {
  id: string;
  username: string;

  token?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// --- Constantes ---
const LOCAL_STORAGE_KEY = "currentUser";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUser) {
        return JSON.parse(storedUser) as User;
      }
    } catch (error) {
      console.error(
        "Erreur lors de la lecture du currentUser depuis localStorage:",
        error
      );

      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    return null;
  });

  const isAuthenticated = !!currentUser;
  const login = useCallback((userData: User) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));

      setCurrentUser(userData);
    } catch (error) {
      console.error(
        "Erreur lors de la sauvegarde du currentUser dans localStorage:",
        error
      );
    }
  }, []);
  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    setCurrentUser(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      currentUser,
      login,
      logout,
    }),
    [isAuthenticated, currentUser, login, logout]
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE_KEY) {
        if (event.newValue) {
          try {
            setCurrentUser(JSON.parse(event.newValue) as User);
          } catch (error) {
            console.error("Erreur lors de la lecture de storage event:", error);
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
