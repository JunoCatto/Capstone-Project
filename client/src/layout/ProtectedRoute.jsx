import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth.jsx";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return user ? <Outlet /> : null;
};

export default ProtectedRoute;
