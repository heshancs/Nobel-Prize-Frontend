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

  return (
    <>
      <Card sx={{ margin: 5 }}>
        {postData && (
          <>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                  {postData.id}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVert />
                </IconButton>
              }
              title={postData.knownName.en} // Assuming author is available in the fetched data
              subheader={postData.birth.date} // Assuming date is available in the fetched data
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {postData.fileName}{" "}
                {/* Assuming title is available in the fetched data */}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                "postDatadescription"{" "}
                {/* Assuming description is available in the fetched data */}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "red" }} />}
                />
              </IconButton>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
            </CardActions>
          </>
        )}
      </Card>
      <CommentSection postId={id} />
    </>
  );
};

export default DetailedPost;
