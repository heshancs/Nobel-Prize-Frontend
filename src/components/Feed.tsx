import { Box, Grid } from "@mui/material";
import Post from "./Post";

const Feed = () => {
  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <Grid container spacing={2}>
        {/* First row of posts */}
        <Grid item xs={12} md={6}>
          <Post />
        </Grid>
        {/* Second row of posts (visible only on medium and larger screens) */}
        <Grid item xs={12} md={6}>
          <Post />
        </Grid>
        <Grid item xs={12} md={6}>
          <Post />
        </Grid>
        {/* Third row of posts (visible only on larger screens) */}
        <Grid item xs={12} md={6}>
          <Post />
        </Grid>
        <Grid item xs={12} md={6}>
          <Post />
        </Grid>
        <Grid item xs={12} md={6}>
          <Post />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Feed;
