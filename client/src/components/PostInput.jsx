import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuth } from "../hooks/useAuth.jsx";
import { useState } from "react";
import { createPost } from "../api/posts.js";

export default function PostInput({ addImmediately }) {
  const { user } = useAuth();
  const [postText, setPostText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postText.trim()) return;
    const newPost = await createPost(user._id, postText);
    addImmediately(newPost);
    setPostText("");
  };
  return (
    <div className="postDiv">
      <div className="postInner">
        <form onSubmit={handleSubmit}>
          <div style={{ paddingBottom: "10px" }}>
            <TextField
              variant="standard"
              placeholder="What's on your mind?"
              multiline
              maxRows={4}
              maxLength={280}
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
          <div>
            <Button
              disabled={!postText.trim()}
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
