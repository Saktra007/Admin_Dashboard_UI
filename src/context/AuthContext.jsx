import { createContext, useEffect, useState } from "react";
import { userService } from "../services/user.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await userService.login({ email, password });

    const userData = res.data;
    if (res.success && userData.token) {
      setCurrentUser(userData);
      localStorage.setItem("token", userData.token);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false };
  };

  const registerSuccess = (userData) => {
    if (userData && userData.token) {
      setCurrentUser(userData);
      localStorage.setItem("token", userData.token);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        logout,
        registerSuccess,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
