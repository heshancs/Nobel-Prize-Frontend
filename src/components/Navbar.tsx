import { Pets, ModeNight } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  Switch,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../ThemeContext";
import { KeycloackContext } from "../KeycloackContext";

const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between",
})) as typeof Toolbar;

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
})) as typeof Box;

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
})) as typeof Box;

const ModeBox = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { mode, toggleMode } = useThemeContext();
  const { keycloackValue, authenticated, logout } =
    useContext(KeycloackContext);
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    if (authenticated) {
      keycloackValue.loadUserProfile().then((profile) => {
        setUserProfile(profile);
        console.log(profile);
      });
    }
  }, [authenticated]);

  const handleAuthClick = () => {
    // Perform login or logout action based on isUserAuthenticated state
    if (authenticated) {
      // Handle logout logic
      logout();
    }
  };
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Link to={`/`} style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Nobel Prize App
          </Typography>
        </Link>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="search..." />
        </Search>
        <UserBox onClick={() => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </UserBox>
        <ModeBox>
          <ModeNight />
          <Icons>
            <Switch checked={mode === "dark"} onChange={toggleMode} />
          </Icons>
        </ModeBox>
        <Typography variant="p" sx={{ display: { xs: "none", sm: "block" } }}>
          {userProfile.firstName}
        </Typography>
        <Icons>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={() => setOpen(true)}
          />
        </Icons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleAuthClick}>
          {authenticated ? "Logout" : "Login"}
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
