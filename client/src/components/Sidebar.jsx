import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <div className="sidebar vh-100 w-25 border-end">
      <a className="sidebar-btn w-100" href="/home">
        {" "}
        Home{" "}
      </a>
      <a className="sidebar-btn w-100" href="/about">
        {" "}
        About{" "}
      </a>
      <a className="sidebar-btn w-100" href="/settings">
        {" "}
        Settings{" "}
      </a>
      <a className="sidebar-btn w-100" onClick={() => logout()}>
        {" "}
        Log out{" "}
      </a>
    </div>
  );
}
