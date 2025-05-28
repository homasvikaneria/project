// Frontend/vite-project/src/Components/Mainnav/Mainnavbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/state";
import { persistor } from "../../redux/store";
import { Drawer, IconButton, List, ListItem, ListItemText, Avatar } from "@mui/material";
import './Mainnavbar.css'



import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // User icon

const Mainnavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const user = useSelector((state) => state.user?.user);
  const isLoggedIn = Boolean(user);

  const defaultUserIcon = "https://res.cloudinary.com/dmfjcttu9/image/upload/v1740129700/ytuunnzhvinksaxocspm.png";
  const userIconUrl = user?.profileImage || defaultUserIcon;
  const userName = user?.name || "User";

  const handleLogout = () => {
    dispatch(setLogout());
    persistor.purge();
    persistor.flush();
    localStorage.clear();
    sessionStorage.clear();
    setDrawerOpen(false);
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <nav className="navbar">
      {/* Left Section: Logo & Brand Name */}
      <div className="navbar-left" onClick={() => navigate("/")}>
        <img
          src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740129590/vscf21yryptnxlvzwoky.png"
          alt="JustHome Logo"
          className="logo"
        />
        <span className="brand-name">JustHome</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/members">Members</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* User Profile Button */}
      <div className="user">
        <IconButton onClick={() => setDrawerOpen(true)}>
          <Avatar src={userIconUrl} alt="User Icon" />
        </IconButton>
      </div>

      {/* Right Drawer for User Menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="drawer-container">
          <Avatar src={userIconUrl} alt="User Icon" sx={{ width: 56, height: 56, margin: "auto" }} />
          <h3 style={{ textAlign: "center", marginTop: "10px" }}>{isLoggedIn ? userName : "Guest"}</h3>

          <List className="drawer-list">
            {isLoggedIn ? (
              <>
                <ListItem button onClick={() => { navigate("/propertyform"); setDrawerOpen(false); }}>
                  <ListItemText primary="Add a Property" />
                </ListItem>
                <ListItem button onClick={() => { navigate("/wishlist"); setDrawerOpen(false); }}>
                  <ListItemText primary="Wishlist" />
                </ListItem>
                <ListItem button onClick={() => { navigate("/your-reviews"); setDrawerOpen(false); }}>
                  <ListItemText primary="Your Reviews" />
                </ListItem>
                <ListItem button onClick={() => { navigate("/profile"); setDrawerOpen(false); }}>
                  <ListItemText primary="Profile" />
                </ListItem>

                {/* Logout at Bottom */}
                <div className="logout-container">
                  <ListItem
                    button
                    onClick={handleLogout}
                    sx={{ '&:hover': { backgroundColor: 'red', color: 'white' } }}
                  >
                    <ListItemText primary="Logout" />
                  </ListItem>
                </div>
              </>
            ) : (
              <>
                <ListItem button onClick={() => { navigate("/login"); setDrawerOpen(false); }}>
                  <ListItemText primary="Sign In" />
                </ListItem>
                <ListItem button onClick={() => { navigate("/register"); setDrawerOpen(false); }}>
                  <ListItemText primary="Sign Up" />
                </ListItem>
              </>
            )}
          </List>
        </div>
      </Drawer>

    </nav>
  );
};

export default Mainnavbar;
