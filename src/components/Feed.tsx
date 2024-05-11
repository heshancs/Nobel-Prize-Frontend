import { Box, Grid } from "@mui/material";
import Post from "./Post";

const Feed = () => {
  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Post postId="1" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Post postId="2" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Post postId="3" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Post postId="4" />
      </Grid>
      </Grid>
    </Box>
  );
};

export default Feed;
