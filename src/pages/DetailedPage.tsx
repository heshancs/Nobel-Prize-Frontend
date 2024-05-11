import React from "react";
import SideBar from "../components/Sidebar";
import DetailedPost from "../components/DetailedPost";
import { Grid, Box } from "@mui/material";

const DetailedPage: React.FC = () => {

  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <SideBar />
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={10}>
        <DetailedPost />
      </Grid>
    </Grid>
    </Box>
  );
};

export default DetailedPage;
