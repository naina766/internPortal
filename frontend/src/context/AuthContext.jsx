import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem("guest") === "true";
  });

  const loginAsGuest = () => {
    setIsGuest(true);
    localStorage.setItem("guest", "true");
  };

  const logout = () => {
    setIsGuest(false);
    localStorage.removeItem("guest");
  };

  return (
    <AuthContext.Provider value={{ isGuest, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
