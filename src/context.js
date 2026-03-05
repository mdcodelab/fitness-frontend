import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:4000/api-gateway/me",
          { withCredentials: true }
        );

        if (res.data && res.data.first_name) {
          setUser(res.data.first_name);
        } else {
          setUser(null);
        }
        setLoading(false);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api-gateway/logout",
        {},
        { withCredentials: true }
      );

    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useUser must be used inside AuthProvider");
  }

  return context;
}