import { useEffect, useState } from "react";
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";

const DetailedPost = () => {
  const [postData, setPostData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.nobelprize.org/2.1/laureate/${id}`)
      .then((response) => response.json())
      .then((data) => setPostData(data[0]));
  }, []);

  console.log(postData);
  const formattedDate = new Date(postData?.birth?.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
  return (
    <>
      <Card sx={{ margin: 5 }}>
        {postData && (
          <>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red" }} aria-label="author-avatar">
                  {postData?.fullName?.en.toUpperCase().split("")[0]}
                </Avatar>
              }
              title={postData?.knownName?.en} // Assuming author is passed as prop
              subheader={`${formattedDate} - ${postData?.birth?.place?.country?.en}`} // Display date and country
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Category:
              </Typography>
              <Typography paragraph>
                {postData?.nobelPrizes[0]?.category.en}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Prizes:
              </Typography>
              <List>
                {postData?.nobelPrizes && postData.nobelPrizes.length > 0 ? (
                  postData.nobelPrizes.map((prize, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={prize.awardYear}
                        secondary={`${prize.categoryFullName.en} - ${prize.motivation.en}`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No prizes available." />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </>
        )}
      <CommentSection postId={id} />

      </Card>
    </>
  );
};

export default DetailedPost;
