import { createContext, useEffect, useState } from "react";
import api from "../services/api/api";

export const authContext = createContext();

export default function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isBanned,setIsBanned] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const verifyUser = async () => {
    try {
      const res = await api.get("/auth/verify")
      setLoggedIn(res.data.authenticated);
      setRole(res.data.role);
      setIsBanned(res.data.isBanned);
      setIsVerified(res.data.isVerified);
      return {
        role: res.data.role,
        isBanned: res.data.isBanned,
        isVerified:res.data.isVerified,
      };
    } catch {
      setLoggedIn(false);
      setRole(null);
      return null;
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <authContext.Provider
      value={{
        loggedIn,
        role,
        setLoggedIn,
        setRole,
        verifyUser,
        authLoading,
        isBanned,
        isVerified
      }}
    >
      {children}
    </authContext.Provider>
  );
}