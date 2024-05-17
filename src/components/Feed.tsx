import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Post from "./Post";
import Filter from "./Filter";

interface IFilterProps {
  gender: string;
  birthYear: string;
  deathYear: string;
  nobelPrizeCategory: string;
}

interface INobelPrize {
  category: {
    en: string;
  };
}

interface IPostData {
  nobelPrizes: INobelPrize[];
  id: string;
  fileName: string;
  knownName: {
    en: string;
  };
  gender: string;
  birth: {
    date: string;
    place: {
      country: {
        en: string;
      };
    };
  };
}

const Feed = () => {
  const [postData, setPostData] = useState<IPostData[]>([]); // Change here to make postData an array of IPostData
  const [filters, setFilters] = useState<IFilterProps>({
    gender: "",
    birthYear: "",
    deathYear: "",
    nobelPrizeCategory: "",
  });

  useEffect(() => {
    fetchNobelPrizes(filters);
  }, [filters]);

  const fetchNobelPrizes = async (filters: IFilterProps) => {
    const { gender, birthYear, deathYear, nobelPrizeCategory } = filters;
    const params = new URLSearchParams();

    // Conditionally append parameters if they are defined and not empty
    if (gender) params.append("gender", gender);
    if (birthYear) params.append("birthDate", birthYear);
    if (deathYear) params.append("deathDate", deathYear);
    if (nobelPrizeCategory) params.append("nobelPrizeCategory", nobelPrizeCategory);
    params.append("sort", "asc");

    const queryString = params.toString();
    const response = await fetch(
      `${import.meta.env.VITE_NOBEL_PRIZE_BASE_URL}/laureates?${queryString}`
    );
    const data = await response.json();
    setPostData(data.laureates || []);
  };

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <Grid>
        <Filter onFilterChange={setFilters} />
      </Grid>
      <Grid container spacing={2}>
        {postData?.map((post: IPostData) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Post
              key={post?.id}
              postId={post?.id}
              author={post?.knownName?.en}
              gender={post?.gender}
              date={post?.birth?.date}
              country={post?.birth?.place?.country?.en}
              category={post?.nobelPrizes[0]?.category.en}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Feed;
