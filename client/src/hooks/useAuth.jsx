import { useContext } from "react";
import { AuthContext } from "../context/authcontext.jsx";

export const useAuth = () => {
  const { user, login, logout, register } = useContext(AuthContext);
  return { user, login, logout, register };
};
