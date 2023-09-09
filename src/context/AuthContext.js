import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Função para fazer login do usuário
  const login = (userData) => {
    setUser(userData);
  };

  // Função para fazer logout do usuário
  const logout = () => {
    setUser(false)
    localStorage.clear();
  };

  useEffect(() => {
    // Verifique se há um token de usuário no localStorage ou cookies
    const storedUser = localStorage.getItem('user'); // Pode ser armazenado em localStorage
    if (storedUser) {
      // Se um token de usuário estiver presente, defina-o no estado
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}