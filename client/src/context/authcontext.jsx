import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // managing the user state for persistence
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      // if user is found, return it as a json object
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      // if error, removes the current user.
      console.error("Invalid user data", err);
      localStorage.removeItem("user");
      return null;
    }
  });

  // register function
  const register = async (userName, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.result === "success") {
        const userData = data.data; // i.e. { userName, password }
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: data.data };
      }
    } catch (err) {
      return { success: false, message: err };
    }
  };

  // login function
  const login = async (userName, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.result === "success") {
        const userData = data.data; // i.e. { userName, password }
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: data.data };
      }
    } catch (err) {
      return { success: false, message: err };
    }
  };

  // logout, removes user from storage and sets user to null
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
