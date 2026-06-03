// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, getProfile, logoutUser } from "../api/api.js";

// ✅ Default export for AuthContext (avoids named import errors)
const AuthContext = createContext();

// ✅ Named export for provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on app load
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await getProfile(); // must return logged-in user
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const res = await loginUser({ username, password });
      setUser(res.data);
      navigate("/chatbot"); // redirect after login
    } catch (err) {
      throw err;
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      await registerUser({ username, email, password });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      console.log("Logout API failed, clearing frontend anyway");
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Default export for AuthContext
export default AuthContext;