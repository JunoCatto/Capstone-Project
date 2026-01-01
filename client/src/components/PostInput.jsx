import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuth } from "../hooks/useAuth.jsx";
import { useState } from "react";
import { createPost } from "../api/posts.js";
import { getProfilePic } from "../utils/imageHelper.js";

const maxContent = 280;

export default function PostInput({ addImmediately }) {
  const { user } = useAuth();
  const [postText, setPostText] = useState("");
  const [error, setError] = useState(null);
  const profilePic = getProfilePic(user.profilePic);

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
          <div
            style={{
              paddingBottom: "10px",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <img
              src={profilePic}
              alt={`${user.userName} profile`}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 20,
              }}
            />
            <div style={{ flex: 1 }}>
              <TextField
                autoFocus
                variant="standard"
                placeholder="What's on your mind?"
                multiline
                maxRows={6}
                fullWidth
                value={postText}
                onChange={(e) => {
                  setPostText(e.target.value);
                }}
                slotProps={{
                  input: {
                    inputProps: { maxLength: maxContent },
                    disableUnderline: true,
                  },
                }}
              />
            </div>
          </div>
          <div className="mainPostButton">
            <div style={{ color: overLimit ? "#e74c49ff" : "white" }}>
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
