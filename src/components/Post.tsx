import { Link } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface PostProps {
  postId: string;
  author: string;
  gender: string;
  date: string;
  country: string;
  category: string;
}

const Post: FC<PostProps> = ({ postId, author, gender, date, country, category }) => {
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
              {author ? author[0].toUpperCase() : ""}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={author}
          subheader={`${formattedDate} - ${country}`}
        />
        <CardContent>
          <Typography variant="body1" component="div">
            {category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {gender}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            See More
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default Post;
