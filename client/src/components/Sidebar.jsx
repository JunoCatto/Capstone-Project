import { useAuth } from "../hooks/useAuth";
import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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
    <div className="sidebar">
      <div className="sidebarButton">Home</div>
      <div className="sidebarButton">About</div>
      <div className="sidebarButton">Profile</div>
      <div className="sidebarButton">
        <Button variant="outlined" onClick={handleOpen}>
          {user.userName}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotsprops={{
            paper: {
              sx: {
                width: "100%",
              },
            },
          }}
        >
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={() => logout()}>Sign Out</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
