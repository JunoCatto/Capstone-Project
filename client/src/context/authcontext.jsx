import { createContext, useReducer } from "react";
import { authReducer, initialState } from "../reducers/authReducer";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // login function
  const login = async (userName, password) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      const userData = data.data; // i.e. { userName, password }
      dispatch({ type: "AUTH_SUCCESS", payload: userData });
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      return dispatch({ type: "AUTH_FAILURE", payload: err.message });
    }
  };

  // register function
  const register = async (userName, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      dispatch({ type: "AUTH_START", payload: null }); // does not dispatch AUTH_SUCCESS as that would log the user in immediately.
    } catch (err) {
      return dispatch({ type: "AUTH_FAILURE", payload: err.message });
    }
  };

  // logout, removes user from storage and sets user to null
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
