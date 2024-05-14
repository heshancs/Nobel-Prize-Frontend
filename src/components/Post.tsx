import React from "react";
import { Link } from "react-router-dom";
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";

const Post = ({ postId, title, author, gender, date, country , category}) => {
  // Format the date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link to={`/post/${postId}`} style={{ textDecoration: "none", color: "inherit" }}>
      <Card sx={{ margin: 5 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="author-avatar">
              {author? author[0].toUpperCase() : ""}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={author} // Assuming author is passed as prop
          subheader={`${formattedDate} - ${country}`} // Display date and country
        />
        <CardContent>
          <Typography variant="p" component="div">
            {category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {gender}
          </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" color="primary" >
          See More
        </Button>
      </CardActions>
      </Card>
    </Link>
  );
};

export default Post;
