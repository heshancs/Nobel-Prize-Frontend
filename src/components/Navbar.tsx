import { ModeNight } from "@mui/icons-material";
import {
  AppBar,
  Box,
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
import { KeycloakProfile } from "keycloak-js";

interface UserProfile {
  firstName?: string;
}

const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between",
})) as typeof Toolbar;

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
})) as typeof Box;

const ModeBox = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

const Navbar: React.FC = () => {
  const { mode, toggleMode } = useThemeContext();
  const keycloackContext = useContext(KeycloackContext);

  if (!keycloackContext) {
    throw new Error(
      "KeycloackContext must be used within a KeycloackContextProvider"
    );
  }

  const { keycloackValue, authenticated, logout } = keycloackContext;
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (authenticated && keycloackValue) {
      keycloackValue.loadUserProfile().then((profile: KeycloakProfile) => {
        setUserProfile(profile as UserProfile);
      });
    }
  }, [authenticated, keycloackValue]);

  const handleAuthClick = () => {
    if (authenticated && keycloackValue) {
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

        <ModeBox>
          <ModeNight />
          <Icons>
            <Switch checked={mode === "dark"} onChange={toggleMode} />
          </Icons>
        </ModeBox>
        <Typography
          variant="body1"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Welcome {userProfile?.firstName}
        </Typography>
        <MenuItem onClick={handleAuthClick}>Logout</MenuItem>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
