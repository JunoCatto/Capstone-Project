import { useAuth } from "../hooks/useAuth";
import React from "react";
import { NavLink } from "react-router-dom";
import { getProfilePic } from "../utils/imageHelper";

// Base UI import for popover component
import { Popover } from "@base-ui/react/popover";

// MUI icons
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CreateIcon from "@mui/icons-material/Create";

export default function Sidebar() {
  const { logout, user } = useAuth();

  const profilePic = getProfilePic(user.profilePic);

  function ArrowSvg(props) {
    return (
      <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
        <path
          d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
          className="ArrowFill"
        />
        <path
          d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
          className="ArrowOuterStroke"
        />
        <path
          d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
          className="ArrowInnerStroke"
        />
      </svg>
    );
  }

  const handleLogout = () => {
    logout();
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
          <span>Home</span>
        </NavLink>
        <div className="sidebarButtonFull">
          <PersonIcon />
          <span>Profile</span>
        </div>
        <div className="sidebarButtonFull">
          <MenuIcon />
          <span>Settings</span>
        </div>
        <div className="postButtonFull">
          <div>
            <CreateIcon />
          </div>
          <span>Post</span>
        </div>
        <Popover.Root>
          <Popover.Trigger className="profileFull sidebarButtonFull">
            <div className="profilePic">
              {" "}
              <img src={profilePic}></img>
              <span>{user.userName}</span>
            </div>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner sideOffset={8}>
              <Popover.Popup className="popup">
                <Popover.Arrow className="Arrow">
                  <ArrowSvg />
                </Popover.Arrow>
                <Popover.Title>test title</Popover.Title>
                <Popover.Description>
                  <button
                    className="signOut sidebarButtonFull"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </Popover.Description>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </div>
      {/* Smaller screen size */}
      {/* <div className="sidebarSmall">
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
        <Popover.Root>
          <Popover.Trigger className="profileFull sidebarButtonSmall">
            <div className="profilePic">
              {" "}
              <img src={profilePic}></img>
            </div>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner sideOffset={8}>
              <Popover.Popup className="popup">
                <Popover.Arrow className="Arrow">
                  <ArrowSvg />
                </Popover.Arrow>
                <Popover.Title>test title</Popover.Title>
                <Popover.Description>
                  <button
                    className="signOut sidebarButtonFull"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </Popover.Description>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </div> */}
    </>
  );
}
