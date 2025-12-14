import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth.jsx";

const GuestRoute = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home"); //redirects already signed in users.
    }
  }, [user, navigate]);

  return !user ? <Outlet /> : null;
};

export default GuestRoute;
