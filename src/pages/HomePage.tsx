// HomePage.tsx
import React from "react";
import Feed from "../components/Feed";
import SideBar from "../components/Sidebar";
import { Box, Stack } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <SideBar />
        <Feed />
      </Stack>
    </Box>
  );
};

export default HomePage;
