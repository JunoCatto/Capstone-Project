import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuth } from "../hooks/useAuth.jsx";
import { useState } from "react";
import { createPost } from "../api/posts.js";

const maxContent = 280;

export default function PostInput({ addImmediately }) {
  const { user } = useAuth();
  const [postText, setPostText] = useState("");
  const [error, setError] = useState(null);

  const remainingCharacters = maxContent - postText.length;
  const overLimit = remainingCharacters < 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postText.trim()) return;
    if (postText.length > maxContent) {
      setError(`Post content is too long. Maximum ${maxContent} characters`);
      return;
    }
    try {
      const newPost = await createPost(postText, user);
      if (newPost) {
        addImmediately(newPost);
      }
      setPostText("");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="postDiv">
      <div className="postInner">
        <form id="postForm" onSubmit={handleSubmit}>
          <div style={{ paddingBottom: "10px" }}>
            {/* Want to make it so the textfield can't have input
             past maxContent, but can still be deleted*/}
            <TextField
              variant="standard"
              placeholder="What's on your mind?"
              multiline
              maxRows={6}
              maxLength={maxContent}
              fullWidth
              value={postText}
              onChange={(e) => {
                setPostText(e.target.value);
              }}
              slotProps={{
                input: {
                  disableUnderline: "true",
                },
              }}
            />
          </div>
          <div className="mainPostButton">
            <div style={{ color: overLimit ? "#e74c49ff" : "" }}>
              {postText.length}/{maxContent}
            </div>
            <Button
              disabled={!postText.trim() || overLimit}
              type="submit"
              sx={{ textTransform: "none" }}
            >
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
