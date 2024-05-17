import { useState, useEffect, useContext } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { KeycloackContext } from "../KeycloackContext";
import { KeycloakProfile } from 'keycloak-js';

interface IComment {
  id: number;
  firstname: string | undefined;
  lastname: string | undefined;
  created_at: string | Date | number;
  text: string | undefined;
  postId: string | undefined;
  userId: string | undefined;
}

interface IUserProfile {
  firstName: string;
  lastName: string;
  id: string;
}

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState("");

  const keycloackContext = useContext(KeycloackContext);

  if (!keycloackContext) {
    throw new Error("KeycloackContext must be used within a KeycloackContextProvider");
  }

  const { keycloackValue, authenticated } = keycloackContext;

  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);

  useEffect(() => {
    if (authenticated && keycloackValue) {
      keycloackValue.loadUserProfile().then((profile: KeycloakProfile) => {
        setUserProfile(profile as IUserProfile);
      });
    }
  }, [authenticated, keycloackValue]);

  useEffect(() => {
    if (authenticated) {
      fetch(`${import.meta.env.VITE_APP_BASE_URL}/comments/post/${postId}`)
        .then((response) => response.json())
        .then((data) => {
          // Format the created_at date
          const formattedComments = data?.map((comment: IComment) => ({
            ...comment,
            created_at: new Date(comment.created_at).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));
          setComments(formattedComments);
        })
        .catch((error) => console.error("Error fetching comments:", error));
    }
    // Fetch comments for the specific userId
  }, [keycloackValue]);

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    const date = currentDateTime.toLocaleDateString("en-US");
    const time = currentDateTime.toLocaleTimeString("en-US");
    return `${date} ${time}`;
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        postId,
        userId: userProfile?.id,
        text: newComment,
        firstname: userProfile?.firstName,
        lastname: userProfile?.lastName,
      };

      // Send the new comment to the backend
      fetch(`${import.meta.env.VITE_APP_BASE_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentObj),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update local state with the new comment
          const updatedComment: IComment = {
            ...newCommentObj,
            id: data.id,
            created_at: getCurrentDateTime(),
          };
          setComments((prevComments: IComment[]) => [
            ...prevComments,
            updatedComment,
          ]);
          setNewComment("");
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        });
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography
          variant="body1"
          gutterBottom
          style={{ marginBottom: "10px" }}
        >
          Comments
        </Typography>
        {comments?.map((comment: IComment) => (
          <div
            key={comment.id}
            style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          >
            <Avatar sx={{ bgcolor: "red" }} aria-label="comment-avatar">
              {comment.firstname ? comment.firstname.split("")[0] : ""}
            </Avatar>
            <div style={{ marginLeft: 10 }}>
              <Typography variant="body1" style={{ marginBottom: 5 }}>
                <strong>
                  {comment.firstname} {comment.lastname}
                </strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {comment.created_at.toString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {comment.text}
              </Typography>
            </div>
          </div>
        ))}

        <TextField
          fullWidth
          variant="outlined"
          label="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ marginTop: 10 }}
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          style={{ marginTop: 10 }}
        >
          Add Comment
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommentSection;
