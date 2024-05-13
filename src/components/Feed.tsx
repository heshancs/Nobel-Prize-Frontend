import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Post from "./Post";

const Feed = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    fetch("https://api.nobelprize.org/2.1/laureates")
      .then((response) => response.json())
      .then((data) => setPostData(data.laureates));
  }, []);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <Grid container spacing={2}>
        {postData.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Post
              postId={post.id}
              title={post.fileName}
              author={post.knownName.en}
              gender={post.gender}
              date={post.birth.date}
              country={post.country}
              // description={post.description}
              // Add other necessary props from your API response
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Feed;
