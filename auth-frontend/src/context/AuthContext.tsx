import  { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
export interface User {
  uid: string;
  email: string;
  fullName: string;
  appId?: string;
  phoneNumber?: string;
  role?: number;
}
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadStoredAuth = () => {
      try {
        const storedToken = localStorage.getItem('idToken');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Failed to load auth:', error);
        localStorage.clear();
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('idToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};