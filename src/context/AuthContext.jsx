import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:9090/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return { success: false, message: "Invalid credentials" };
      }

      const data = await response.json();

      // Save JWT if backend returns it
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setUser(data);

      return { success: true };

    } catch (err) {
      return { success: false, message: "Server error" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
