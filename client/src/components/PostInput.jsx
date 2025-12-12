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
      const newPost = await createPost(user, postText);
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
            <TextField
              variant="standard"
              placeholder="What's on your mind?"
              multiline
              maxRows={4}
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
            <div style={{ color: overLimit ? "red" : "" }}>
              {postText.length}/{maxContent}
            </div>
          </div>
          <div>
            <Button
              disabled={!postText.trim() || overLimit}
              variant="outlined"
              type="submit"
            >
              POST
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
