import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth.jsx";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); //redirects already signed in users.
    }
  }, [user, navigate]);

  return user ? <Outlet /> : null;
};

export default ProtectedRoute;
