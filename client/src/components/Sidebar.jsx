import { useNavigate } from "react-router";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar vh-100 w-25 border-end">
      <button className="sidebar-btn w-100" onClick={() => navigate("/")}>
        {" "}
        Home{" "}
      </button>
      <button className="sidebar-btn w-100" onClick={() => navigate("/about")}>
        {" "}
        About{" "}
      </button>
      <button
        className="sidebar-btn w-100"
        onClick={() => navigate("/settings")}
      >
        {" "}
        Settings{" "}
      </button>
    </div>
  );
}
