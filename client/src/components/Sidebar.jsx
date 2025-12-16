import { useAuth } from "../hooks/useAuth";
import React from "react";
import { NavLink } from "react-router-dom";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// MUI icons
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CreateIcon from "@mui/icons-material/Create";

export default function Sidebar() {
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="sidebarFull">
        {/* Full screen size */}
        <NavLink
          to="/home"
          end
          className={({ isActive }) =>
            `sidebarButtonFull ${isActive ? "active" : ""}`
          }
        >
          <HomeIcon />
          Home
        </NavLink>
        <div className="sidebarButtonFull">
          <PersonIcon />
          Profile
        </div>
        <div className="sidebarButtonFull">
          <MenuIcon />
          Settings
        </div>
        <div className="postButtonFull">Post</div>
        <div className="profileFull sidebarButtonFull" onClick={handleOpen}>
          {user.userName}
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => logout()}>Sign Out</MenuItem>
          </Menu>
        </div>
      </div>
      {/* Smaller screen size */}
      <div className="sidebarSmall">
        <div className="sidebarButtonSmall">
          <HomeIcon />
        </div>
        <div className="sidebarButtonSmall">
          <PersonIcon />
        </div>
        <div className="sidebarButtonSmall">
          <MenuIcon />
        </div>
        <div className="postButtonSmall">
          <CreateIcon />
        </div>
        <div className="profileFull sidebarButtonSmall" onClick={handleOpen}>
          {user.userName}
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => logout()}>Sign Out</MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
}
