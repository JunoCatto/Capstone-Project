import { createContext, useReducer } from "react";
import { authReducer, initialState } from "../reducers/authReducer";

export const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || "/api";

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // login function
  const login = async (userName, password) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
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
      const flatUser = {
        _id: data.data._id,
        userName: data.data.userName,
        profilePic: data.data.profilePic,
        token: data.token,
      };
      console.log(data.data);
      dispatch({ type: "AUTH_SUCCESS", payload: flatUser });
      localStorage.setItem("user", JSON.stringify(flatUser));
      return { success: true };
    } catch (err) {
      dispatch({ type: "AUTH_FAILURE", payload: err.message });
      return { success: false, message: err.message };
    }
  };

  // register function
  const register = async (userName, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
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
      dispatch({
        type: "AUTH_START",
        payload: null,
      }); /* does not dispatch AUTH_SUCCESS as that would log the user
       in immediately without checking token etc */
      login(userName, password);
      return { success: true };
    } catch (err) {
      dispatch({ type: "AUTH_FAILURE", payload: err.message });
      return { success: false, message: err.message };
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
