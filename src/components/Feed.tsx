import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Post from "./Post";
import Filter from "./Filter";

const Feed = () => {
  const [postData, setPostData] = useState([]);
const [filters, setFilters] = useState({});

useEffect(() => {
  fetchNobelPrizes(filters);
}, [filters]);


  // useEffect(() => {
  //   fetch("https://api.nobelprize.org/2.1/laureates")
  //     .then((response) => response.json())
  //     .then((data) => setPostData(data.laureates));
  // }, []);

  const fetchNobelPrizes = async (filters) => {
    const { gender, birthYear, deathYear, nobelPrizeCategory } = filters;
    const params = new URLSearchParams();
  
    // Conditionally append parameters if they are defined and not empty
    if (gender) params.append('gender', gender);
    if (birthYear) params.append('birthDate', birthYear);
    if (deathYear) params.append('deathDate', deathYear);
    if (nobelPrizeCategory) params.append('nobelPrizeCategory', nobelPrizeCategory);
    // params.append('limit', 10);
    // params.append('offset', 0);
    params.append('sort', 'asc');
  
    const queryString = params.toString();
    const response = await fetch(`https://api.nobelprize.org/2.1/laureates?${queryString}`);
    const data = await response.json();
    setPostData(data.laureates || []);
  };
  
  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <Grid>
      <Filter onFilterChange={setFilters} />

      </Grid>
      <Grid container spacing={2}>
        {postData?.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Post
            key={post?.id}
              postId={post?.id} 
              title={post?.fileName}
              author={post?.knownName?.en}
              gender={post?.gender}
              date={post?.birth?.date}
              country={post?.birth?.place?.country?.en}
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
