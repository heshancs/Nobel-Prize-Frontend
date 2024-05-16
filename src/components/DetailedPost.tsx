import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";

interface INobelPrize {
  category: {
    en: string;
  };
  awardYear: number;
  categoryFullName: {
    en: string;
  };
  motivation: {
    en: string;
  };
}

interface IPostData {
  nobelPrizes: INobelPrize[];
  id: number;
  fullName: {
    en: string;
  };
  knownName: {
    en: string;
  };
  gender: string;
  birth: {
    date: any;
    place: {
      country: {
        en: string;
      };
    };
  };
}

const DetailedPost = () => {
  const [postData, setPostData] = useState<IPostData>();

  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_NOBEL_PRIZE_BASE_URL}/laureate/${id}`)
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
                  postData.nobelPrizes.map((prize: INobelPrize, index) => (
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
